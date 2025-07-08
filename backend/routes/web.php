<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DispenseController;
use App\Http\Controllers\ProductController;

Route::get('/dispense/fetch-save', [DispenseController::class, 'getData']);
Route::get('/products', [DispenseController::class, 'showProducts']);
Route::get('/dispense/products', [DispenseController::class, 'showProducts']); // 👈 add this line
// Products CRUD
Route::resource('products', ProductController::class);


Route::get('/', function () {
    return view('welcome');
});
