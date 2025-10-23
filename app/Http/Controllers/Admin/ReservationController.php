<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreReservationRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Reservation;
use App\Models\Service;
use Inertia\Response;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index(): Response
    {
        // Paginación de 10 reservas por página, ordenadas por fecha y hora de inicio
        $reservations = Reservation::with(['customer', 'service', 'stylist'])
            ->orderBy('start_time', 'desc')
            ->paginate(10);

        $status = $reservations->isEmpty() ? 'empty' : 'success';
        $message = $reservations->isEmpty()
            ? 'No hay reservas disponibles'
            : 'Reservas cargados correctamente';

        // Retornamos Inertia con paginación correcta
        return Inertia::render('admin/reservation/Index', [
            'reservations' => $reservations,
            'message' => $message,
            'status' => $status
        ]);
    }

    public function create(): Response
    {
        $services = Service::all();
        $stylists = User::with(['availabilities.hour', 'availabilities.day'])->where('role', 'stylist')->get();
        $clients = Client::where('status', 'active')->get();
        $reservations = Reservation::where('status', 'pending')->orWhere('status', 'confirmed')->get();

        return Inertia::render('admin/reservation/Create', [
            'services' => $services,
            'stylists' => $stylists,
            'reservations' => $reservations,
            'clients' => $clients
        ]);
    }

    // Crear reservación
    public function store(StoreReservationRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            // Evitamos duplicados con updateOrCreate
            Reservation::firstOrCreate([
                'stylist_id' => $request->stylist_id,
                'date' => $request->date,
                'time' => $request->time,
            ], $request->validated());

            DB::commit();

            return redirect()->route('admin.reservations.index')->with('success', 'Reserva creada correctamente.');

        } catch (\Throwable $e) {
            DB::rollBack();
            // Podrías loguear el error si tienes monitoreo
            Log::error("Error al guardar reserva: {$e->getMessage()}");
            return redirect()
                ->back()
                ->withErrors(['error' => 'Hubo un problema al registrar la reserva.']);
        }
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,in_progress,completed,cancelled',
        ]);

        if ($reservation->status === 'completed' || $reservation->status === 'cancelled') {
            return back()->withErrors(['error' => 'No se puede modificar una reserva finalizada o cancelada.']);
        }

        $reservation->update(['status' => $request->status]);

        return redirect()->back()->with([
            'success' => true,
            'message' => 'Estado actualizado correctamente',
            'status' => $reservation->status_label,
        ]);
    }

}
