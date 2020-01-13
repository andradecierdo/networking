<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// register auth routes
Route::prefix('auth')->group(base_path('routes/api/auth.php'));
// register users routes
Route::prefix('users')->group(base_path('routes/api/users.php'));
// register experiences routes
Route::prefix('experiences')->group(base_path('routes/api/experiences.php'));
// register transactions routes
Route::prefix('transactions')->group(base_path('routes/api/transactions.php'));
// register registration codes routes
Route::prefix('registration-codes')->group(base_path('routes/api/registration-codes.php'));
