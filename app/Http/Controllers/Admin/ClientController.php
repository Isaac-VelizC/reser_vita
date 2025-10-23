<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index() {
        try {
            $clients = Client::orderBy('-created_at')->paginate(10);
            $status = $clients->isEmpty() ? 'empty' : 'success';
            $message = $clients->isEmpty() ? 'No hay clientes disponibles' : 'Clientes cargados correctamente';

            return Inertia::render('admin/clients/Index', [
                'clients' => $clients,
                'message' => $message,
                'status' => $status
            ]);
        } catch (\Exception $e) {
            return Inertia::render('admin/clients/Index', [
                'clients' => [],
                'message' => 'Ocurrió un error al cargar los clientes: ' . $e->getMessage(),
                'status' => 'error'
            ]);
        }
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            Client::create($validated);

            DB::commit();

            return redirect()->back()->with('success', 'Cliente creado correctamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd( $th->getMessage());
            Log::error("Error al crear cliente: {$th->getMessage()}");

            return redirect()->back()->withErrors(['error' => 'Hubo un problema al registrar el cliente.'])->withInput();
        }
    }

    public function update(UpdateClientRequest $request, $id): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            $user = Client::findOrFail($id);
            $user->update($validated);

            DB::commit();
    
            return redirect()->back()->with('success', 'Cliente actualizado correctamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("Error al actualizar cliente: {$th->getMessage()}");
            return redirect()->back()
                            ->withErrors(['error' => 'Hubo un problema al actualizar el cliente.'])
                            ->withInput();
        }
    }

    public function clientHabilitiInhabilitaion($id): RedirectResponse
    {
        try {
            $user = Client::findOrFail($id);
            // Alternar estado entre "active" y "suspended"
            if ($user->status === 'suspended') {
                $user->status = 'active';
                $message = 'Cliente habilitado correctamente.';
            } else {
                $user->status = 'suspended';
                $message = 'Cliente suspendido correctamente.';
            }
            $user->save();

            return redirect()->back()->with('success', $message);
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Cliente no encontrado.');
        } catch (\Throwable $e) {
            Log::error('Error cambiando estado del cliente: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Ocurrió un error al actualizar el estado del cliente.');
        }
    }
}
