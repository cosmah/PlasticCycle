<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PickupRequest;
use App\Models\RecyclingCenter;
use App\Models\RecyclingRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalCollections = PickupRequest::where('status', 'completed')->count();
        $totalRecycled = RecyclingRecord::sum('quantity');
        $activeCollectors = PickupRequest::whereNotNull('collector_id')
            ->distinct('collector_id')
            ->count('collector_id');

        return Inertia::render('Admin/Dashboard', [
            'totalCollections' => $totalCollections,
            'totalRecycled' => $totalRecycled,
            'activeCollectors' => $activeCollectors,
        ]);
    }

    public function centers()
    {
        $centers = RecyclingCenter::all();
        return Inertia::render('Admin/Centers', [
            'centers' => $centers,
        ]);
    }

    public function storeCenter(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'accepted_plastic_types' => 'required|array',
            'capacity' => 'required|numeric',
        ]);

        RecyclingCenter::create($request->all());
        return redirect()->route('admin.centers')->with('success', 'Center added successfully!');
    }
}