<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DispenseController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public route
Route::get('/', function () {
    return view('auth.login');
});

/**
 * Authentication protected routes
 */
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // Profile management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Products CRUD
    Route::resource('products', ProductController::class);

    // Dispense products route (protected)
    Route::get('/dispense/fetch-save', [DispenseController::class, 'getData']);
    Route::get('/dispense/products', [DispenseController::class, 'showProducts']);
});

/**
 * If you want some routes to be PUBLIC (no auth)
 */
// Route::get('/dispense/products', [DispenseController::class, 'showProducts']);

require __DIR__.'/auth.php';
