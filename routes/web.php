<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Collector\CollectorDashboardController;
use App\Http\Controllers\Business\BusinessDashboardController;
use App\Http\Controllers\Household\HouseholdDashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Collector-specific routes
    Route::prefix('collector')->name('collector.')->group(function () {
        Route::get('/dashboard', [CollectorDashboardController::class, 'index'])->name('dashboard');
        Route::get('/requests', [CollectorDashboardController::class, 'requests'])->name('requests');
        Route::get('/routes', [CollectorDashboardController::class, 'routes'])->name('routes');
        Route::get('/centers', [CollectorDashboardController::class, 'centers'])->name('centers');
    });

    // Business-specific routes
    Route::prefix('business')->name('business.')->group(function () {
        Route::get('/dashboard', [BusinessDashboardController::class, 'index'])->name('dashboard');
        Route::get('/waste', [BusinessDashboardController::class, 'waste'])->name('waste');
        Route::post('/waste', [BusinessDashboardController::class, 'storeWaste'])->name('waste.store');
        Route::get('/reports', [BusinessDashboardController::class, 'reports'])->name('reports');
        Route::post('/reports/generate', [BusinessDashboardController::class, 'generateReport'])->name('reports.generate');
        Route::get('/analytics', [BusinessDashboardController::class, 'analytics'])->name('analytics');
    });

    // Household-specific routes
    Route::prefix('household')->name('household.')->group(function () {
        Route::get('/dashboard', [HouseholdDashboardController::class, 'index'])->name('dashboard');
        Route::get('/schedule', [HouseholdDashboardController::class, 'schedule'])->name('schedule');
        Route::post('/schedule', [HouseholdDashboardController::class, 'storeSchedule'])->name('schedule.store');
        Route::get('/rewards', [HouseholdDashboardController::class, 'rewards'])->name('rewards');
        Route::post('/rewards/redeem', [HouseholdDashboardController::class, 'redeemRewards'])->name('rewards.redeem');
        Route::get('/recycling', [HouseholdDashboardController::class, 'recycling'])->name('recycling');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
