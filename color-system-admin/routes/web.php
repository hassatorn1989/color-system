<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupColorController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\ModeGroupColorController;
Route::get('/', function () {
    return view('group_color.index');
});
// router group 
Route::middleware(['auth'])->group(function () {

    // group prefix color

});

Route::prefix('color')->group(function () {
    // color
    Route::get('/', [ColorController::class, 'index'])->name('color.index');
    Route::post('create', [ColorController::class, 'create'])->name('color.create');
    Route::get('edit/{id}', [ColorController::class, 'edit'])->name('color.edit');
    Route::post('update/{id}', [ColorController::class, 'update'])->name('color.update');
    Route::delete('destroy/{id}', [ColorController::class, 'destroy'])->name('color.destroy');

});