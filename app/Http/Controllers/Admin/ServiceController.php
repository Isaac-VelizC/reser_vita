<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\StoreServiceRequest;
use App\Http\Requests\Service\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        try {
            $services = Service::orderBy('-created_at')->paginate(10);

            $status = $services->isEmpty() ? 'empty' : 'success';
            $message = $services->isEmpty() ? 'No hay servicios disponibles' : 'Servicios cargados correctamente';

            return Inertia::render('admin/services/Index', [
                'services' => $services,
                'message' => $message,
                'status' => $status
            ]);
        } catch (\Exception $e) {
            return Inertia::render('admin/services/Index', [
                'services' => [],
                'message' => 'Ocurrió un error al cargar los servicios: ' . $e->getMessage(),
                'status' => 'error'
            ]);
        }
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/Create');
    }

    public function edit($id): Response
    {
        $service = Service::findOrFail($id);
        return Inertia::render('admin/services/Create', [
            'isEdit' => true,
            'service' => $service
        ]);
    }

    public function store(StoreServiceRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            Service::create($validated);

            DB::commit();
            return redirect()->route('admin.services.index')->with('success', 'Servicio creado correctamente.');
        } catch (\Throwable $th) {
            DB::rollBack();

            Log::error("Error al crear servicio: {$th->getMessage()}");

            return redirect()->back()
                ->withErrors(['error' => 'Hubo un problema al registrar el servicio.'])
                ->withInput();
        }
    }

    public function update(UpdateServiceRequest $request, $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            Service::findOrFail($id)->update($validated);
            DB::commit();
            return redirect()->route('admin.services.index')->with('success', 'Servicio actualizado correctamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("Error al actualizar servicio: {$th->getMessage()}");
            return redirect()->back()
                ->withErrors(['error' => 'Hubo un problema al actualizar el servicio.'])
                ->withInput();
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $service = Service::findOrFail($id);
            $service->delete();
            return redirect()->back()->with('success', 'Servicio eliminado correctamente.');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Servicio no encontrado.');
        } catch (\Throwable $e) {
            Log::error('Error eliminando servicio: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Ocurrió un error al eliminar el servicio.');
        }
    }
}
