<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatternController;

// auth routes
Route::get('/login', [AuthController::class, 'index'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');


Route::middleware(['auth'])->group(function () {
    // dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');


    // group prefix color
    Route::prefix('color')->group(function () {
        // color
        Route::get('/', [ColorController::class, 'index'])->name('color.index');
        Route::post('create', [ColorController::class, 'create'])->name('color.create');
        Route::get('edit/{id}', [ColorController::class, 'edit'])->name('color.edit');
        Route::post('update/{id}', [ColorController::class, 'update'])->name('color.update');
        Route::delete('destroy/{id}', [ColorController::class, 'destroy'])->name('color.destroy');
    });

    Route::prefix('pattern')->group(function () {
        // pattern
        Route::get('/', [PatternController::class, 'index'])->name('pattern.index');
        Route::post('create', [PatternController::class, 'create'])->name('pattern.create');
        Route::get('edit/{id}', [PatternController::class, 'edit'])->name('pattern.edit');
        Route::post('update/{id}', [PatternController::class, 'update'])->name('pattern.update');
        Route::post('destroy/{id}', [PatternController::class, 'destroy'])->name('pattern.destroy');
    });

    // logout
    Route::get('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

