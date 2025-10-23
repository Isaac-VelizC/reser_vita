<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|max:100|unique:services,name,' . $this->route('id'),
            'description' => 'required|max:500',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.unique' => 'El nombre ya está en uso. Por favor elige otro.',
            'name.max' => 'El nombre no debe superar los 100 caracteres.',

            'description.required' => 'La descripción es obligatoria.',
            'description.max' => 'La descripción no debe superar los 500 caracteres.',

            'price.required' => 'El precio es obligatorio.',
            'price.numeric' => 'El precio debe ser un número válido.',
            'price.min' => 'El precio no puede ser negativo.',

            'duration_minutes.required' => 'La duración en minutos es obligatoria.',
            'duration_minutes.integer' => 'La duración debe ser un número entero.',
            'duration_minutes.min' => 'La duración mínima es de 1 minuto.',
        ];
    }
}
