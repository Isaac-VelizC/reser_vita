<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u',],
            'surname' => ['required', 'string', 'max:100', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/u',],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^\+?[0-9]{7,15}$/', Rule::unique('clients')->ignore($this->route('id'))],
            // 'status' => ['required', 'string', Rule::in(['active', 'inactive', 'suspended'])],
        ];
    }
    
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.max' => 'El nombre no debe exceder los 100 caracteres.',
            'surname.required' => 'El apellido es obligatorio.',
            'surname.max' => 'El apellido no debe exceder los 100 caracteres.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.regex' => 'El teléfono debe tener entre 7 y 15 dígitos y puede incluir prefijo internacional.',
            'phone.unique' => 'El teléfono ya está registrado.',
            // 'status.required' => 'El estado es obligatorio.',
            // 'status.in' => 'El estado debe ser activo, inactivo o suspendido.',
        ];
    }
}
