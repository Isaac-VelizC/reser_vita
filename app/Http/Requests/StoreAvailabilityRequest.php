<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAvailabilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'day_id'    => 'required|exists:salon_days,id',
            'hour_id'   => 'required|exists:salon_hours,id',
            'stylist_id'=> 'required|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'day_id.required'      => 'Debes seleccionar un día.',
            'day_id.exists'        => 'El día seleccionado no existe.',
            'hour_id.required'     => 'Debes seleccionar un horario.',
            'hour_id.exists'       => 'El horario seleccionado no existe.',
            'stylist_id.required'  => 'El estilista es obligatorio.',
            'stylist_id.exists'    => 'El estilista seleccionado no existe.',
        ];
    }
}
