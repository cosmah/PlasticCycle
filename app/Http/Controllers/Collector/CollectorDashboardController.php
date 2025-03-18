<?php

namespace App\Http\Controllers\Collector;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\RecyclingCenter;
use App\Models\RecyclingRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CollectorDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $pendingRequests = PickupRequest::where('status', 'pending')
            ->whereNull('collector_id')
            ->count();
        $recentCollections = PickupRequest::where('collector_id', $user->id)
            ->where('status', 'completed')
            ->latest()
            ->take(5)
            ->get();
        $totalCollected = RecyclingRecord::where('collector_id', $user->id)
            ->sum('quantity');

        return Inertia::render('Collector/Dashboard', [
            'pendingRequests' => $pendingRequests,
            'recentCollections' => $recentCollections,
            'totalCollected' => $totalCollected,
        ]);
    }

    public function requests()
    {
        Log::info('CollectorDashboardController::requests - Starting to fetch requests');

        // Log the user ID for debugging
        $userId = auth()->id();
        Log::info("CollectorDashboardController::requests - Authenticated user ID: {$userId}");

        // Fetch all scheduled requests where collector_id is null
        $availableRequestsQuery = PickupRequest::where('status', 'scheduled')
            ->whereNull('collector_id')
            ->with('user');

        // Log the SQL query for debugging
        Log::info("CollectorDashboardController::requests - Available requests query: {$availableRequestsQuery->toSql()}");

        $availableRequests = $availableRequestsQuery->get();

        // Log the count of available requests
        Log::info("CollectorDashboardController::requests - Available requests count: {$availableRequests->count()}");

        // Log individual request details for deeper inspection
        foreach ($availableRequests as $index => $request) {
            Log::info("CollectorDashboardController::requests - Available request #{$index}: ID: {$request->id}, User: {$request->user->name}, Status: {$request->status}");
        }

        // Fetch all requests assigned to the current collector
        $myRequestsQuery = PickupRequest::where('collector_id', $userId)
            ->with('user');

        // Log the SQL query for debugging
        Log::info("CollectorDashboardController::requests - My requests query: {$myRequestsQuery->toSql()}");

        $myRequests = $myRequestsQuery->latest()->get();

        // Log the count of my requests
        Log::info("CollectorDashboardController::requests - My requests count: {$myRequests->count()}");

        // Log individual request details for deeper inspection
        foreach ($myRequests as $index => $request) {
            Log::info("CollectorDashboardController::requests - My request #{$index}: ID: {$request->id}, User: {$request->user->name}, Status: {$request->status}");
        }

        // Return the data to the view
        return Inertia::render('Collector/Requests', [
            'availableRequests' => $availableRequests,
            'myRequests' => $myRequests,
        ]);
    }

    public function updateRequest(Request $request, PickupRequest $pickupRequest)
    {
        Log::info("CollectorDashboardController::updateRequest - Starting to update request ID: {$pickupRequest->id}");
        Log::info("CollectorDashboardController::updateRequest - Requested status: {$request->status}");
        Log::info("CollectorDashboardController::updateRequest - Current collector ID: " . ($pickupRequest->collector_id ?? 'null'));

        $request->validate([
            'status' => 'required|in:scheduled,completed',
        ]);

        if ($pickupRequest->collector_id && $pickupRequest->collector_id !== auth()->id()) {
            Log::warning("CollectorDashboardController::updateRequest - Request already assigned to another collector: {$pickupRequest->collector_id}");
            return back()->withErrors(['status' => 'This request is assigned to another collector.']);
        }

        if ($request->status === 'scheduled' && !$pickupRequest->collector_id) {
            Log::info("CollectorDashboardController::updateRequest - Assigning request to collector: " . auth()->id());
            $pickupRequest->update(['collector_id' => auth()->id(), 'status' => 'scheduled']);
            Log::info("CollectorDashboardController::updateRequest - Request successfully assigned");
        } elseif ($request->status === 'completed') {
            Log::info("CollectorDashboardController::updateRequest - Marking request as completed");
            $pickupRequest->update(['status' => 'completed']);
            // Remove the RecyclingRecord::create code from here
        }

        // Return a json response for AJAX requests
        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->route('collector.requests')->with('success', 'Request updated successfully!');
    }

    public function routes()
    {
        $requests = PickupRequest::where('collector_id', auth()->id())
            ->where('status', 'scheduled')
            ->with('user:id,name')
            ->get(['id', 'user_id', 'quantity', 'plastic_type', 'address', 'scheduled_at', 'latitude', 'longitude']);

        return Inertia::render('Collector/Routes', [
            'scheduledRequests' => $requests
        ]);
    }


    public function centers()
    {
        Log::info('CollectorDashboardController::centers - Method started.');

        $user = auth()->user();
        Log::info("CollectorDashboardController::centers - Authenticated user ID: {$user->id}");

        // Fetch recycling centers
        $centers = RecyclingCenter::all();
        Log::info("CollectorDashboardController::centers - Number of recycling centers found: " . count($centers));
        foreach ($centers as $center) {
            Log::info("CollectorDashboardController::centers - Center ID: {$center->id}, Name: {$center->name}");
        }

        // Fetch completed requests for the collector that do not have a recycling record
        $completedRequestsQuery = PickupRequest::where('collector_id', $user->id)
            ->where('status', 'completed')
            ->whereDoesntHave('recyclingRecord');

        // Log the raw SQL query
        Log::info("CollectorDashboardController::centers - Completed requests SQL query: " . $completedRequestsQuery->toSql());

        $completedRequests = $completedRequestsQuery->get();

        // Log the count of completed requests
        Log::info("CollectorDashboardController::centers - Number of completed requests found: " . $completedRequests->count());

        // Log details of each completed request
        foreach ($completedRequests as $request) {
            Log::info("CollectorDashboardController::centers - Request ID: {$request->id}, Quantity: {$request->quantity}, Plastic Type: {$request->plastic_type}");
        }

        // Log the data being passed to Inertia
        Log::info("CollectorDashboardController::centers - Data being passed to Inertia:", [
            'centers' => $centers,
            'completedRequests' => $completedRequests,
        ]);

        // Pass data to Inertia
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

        $record = RecyclingRecord::create([
            'user_id' => $pickupRequest->user_id,
            'pickup_request_id' => $pickupRequest->id,
            'recycling_center_id' => $request->recycling_center_id,
            'collector_id' => auth()->id(),
            'quantity' => $pickupRequest->quantity,
            'processed_at' => now(),
        ]);

        return redirect()->route('collector.centers')->with('success', 'Waste delivered to center!');
    }

    public function pickupDetails($id)
    {
        $pickupRequest = PickupRequest::with('user')->findOrFail($id);

        return Inertia::render('Collector/PickupDetails', [
            'pickupRequest' => $pickupRequest,
        ]);
    }
}