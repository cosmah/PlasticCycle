<?php

namespace App\Http\Controllers\Collector;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectorDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Collector/Dashboard');
    }

    public function requests()
    {
        return Inertia::render('Collector/Requests');
    }

    public function routes()
    {
        return Inertia::render('Collector/Routes');
    }

    public function centers()
    {
        return Inertia::render('Collector/Centers');
    }
}