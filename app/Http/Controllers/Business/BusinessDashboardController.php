<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\RecyclingRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BusinessDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $recentPickups = $user->pickupRequests()->latest()->take(5)->get();
        $totalRecycled = $user->recyclingRecords()->sum('quantity');
        $pendingPickups = $user->pickupRequests()->where('status', 'scheduled')->count();

        return Inertia::render('Business/Dashboard', [
            'recentPickups' => $recentPickups,
            'totalRecycled' => $totalRecycled,
            'pendingPickups' => $pendingPickups,
        ]);
    }

    public function waste()
    {
        $user = auth()->user();
        $pickupRequests = $user->pickupRequests()->latest()->get();

        return Inertia::render('Business/Waste', [
            'pickupRequests' => $pickupRequests,
        ]);
    }

    public function storeWaste(Request $request)
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

        auth()->user()->notify(new \App\Notifications\PickupScheduledNotification($pickup));
        \App\Jobs\NotifyPickupTime::dispatch($pickup)->delay($pickup->scheduled_at);

        // Change this to a business route
        return redirect()->route('business.waste')->with('success', 'Pickup scheduled successfully!');
    }

    public function reports()
    {
        $user = auth()->user();
        $records = $user->recyclingRecords()->with('pickupRequest')->latest()->get();

        return Inertia::render('Business/Reports', [
            'records' => $records,
        ]);
    }

    public function generateReport(Request $request)
    {
        // Placeholder for PDF generation logic (e.g., using DomPDF)
        return redirect()->route('business.reports')->with('success', 'Report generated!');
    }


    public function analytics()
    {
        $user = auth()->user();
        $driver = DB::getDriverName();

        $monthlyRecycling = $user->recyclingRecords()
            ->selectRaw(
                $driver === 'sqlite'
                ? 'strftime("%Y-%m", processed_at) as month, SUM(quantity) as total'
                : 'DATE_FORMAT(processed_at, "%Y-%m") as month, SUM(quantity) as total'
            )
            ->groupBy('month')
            ->pluck('total', 'month');

        $totalRecycled = $user->recyclingRecords()->sum('quantity');

        return Inertia::render('Business/Analytics', [
            'monthlyRecycling' => $monthlyRecycling,
            'totalRecycled' => $totalRecycled,
        ]);
    }


    public function notifications(Request $request)
    {
        $notifications = auth()->user()->notifications()->latest()->get()->toArray();

        if ($request->wantsJson()) {
            return response()->json(['notifications' => $notifications ?: []]);
        }

        return Inertia::render('Business/BusinessNotifications', [
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

    public function pickupDetails($id)
    {
        $pickupRequest = PickupRequest::with('user')->findOrFail($id);

        return Inertia::render('Business/PickupDetails', [
            'pickupRequest' => $pickupRequest,
        ]);
    }

    public function requests()
    {
        $user = auth()->user();
        $requests = $user->pickupRequests()->with('user')->latest()->get();

        return Inertia::render('Business/BusinessRequests', [
            'requests' => $requests,
        ]);
    }
}