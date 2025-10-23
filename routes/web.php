<?php

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('api')->group(function () {
    Route::get('/services', [ServiceController::class, 'listService']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',[HomeController::class, 'index'])->name('dashboard');
    // Servicios
    Route::get('services', [ServiceController::class, 'index'])->name('admin.services.index');
    Route::get('services/create', [ServiceController::class, 'create'])->name('admin.services.create');
    Route::post('services', [ServiceController::class, 'store'])->name(('admin.services.store'));
    Route::get('services/{service}/edit', [ServiceController::class, 'edit'])->name('admin.services.edit');
    Route::put('services/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('services/{service}/destroy', [ServiceController::class, 'destroy'])->name('admin.services.destroy');
    // Gestión de Usuarios
    Route::get('usuarios', [UsersController::class, 'index'])->name('admin.usuarios.index');
    Route::get('usuarios/create', [UsersController::class, 'create'])->name('admin.usuarios.create');
    Route::post('usuarios', [UsersController::class, 'store'])->name(('admin.usuarios.store'));
    Route::get('usuarios/{id}/edit', [UsersController::class, 'edit'])->name('admin.usuarios.edit');
    Route::put('usuarios/{id}', [UsersController::class, 'update'])->name('admin.usuarios.update');
    Route::delete('usuarios/{id}/destroy', [UsersController::class, 'destroy'])->name('admin.usuarios.destroy');
    Route::get('usuarios/{id}/suspended', [UsersController::class, 'userHabilitiInhabilitaion'])->name('admin.usuarios.suspended');

    Route::delete('usuarios/bulk', [UsersController::class, 'bulkDelete'])->name('admin.usuarios.bulkDelete');
    Route::post('usuarios/bulk/suspend', [UsersController::class, 'bulkSuspend'])->name('admin.usuarios.bulkSuspend');
    Route::post('usuarios/bulk/activate', [UsersController::class, 'bulkActivate'])->name('admin.usuarios.bulkActivate');
    // Gestión clientes
    Route::get('clientes', [ClientController::class, 'index'])->name('admin.clients.index');
    //Route::get('clientes/create', [ClientController::class, 'create'])->name('admin.clients.create');
    Route::post('clientes', [ClientController::class, 'store'])->name('admin.clients.store');
    //Route::get('clientes/{id}/edit', [ClientController::class, 'edit'])->name('admin.clients.edit');
    Route::put('clientes/{id}', [ClientController::class, 'update'])->name('admin.clients.update');
    Route::delete('clientes/{id}/destroy', [ClientController::class, 'destroy'])->name('admin.clients.destroy');
    Route::get('clientes/{id}/suspended', [ClientController::class, 'clientHabilitiInhabilitaion'])->name('admin.clients.suspended');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/availability.php';
require __DIR__.'/reservations.php';
