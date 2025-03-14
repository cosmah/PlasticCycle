<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\RecyclingRecord;
use Inertia\Inertia;

class SystemMonitoringController extends Controller
{
    public function index()
    {
        $dailyCollections = PickupRequest::where('status', 'completed')
            ->selectRaw('DATE(scheduled_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // Use SQLite-compatible strftime instead of DATE_FORMAT
        $monthlyRecycling = RecyclingRecord::selectRaw('strftime("%Y-%m", processed_at) as month, SUM(quantity) as total')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        return Inertia::render('Admin/Monitoring', [
            'dailyCollections' => $dailyCollections,
            'monthlyRecycling' => $monthlyRecycling,
        ]);
    }
}