<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupFabricColorController;
use App\Http\Controllers\PatternController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// auth routes
Route::get('/', [AuthController::class, 'index'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

Route::middleware(['auth'])->group(function () {
    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    // change password
    Route::post('/change-password', [ChangePasswordController::class, 'update'])->name('change.password.update');
    Route::post('/check-current-password', [ChangePasswordController::class, 'checkCurrentPassword'])->name('check.current.password');

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

    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::post('create', [UserController::class, 'create'])->name('user.create');
        Route::post('show', [UserController::class,'show'])->name('user.show');
        Route::get('edit/{id}', [UserController::class,'edit'])->name('user.edit');
        Route::post('update/{id}', [UserController::class, 'update'])->name('user.update');
        Route::post('destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');
    });

    Route::prefix('group-fabric-color')->group(function () {
        Route::get('/', [GroupFabricColorController::class, 'index'])->name('group-fabric-color.index');
        Route::post('store', [GroupFabricColorController::class, 'store'])->name('group-fabric-color.store');
        Route::post('show', [GroupFabricColorController::class, 'show'])->name('group-fabric-color.show');
        Route::get('edit/{id}', [GroupFabricColorController::class, 'edit'])->name('group-fabric-color.edit');
        Route::post('update/{id}', [GroupFabricColorController::class, 'update'])->name('group-fabric-color.update');
        Route::post('destroy/{id}', [GroupFabricColorController::class, 'destroy'])->name('group-fabric-color.destroy');

        Route::get('manage-color/{id}', [GroupFabricColorController::class, 'manageColor'])->name('group-fabric-color.manage_color');
        Route::post('manage-color/store/{id}', [GroupFabricColorController::class, 'manageColorStore'])->name('group-fabric-color.manage_color_store');
        Route::get('manage-color/edit/{id}', [GroupFabricColorController::class, 'manageColorEdit'])->name('group-fabric-color.manage_color_edit');
        Route::post('manage-color/show/{id}', [GroupFabricColorController::class, 'manageColorShow'])->name('group-fabric-color.manage_color_show');
        Route::post('manage-color/update/{id}', [GroupFabricColorController::class, 'manageColorUpdate'])->name('group-fabric-color.manage_color_update');
        Route::post('manage-color/destroy/{id}', [GroupFabricColorController::class, 'manageColorDestroy'])->name('group-fabric-color.manage_color_destroy');
    });

    // logout
    Route::get('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

