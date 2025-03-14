<?php

namespace App\Http\Controllers\Collector;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\RecyclingCenter;
use App\Models\RecyclingRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectorDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $pendingRequests = PickupRequest::where('collector_id', $user->id)
            ->where('status', 'scheduled')
            ->count();
        $recentCollections = $user->pickupRequests()
            ->where('status', 'completed')
            ->latest()
            ->take(5)
            ->get();
        $totalCollected = RecyclingRecord::whereHas('pickupRequest', fn($q) => $q->where('collector_id', $user->id))
            ->sum('quantity');

        return Inertia::render('Collector/Dashboard', [
            'pendingRequests' => $pendingRequests,
            'recentCollections' => $recentCollections,
            'totalCollected' => $totalCollected,
        ]);
    }

    public function requests()
    {
        $availableRequests = PickupRequest::whereNull('collector_id')
            ->where('status', 'pending')
            ->with('user')
            ->get();

        $myRequests = auth()->user()->collectedRequests()
            ->with('user')
            ->latest()
            ->get();

        return Inertia::render('Collector/Requests', [
            'availableRequests' => $availableRequests,
            'myRequests' => $myRequests,
        ]);
    }

    public function updateRequest(Request $request, PickupRequest $pickupRequest)
    {
        $request->validate([
            'status' => 'required|in:scheduled,completed',
        ]);

        if ($pickupRequest->collector_id && $pickupRequest->collector_id !== auth()->id()) {
            return back()->withErrors(['status' => 'This request is assigned to another collector.']);
        }

        if ($request->status === 'scheduled' && !$pickupRequest->collector_id) {
            $pickupRequest->update(['collector_id' => auth()->id(), 'status' => 'scheduled']);
        } elseif ($request->status === 'completed') {
            $pickupRequest->update(['status' => 'completed']);
            RecyclingRecord::create([
                'user_id' => $pickupRequest->user_id,
                'pickup_request_id' => $pickupRequest->id,
                'quantity' => $pickupRequest->quantity,
                'processed_at' => now(),
            ]);
        }

        return redirect()->route('collector.requests')->with('success', 'Request updated successfully!');
    }

    public function routes()
    {
        $scheduledRequests = auth()->user()->pickupRequests()
            ->where('status', 'scheduled')
            ->with('user')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'address' => $request->user->name . "'s location",
                    'plastic_type' => $request->plastic_type,
                    'quantity' => $request->quantity,
                    'scheduled_at' => $request->scheduled_at,
                    'latitude' => $request->latitude,
                    'longitude' => $request->longitude,
                ];
            });

        return Inertia::render('Collector/Routes', [
            'scheduledRequests' => $scheduledRequests,
        ]);
    }

    public function centers()
    {
        $centers = RecyclingCenter::all();
        $completedRequests = auth()->user()->pickupRequests()
            ->where('status', 'completed')
            ->whereDoesntHave('recyclingRecord')
            ->get();

        return Inertia::render('Collector/Centers', [
            'centers' => $centers,
            'completedRequests' => $completedRequests,
        ]);
    }

    public function deliverToCenter(Request $request)
    {
        $request->validate([
            'pickup_request_id' => 'required|exists:pickup_requests,id',
            'recycling_center_id' => 'required|exists:recycling_centers,id',
        ]);

        $pickupRequest = PickupRequest::findOrFail($request->pickup_request_id);
        if ($pickupRequest->collector_id !== auth()->id() || $pickupRequest->status !== 'completed') {
            return back()->withErrors(['pickup_request_id' => 'Invalid request.']);
        }

        $record = RecyclingRecord::where('pickup_request_id', $pickupRequest->id)->first();
        if ($record) {
            $record->update(['recycling_center_id' => $request->recycling_center_id]);
        }

        return redirect()->route('collector.centers')->with('success', 'Waste delivered to center!');
    }
}