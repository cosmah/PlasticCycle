<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Collector\CollectorDashboardController;

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
