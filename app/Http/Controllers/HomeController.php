<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\SalonDay;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        /**
         * 🧠 Caching general del dashboard (5 min)
         * Solo se recalculan los KPIs cada cierto tiempo
         */
        $data = Cache::remember('dashboard.data', now()->addMinutes(5), function () use ($today) {

            // === KPIs ===
            $reservasHoy = Reservation::whereDate('date', $today)->count();
            $reservasAyer = Reservation::whereDate('date', $today->copy()->subDay())->count();
            $cambioReservas = $reservasAyer
                ? round((($reservasHoy - $reservasAyer) / max(1, $reservasAyer)) * 100, 2)
                : 0;

            $estilistasActivos = User::where('role', 'stylist')
                ->where('status', 'active')
                ->count();

            $ingresosDia = Reservation::with('service')
                ->where('stylist_id', 2)
                ->where('status', 'completed')
                ->whereDate('date', $today)
                ->get()
                ->sum(fn($r) => $r->service->price);

            $cancelaciones = Reservation::whereDate('date', $today)
                ->where('status', 'canceled')
                ->count();

            $pendientes = Reservation::whereDate('date', $today)
                ->where('status', 'pending')
                ->count();

            $horasDisponibles = DB::table('availabilities')
                ->where('is_available', true)
                ->count();

            // === Reservas de hoy ===
            $reservasHoyList = Reservation::with(['stylist:id,name', 'customer:id,name, surname', 'service:id,name'])
                ->whereDate('date', $today)
                ->orderBy('time')
                ->select('id', 'customer_id', 'time', 'status', 'notes', 'stylist_id', 'service_id')
                ->get()
                ->map(fn($r) => [
                    'id' => $r->id,
                    'time' => $r->time,
                    'client' => $r->customer?->name . ' ' . $r->customer?->surname,
                    'service' => $r->service?->name,
                    'stylist' => $r->stylist?->name,
                    'status' => $r->status,
                    'notes' => $r->notes,
                ]);

            // === Estilistas (Optimizado con withCount) ===
            $estilistas = User::where('role', 'stylist')
                ->withCount([
                    'reservations as reservas_dia' => fn($q) => $q->whereDate('date', $today),
                    'reservations as reservas_mes' => fn($q) => $q->whereMonth('date', now()->month),
                ])
                ->select('id', 'name')
                ->get()
                ->map(function ($stylist) {
                    $ingresos = Reservation::where('reservations.stylist_id', $stylist->id)
                        ->where('reservations.status', 'completed')
                        ->join('services', 'reservations.service_id', '=', 'services.id')
                        ->sum('services.price');

                    return [
                        'id' => $stylist->id,
                        'name' => $stylist->name,
                        'avatar_color' => 'bg-' . collect(['pink', 'blue', 'purple', 'orange', 'green'])->random() . '-500',
                        'reservas_dia' => $stylist->reservas_dia,
                        'reservas_mes' => $stylist->reservas_mes,
                        'ingresos' => $ingresos,
                        'desempeno' => rand(75, 95),
                    ];
                });

            // === Horarios de la semana (cache largo, se actualiza 1 vez al día)
            $horariosSemana = Cache::remember('dashboard.horarios', now()->addDay(), function () {
                return SalonDay::with('hours')->get()->map(function ($day) {
                    $totalHours = $day->hours->sum(fn($h) =>
                        Carbon::parse($h->close_time)->diffInHours(Carbon::parse($h->open_time))
                    );
                    return [
                        'day' => $day->day_of_week,
                        'is_open' => $day->is_open,
                        'open' => $day->hours->first()?->open_time ?? '-',
                        'close' => $day->hours->last()?->close_time ?? '-',
                        'hours' => $totalHours,
                    ];
                });
            });

            // === Reservas por día de la semana ===
            // $reservasSemana = Reservation::selectRaw('DAYNAME(date) as day, COUNT(*) as count')
            //     ->whereBetween('date', [now()->startOfWeek(), now()->endOfWeek()])
            //     ->groupBy('day')
            //     ->get();
            // En tu DashboardController
            $reservasSemana = Reservation::selectRaw("
                    strftime('%w', date) as day_index,
                    COUNT(*) as count
                ")
                ->whereBetween('date', [now()->startOfWeek(), now()->endOfWeek()])
                ->groupBy('day_index')
                ->get()
                ->map(function ($item) {
                    $days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
                    return [
                        'day' => $days[(int) $item->day_index],
                        'count' => $item->count,
                    ];
                });

            // === Servicios populares (cacheados 1h)
            $serviciosPopulares = Cache::remember('dashboard.servicios_populares', now()->addHour(), function () {
                $total = max(1, Reservation::count());
                return Service::select('name', DB::raw('COUNT(reservations.id) as count'))
                    ->leftJoin('reservations', 'services.id', '=', 'reservations.service_id')
                    ->groupBy('services.id', 'services.name')
                    ->orderByDesc('count')
                    ->take(5)
                    ->get()
                    ->map(fn($s) => [
                        'name' => $s->name,
                        'count' => $s->count,
                        'percentage' => round(($s->count / $total) * 100),
                    ]);
            });

            // === Estado de reservas ===
            $estadoReservas = Reservation::select('status', DB::raw('COUNT(*) as total'))
                ->groupBy('status')
                ->pluck('total', 'status');

            // === Actividad reciente ===
            $actividadReciente = Reservation::latest()
                ->with(['stylist:id,name', 'service:id,name'])
                ->take(5)
                ->get()
                ->map(function ($r) {
                    return [
                        'type' => $r->status,
                        'message' => "{$r->name_client} reservó {$r->service?->name} con {$r->stylist?->name}",
                        'time' => $r->created_at,
                        'color' => match ($r->status) {
                            'confirmed' => 'success',
                            'canceled' => 'error',
                            'pending' => 'info',
                            'completed' => 'warning',
                            default => 'primary',
                        },
                    ];
                });

            return [
                'kpis' => [
                    'reservas_hoy' => [
                        'value' => $reservasHoy,
                        'change' => $cambioReservas . '%',
                        'trend' => $cambioReservas >= 0 ? 'up' : 'down'
                    ],
                    'estilistas_activos' => [
                        'value' => $estilistasActivos,
                        'change' => '100%',
                        'trend' => 'neutral'
                    ],
                    'ingresos_dia' => [
                        'value' => $ingresosDia,
                        'change' => '+15%',
                        'trend' => 'up'
                    ],
                    'horas_disponibles' => [
                        'value' => $horasDisponibles,
                        'change' => '-2',
                        'trend' => 'down'
                    ],
                    'pendientes' => [
                        'value' => $pendientes,
                        'change' => '0',
                        'trend' => 'neutral'
                    ],
                    'cancelaciones' => [
                        'value' => $cancelaciones,
                        'change' => '+1',
                        'trend' => 'down'
                    ],
                ],
                'reservas_hoy' => $reservasHoyList,
                'estilistas' => $estilistas,
                'horarios_semana' => $horariosSemana,
                'reservas_semana' => $reservasSemana,
                'servicios_populares' => $serviciosPopulares,
                'estado_reservas' => $estadoReservas,
                'actividad_reciente' => $actividadReciente,
            ];
        });

        // === Render con Inertia ===
        return Inertia::render('dashboard', $data)->withViewData(['title' => 'Panel de Control']);
    }
}
