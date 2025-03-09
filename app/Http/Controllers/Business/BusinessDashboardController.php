<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\RecyclingRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf; // For generating PDF reports

class BusinessDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $recentPickups = $user->pickupRequests()->latest()->take(5)->get();
        $totalRecycled = $user->recyclingRecords()->sum('quantity');
        $pendingPickups = $user->pickupRequests()->whereIn('status', ['pending', 'scheduled'])->count();

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
            'compliance_notes' => 'nullable|string|max:1000',
        ]);

        PickupRequest::create([
            'user_id' => auth()->id(),
            'plastic_type' => $request->plastic_type,
            'quantity' => $request->quantity,
            'scheduled_at' => $request->scheduled_at,
            'status' => 'scheduled',
            'compliance_notes' => $request->compliance_notes,
        ]);

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
        $user = auth()->user();
        $records = $user->recyclingRecords()->with('pickupRequest')->get();
        $totalRecycled = $records->sum('quantity');

        $pdf = Pdf::loadView('reports.business', [
            'records' => $records,
            'totalRecycled' => $totalRecycled,
            'businessName' => $user->name,
            'generatedAt' => now()->toDateTimeString(),
        ]);

        return $pdf->download('recycling_report_' . $user->id . '_' . now()->format('Ymd') . '.pdf');
    }

    public function analytics()
    {
        $user = auth()->user();
        $monthlyRecycling = $user->recyclingRecords()
            ->selectRaw('strftime("%Y-%m", processed_at) as month, SUM(quantity) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month')
            ->toArray();

        $totalRecycled = $user->recyclingRecords()->sum('quantity');

        return Inertia::render('Business/Analytics', [
            'monthlyRecycling' => $monthlyRecycling,
            'totalRecycled' => $totalRecycled,
        ]);
    }
}