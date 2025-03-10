<?php

namespace App\Http\Controllers\Household;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\RecyclingRecord;
use App\Models\Reward;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HouseholdDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $recentPickups = $user->pickupRequests()->latest()->take(5)->get();
        $totalRecycled = $user->recyclingRecords()->sum('quantity');
        $totalPoints = $user->rewards()->whereNull('redeemed_at')->sum('points');

        return Inertia::render('Household/Dashboard', [
            'recentPickups' => $recentPickups,
            'totalRecycled' => $totalRecycled,
            'totalPoints' => $totalPoints,
        ]);
    }

    public function schedule()
    {
        return Inertia::render('Household/Schedule');
    }

    public function storeSchedule(Request $request)
    {
        $request->validate([
            'plastic_type' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'scheduled_at' => 'required|date|after:now',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $pickup = PickupRequest::create([
            'user_id' => auth()->id(),
            'plastic_type' => $request->plastic_type,
            'quantity' => $request->quantity,
            'scheduled_at' => $request->scheduled_at,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'status' => 'scheduled',
        ]);

        Reward::create([
            'user_id' => auth()->id(),
            'points' => $request->quantity * 10,
            'description' => "Pickup scheduled for {$request->quantity} kg of {$request->plastic_type}",
        ]);

        // Store the "pickup scheduled" notification in the database
        auth()->user()->notify(new \App\Notifications\PickupScheduledNotification($pickup));

        // Queue a job to notify at pickup time
        \App\Jobs\NotifyPickupTime::dispatch($pickup)->delay($pickup->scheduled_at);

        return redirect()->route('household.dashboard')->with('success', 'Pickup scheduled successfully!');
    }

    public function rewards()
    {
        $user = auth()->user();
        $rewards = $user->rewards()->latest()->get();
        $availablePoints = $user->rewards()->whereNull('redeemed_at')->sum('points');

        return Inertia::render('Household/Rewards', [
            'rewards' => $rewards,
            'availablePoints' => $availablePoints,
        ]);
    }

    public function redeemRewards(Request $request)
    {
        $request->validate([
            'points' => 'required|integer|min:1',
        ]);

        $user = auth()->user();
        $availablePoints = $user->rewards()->whereNull('redeemed_at')->sum('points');

        if ($request->points > $availablePoints) {
            return back()->withErrors(['points' => 'Not enough points to redeem.']);
        }

        $user->rewards()->whereNull('redeemed_at')->take($request->points / 10)->update([
            'redeemed_at' => now(),
        ]);

        return redirect()->route('household.rewards')->with('success', 'Points redeemed successfully!');
    }

    public function recycling()
    {
        $user = auth()->user();
        $records = $user->recyclingRecords()->with('pickupRequest')->latest()->get();
        $totalImpact = $user->recyclingRecords()->sum('quantity');

        return Inertia::render('Household/Recycling', [
            'records' => $records,
            'totalImpact' => $totalImpact,
        ]);
    }

    public function notifications(Request $request)
    {
        $notifications = auth()->user()->notifications()->latest()->get()->toArray();

        if ($request->wantsJson()) {
            return response()->json(['notifications' => $notifications ?: []]);
        }

        return Inertia::render('Household/HouseholdNotifications', [
            'notifications' => $notifications ?: [],
        ]);
    }

    public function markNotificationAsRead(Request $request, $notificationId)
    {
        $notification = auth()->user()->notifications()->where('id', $notificationId)->first();

        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }

        if (!$notification->read_at) {
            $notification->update(['read_at' => now()]);
        }

        return response()->json(['success' => 'Notification marked as read']);
    }

}