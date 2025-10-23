<?php

use App\Http\Controllers\Admin\ReservationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('reservations', [ReservationController::class, 'index'])->name('admin.reservations.index');
    Route::get('reservations/create', [ReservationController::class, 'create'])->name('admin.reservations.create');
    Route::post('reservations', [ReservationController::class, 'store'])->name('admin.reservations.store');
    Route::put('reservations/{reservation}/status', [ReservationController::class, 'updateStatus'])->name('admin.reservations.updateStatus');

});