<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateInfoRequest;
use App\Models\SalonDay;
use App\Models\SalonHour;
use App\Models\Setting;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
use Inertia\Inertia;

class InfoController extends Controller
{
    public function edit()
    {
        try {
            // $this->authorize('view', Setting::class); // Política de acceso
            $setting = cache()->remember('setting.configuration', 60, function () {
                return Setting::findOrFail(1);
            });
            return Inertia::render('settings/configuration', [
                'dataSetting' => $setting->only(['currency', 'language', 'logo', 'name', ' email', 'phone', 'address', 'address2', 'years_experience'])
            ]);
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Configuración no encontrada.');
        } catch (AuthorizationException $e) {
            abort(403, 'No autorizado.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al cargar la configuración.');
        }
    }

    public function update(UpdateInfoRequest $request): RedirectResponse
    {
        try {
            //$this->authorize('update', Setting::class);

            $setting = Setting::findOrFail(1);

            if ($request->hasFile('logo')) {
                $file = $request->file('logo');
                $path = $file->store('logos', 'public');
                $request->merge(['logo' => $path]);
            }

            // Actualizar solo con datos validados
            $setting->update($request->validated());

            return redirect()->back()->with('success', 'Configuración actualizada correctamente.');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Configuración no encontrada.');
        } catch (AuthorizationException $e) {
            abort(403, 'No autorizado.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Error al actualizar la configuración.');
        }
    }

    public function editSchedules() : Response {
        $salonDay = SalonDay::with('hours')->get();
        return Inertia::render('settings/schedules', [
            'dataSchedules' => $salonDay
        ]);
    }

    public function deleteHour($id): RedirectResponse
    {
        try {
            SalonHour::findOrFail($id)->delete();
            return back()->with('success', 'Horario eliminado correctamente.');
        } catch (ModelNotFoundException $e) {
            return back()->with('error', 'El horario no existe o ya fue eliminado.');
        } catch (\Throwable $e) {
            Log::error('Error eliminando horario: ' . $e->getMessage());
            return back()->with('error', 'Ocurrió un error inesperado al eliminar el horario.');
        }
    }

    public function toggleDayStatus(int $id): RedirectResponse
    {
        try {
            $day = SalonDay::findOrFail($id);

            // Alternar estado
            $day->is_open = !$day->is_open;
            $day->save();

            $message = $day->is_open 
                ? 'El día ha sido abierto correctamente.' 
                : 'El día ha sido cerrado correctamente.';

            return back()->with('success', $message);

        } catch (ModelNotFoundException $e) {
            return back()->with('error', 'El día no existe.');
        } catch (\Throwable $e) {
            Log::error('Error cambiando estado del día: ' . $e->getMessage());
            return back()->with('error', 'Ocurrió un error inesperado al actualizar el estado.');
        }
    }

    public function storeDayHour(Request $request): RedirectResponse
    {
        if ($this->horarioSeSolapa($request->salon_day_id, $request->open_time, $request->close_time)) {
            return back()->with('error', 'Ya existe un horario que se cruza con este.');
        }
        try {
            $validated = $request->validate([
                'name'         => 'required|string|max:255',
                'open_time'    => 'required|date_format:H:i',
                'close_time'   => 'required|date_format:H:i|after:open_time',
                'salon_day_id' => 'required|integer|exists:salon_days,id',
            ]);

            SalonHour::create($validated);

            return back()->with('success', 'Horario agregado correctamente.');
        } catch (\Throwable $e) {
            Log::error('Error creando horario: ' . $e->getMessage());
            return back()->with('error', 'Ocurrió un error al registrar el horario.');
        }
    }

    public function updateDayHour(Request $request, $id): RedirectResponse
    {
        try {
            // Normalizar los tiempos a HH:MM:SS
            $request->merge([
                'open_time'  => date('H:i:s', strtotime($request->open_time)),
                'close_time' => date('H:i:s', strtotime($request->close_time)),
            ]);

            // Validación
            $validated = $request->validate([
                'name'         => 'required|string|max:255',
                'open_time'    => 'required|date_format:H:i:s',
                'close_time'   => 'required|date_format:H:i:s|after:open_time',
                'salon_day_id' => 'required|integer|exists:salon_days,id',
            ]);

            if ($this->horarioSeSolapa($request->salon_day_id, $request->open_time, $request->close_time, $id)) {
                return back()->with('error', 'Ya existe un horario que se cruza con este.');
            }

            $hour = SalonHour::findOrFail($id);
            $hour->update($validated);

            return back()->with('success', 'Horario actualizado correctamente.');
        } catch (\Throwable $e) {
            dd($e->getMessage());
            Log::error('Error actualizando horario: ' . $e->getMessage());
            return back()->with('error', 'Ocurrió un error al actualizar el horario.');
        }
    }

    private function horarioSeSolapa($dayId, $openTime, $closeTime, $excludeId = null)
    {
        // $openTime = date('H:i:s', strtotime($openTime));
        // $closeTime = date('H:i:s', strtotime($closeTime));

        $query = SalonHour::where('salon_day_id', $dayId)
            ->where('open_time', '<', $closeTime)   // inicio nuevo < fin existente
            ->where('close_time', '>', $openTime);  // fin nuevo > inicio existente

        if (!is_null($excludeId)) {
            $query->where('id', '!=', $excludeId);  // evitar comparar contra sí mismo
        }

        return $query->exists();
    }


}
