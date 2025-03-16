<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Collector\CollectorDashboardController;
use App\Http\Controllers\Business\BusinessDashboardController;
use App\Http\Controllers\Household\HouseholdDashboardController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\SystemMonitoringController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user->type === 'collector') return redirect()->route('collector.dashboard');
        if ($user->type === 'business') return redirect()->route('business.dashboard');
        if ($user->type === 'household') return redirect()->route('household.dashboard');
        if ($user->type === 'admin') return redirect()->route('admin.dashboard');
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Collector-specific routes
    Route::prefix('collector')->name('collector.')->middleware('role:collector')->group(function () {
        Route::get('/dashboard', [CollectorDashboardController::class, 'index'])->name('dashboard');
        Route::get('/requests', [CollectorDashboardController::class, 'requests'])->name('requests');
        Route::patch('/requests/{pickupRequest}', [CollectorDashboardController::class, 'updateRequest'])->name('requests.update');
        Route::get('/routes', [CollectorDashboardController::class, 'routes'])->name('routes');
        Route::get('/centers', [CollectorDashboardController::class, 'centers'])->name('centers');
        Route::post('/centers/deliver', [CollectorDashboardController::class, 'deliverToCenter'])->name('centers.deliver');
        Route::get('/pickup-details/{id}', [CollectorDashboardController::class, 'pickupDetails'])->name('pickup-details');
    });

    // Business-specific routes
    Route::prefix('business')->name('business.')->middleware('role:business')->group(function () {
        Route::get('/dashboard', [BusinessDashboardController::class, 'index'])->name('dashboard');
        Route::get('/waste', [BusinessDashboardController::class, 'waste'])->name('waste');
        Route::post('/waste', [BusinessDashboardController::class, 'storeWaste'])->name('waste.store');
        Route::get('/reports', [BusinessDashboardController::class, 'reports'])->name('reports');
        Route::post('/reports/generate', [BusinessDashboardController::class, 'generateReport'])->name('reports.generate');
        Route::get('/analytics', [BusinessDashboardController::class, 'analytics'])->name('analytics');
        Route::get('/notifications', [BusinessDashboardController::class, 'notifications'])->name('notifications');
        Route::get('/requests', [BusinessDashboardController::class, 'requests'])->name('requests');
        Route::get('/pickup-details/{id}', [BusinessDashboardController::class, 'pickupDetails'])->name('pickup-details');
    });

    Route::post('/business/notifications/{notificationId}/mark-as-read', [BusinessDashboardController::class, 'markNotificationAsRead']);

    // Household-specific routes (assumed complete as per your note)
    Route::prefix('household')->name('household.')->middleware('role:household')->group(function () {
        Route::get('/dashboard', [HouseholdDashboardController::class, 'index'])->name('dashboard');
        Route::get('/schedule', [HouseholdDashboardController::class, 'schedule'])->name('schedule');
        Route::post('/schedule', [HouseholdDashboardController::class, 'storeSchedule'])->name('schedule.store');
        Route::get('/rewards', [HouseholdDashboardController::class, 'rewards'])->name('rewards');
        Route::post('/rewards/redeem', [HouseholdDashboardController::class, 'redeemRewards'])->name('rewards.redeem');
        Route::get('/recycling', [HouseholdDashboardController::class, 'recycling'])->name('recycling');
        Route::get('/notifications', [HouseholdDashboardController::class, 'notifications'])->name('notifications');
        Route::get('/requests', [HouseholdDashboardController::class, 'requests'])->name('requests');
        Route::get('/pickup-details/{id}', [HouseholdDashboardController::class, 'pickupDetails'])->name('pickup-details');
    });

    Route::post('/household/notifications/{notificationId}/mark-as-read', [HouseholdDashboardController::class, 'markNotificationAsRead']);

    // Admin-specific routes
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/users', [UserManagementController::class, 'index'])->name('users');
        Route::post('/users/{user}/update-role', [UserManagementController::class, 'updateRole'])->name('users.update-role');
        Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
        Route::get('/monitoring', [SystemMonitoringController::class, 'index'])->name('monitoring');
        Route::get('/centers', [AdminDashboardController::class, 'centers'])->name('centers');
        Route::post('/centers', [AdminDashboardController::class, 'storeCenter'])->name('centers.store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';