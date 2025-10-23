<?php

namespace App\Http\Requests;

use App\Models\Reservation;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Información del cliente
            'name_client'  => 'required_without:customer_id|string|max:255',
            'phone_client' => 'required_without:customer_id|string|max:20',
            'email_client' => 'required_without:customer_id|email',

            // Relaciones con otros modelos
            'customer_id'  => 'nullable|exists:users,id',
            'stylist_id'   => 'required|exists:users,id',
            'service_id'   => 'required|exists:services,id',

            // Fecha y hora
            'date'         => [
                'required',
                'date_format:Y-m-d',
                'after_or_equal:today'
            ],
            'time'         => [
                'required',
                'date_format:H:i',
            ],

            // Notas
            'notes'        => 'nullable|string|max:500',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $stylistId = $this->input('stylist_id');
            $serviceId = $this->input('service_id');
            $date = $this->input('date');
            $time = $this->input('time');

            // Validar fecha y hora combinadas
            if ($date && $time) {

                $start = Carbon::parse("{$date} {$time}");
                /*if ($start->isPast()) {
                    $validator->errors()->add('date', 'La fecha y hora deben estar en el futuro.');
                }*/

                // Validar disponibilidad del estilista
                if ($stylistId && $serviceId) {
                    $service = Service::find($serviceId);
                    $end = $start->copy()->addMinutes($service->duration_minutes ?? 30);

                    $hasConflict = Reservation::where('stylist_id', $stylistId)
                        ->where('date', $date)
                        ->where(function ($query) use ($start, $end) {
                            $query
                                ->whereBetween('start_time', [$start, $end])
                                ->orWhereBetween('end_time', [$start, $end]);
                        })
                        ->exists();

                    if ($hasConflict) {
                        $validator->errors()->add('time', 'El estilista no está disponible en ese horario.');
                    }
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'name_client.required_without'  => 'El nombre del cliente es obligatorio si no hay usuario asociado.',
            'phone_client.required_without' => 'El teléfono es obligatorio si no hay usuario asociado.',
            'email_client.required_without' => 'El correo es obligatorio si no hay usuario asociado.',
            'email_client.email'            => 'Debe ingresar un correo electrónico válido.',
            'stylist_id.required'           => 'Debe seleccionar un estilista.',
            'stylist_id.exists'             => 'El estilista seleccionado no existe.',
            'service_id.required'           => 'Debe seleccionar un servicio.',
            'service_id.exists'             => 'El servicio seleccionado no existe.',
            'date.required'                 => 'Debe seleccionar una fecha.',
            'date.date_format'              => 'El formato de la fecha no es válido (debe ser YYYY-MM-DD).',
            'date.after_or_equal'           => 'La fecha no puede ser anterior a hoy.',
            'time.required'                 => 'Debe seleccionar una hora.',
            'time.date_format'              => 'El formato de hora no es válido (debe ser HH:mm).',
        ];
    }
}
