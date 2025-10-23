<?php

use App\Http\Controllers\Admin\AvailabilityController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('availability', [AvailabilityController::class, 'index'])->name('admin.availability.index');
    Route::post('availability', [AvailabilityController::class, 'store'])->name('admin.availability.store');
    Route::get('availability/{id}/form', [AvailabilityController::class, 'edit'])->name('admin.availability.edit');
    Route::patch('availability/{id}', [AvailabilityController::class, 'update'])->name('admin.availability.update');
    Route::delete('availability/{id}/destroy', [AvailabilityController::class, 'destroy'])->name('admin.availability.destroy');
});