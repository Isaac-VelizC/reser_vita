<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Requests\StoreAvailabilityRequest;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Availability;
use App\Models\Reservation;
use App\Models\SalonDay;
use App\Models\Service;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\User;
use Carbon\Carbon;

class AvailabilityController extends Controller
{
    // Listar disponibilidades por fecha y estilista
    public function index(): Response
    {
        $query = User::with(['availabilities.hour', 'availabilities.day'])->where('role', 'stylist')->paginate(10);
        $status = $query->total() === 0 ? 'empty' : 'success';
        $message = $query->total() === 0 ? 'No hay horarios' : 'Horarios cargados correctamente';

        return Inertia::render('admin/availability/Index', [
            'stylists' => $query,
            'message' => $message,
            'status' => $status,
        ]);
    }

    public function store(StoreAvailabilityRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            // Evitamos duplicados con updateOrCreate
            Availability::updateOrCreate(
                [
                    'stylist_id'   => $request['stylist_id'],
                    'salon_day_id' => $request['day_id'],
                    'salon_hour_id'=> $request['hour_id'],
                ]
            );

            DB::commit();

            return redirect()->back()
                ->with('success', 'Disponibilidad registrada o actualizada correctamente.');

        } catch (\Throwable $e) {
            DB::rollBack();
            // Podrías loguear el error si tienes monitoreo
            Log::error("Error al guardar disponibilidad: {$e->getMessage()}");
            return redirect()
                ->back()
                ->withErrors(['error' => 'Hubo un problema al registrar la disponibilidad.']);
        }
    }
    
    public function edit($id): Response
    {
        // Estilista con todas sus disponibilidades (día + hora)
        $stylist = User::with([
            'availabilities' => function ($query) {
                $query->with(['day', 'hour']);
            }
        ])->findOrFail($id);

        // Horarios que el estilista ya tiene
        $takenHourIds = $stylist->availabilities->pluck('salon_hour_id')->toArray();

        // Días con horarios que el estilista aún NO tiene
        $availableDays = SalonDay::where('is_open', true) // solo días abiertos del salón
            ->with(['hours' => function ($q) use ($takenHourIds) {
                $q->whereNotIn('id', $takenHourIds);
            }])
            ->get()
            ->filter(function ($day) {
                // quitar días que ya no tienen horarios disponibles
                return $day->hours->isNotEmpty();
            })
            ->values(); // reindexar la colección

        return Inertia::render('admin/availability/FormAvailability', [
            'stylist' => $stylist,
            'availableDays' => $availableDays,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validar datos recibidos
        $request->validate([
            'is_working' => 'required|boolean',
        ]);

        try {
            // Buscar el registro o fallar con excepción
            $availability = Availability::findOrFail($id);
            // Intentar actualizar, lanzar excepción si falla
            $updated = $availability->update([
                'is_working' => $request->is_working,
            ]);

            if (!$updated) {
                return response()->json(['error' => 'No se pudo actualizar la disponibilidad']);
            }

            // Respuesta exitosa con mensaje y código 200
            return redirect()->back()->with('success', 'Disponibilidad actualizada');
        } catch (ModelNotFoundException $e) {
            // Registro no encontrado, código 404
            return response()->json(['error' => "Disponibilidad con id $id no encontrada"]);
        } catch (ValidationException $e) {
            // Error de validación, código 422
            return response()->json(['error' => 'Datos inválidos', 'details' => $e->getMessage()],);
        } catch (\Exception $e) {
            // Otros errores inesperados 500
            return response()->json(['error' => 'Error interno del servidor']);
        }
    }

    public function destroy($id)
    {
        try {
            $item = Availability::findOrFail($id);
            $item->delete();
            return redirect()->back()->with('success', 'Horario eliminado correctamente.');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Horario no encontrado.');
        } catch (\Throwable $e) {
            Log::error('Error eliminando servicio: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Ocurrió un error al eliminar el horario.');
        }
    }

    public function getAvailableSlots(Request $request)
    {
        $date = $request->query('date');
        $serviceId = $request->query('service_id');
        $service = Service::findOrFail($serviceId);

        // Ej: duración = 30 minutos
        $duration = $service->duration_minutes;

        $availability = Availability::whereDate('date', $date)
            ->where('is_available', true)
            ->get();

        $reservations = Reservation::whereDate('datetime', $date)
            ->pluck('datetime')
            ->toArray();

        $slots = [];

        foreach ($availability as $av) {
            $start = Carbon::parse($av->start_time);
            $end   = Carbon::parse($av->end_time);

            while ($start->copy()->addMinutes($duration)->lte($end)) {
                $slot = $start->format('H:i');

                $alreadyBooked = in_array(
                    $start->format('Y-m-d H:i:s'),
                    $reservations
                );

                if (! $alreadyBooked) {
                    $slots[] = $slot;
                }

                $start->addMinutes($duration);
            }
        }

        return response()->json([
            'date' => $date,
            'service_id' => $serviceId,
            'slots' => $slots,
        ]);
    }
}
