<?php

namespace App\Http\Controllers\Household;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HouseholdDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Household/Dashboard');
    }

    public function schedule()
    {
        return Inertia::render('Household/Schedule');
    }

    public function rewards()
    {
        return Inertia::render('Household/Rewards');
    }

    public function recycling()
    {
        return Inertia::render('Household/Recycling');
    }
}