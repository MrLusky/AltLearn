<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

// Públicas
Route::get('/activities', [ActivityController::class, 'index']);
Route::get('/activities/{slug}', [ActivityController::class, 'show']);

Route::middleware('throttle:10,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/auth/google', [AuthController::class, 'google']);
});

// Autenticadas (Laravel Sanctum, token Bearer)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/preferences', [PreferenceController::class, 'show']);
    Route::put('/preferences', [PreferenceController::class, 'update']);

    Route::post('/sessions', [SessionController::class, 'store']);
    Route::get('/progress', [ProgressController::class, 'index']);
});
