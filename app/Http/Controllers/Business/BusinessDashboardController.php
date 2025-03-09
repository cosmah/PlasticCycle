<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Business/Dashboard');
    }

    public function waste()
    {
        return Inertia::render('Business/Waste');
    }

    public function reports()
    {
        return Inertia::render('Business/Reports');
    }

    public function analytics()
    {
        return Inertia::render('Business/Analytics');
    }
}