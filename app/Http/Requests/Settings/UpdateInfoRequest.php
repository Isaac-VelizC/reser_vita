<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInfoRequest extends FormRequest
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
            'currency' => 'required|string|max:10',
            'language' => 'required|string|max:10',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // imagen opcional con tamaño max 2MB
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'address2' => 'nullable|string|max:255',
            'years_experience' => 'nullable|integer|min:0|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'currency.required' => 'La moneda es obligatoria.',
            'currency.string' => 'La moneda debe ser un texto.',
            'currency.max' => 'La moneda no puede exceder :max caracteres.',

            'language.required' => 'El idioma es obligatorio.',
            'language.string' => 'El idioma debe ser un texto.',
            'language.max' => 'El idioma no puede exceder :max caracteres.',

            'logo.image' => 'El archivo debe ser una imagen.',
            'logo.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg o gif.',
            'logo.max' => 'La imagen no debe superar los 2MB.',

            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser un texto.',
            'name.max' => 'El nombre no puede superar :max caracteres.',

            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.max' => 'El correo electrónico no puede superar :max caracteres.',

            'phone.string' => 'El teléfono debe ser un texto.',
            'phone.max' => 'El teléfono no puede superar :max caracteres.',

            'address.string' => 'La dirección debe ser un texto.',
            'address.max' => 'La dirección no puede superar :max caracteres.',

            'address2.string' => 'La dirección secundaria debe ser un texto.',
            'address2.max' => 'La dirección secundaria no puede superar :max caracteres.',

            'years_experience.integer' => 'Los años de experiencia deben ser un número entero.',
            'years_experience.min' => 'Los años de experiencia no pueden ser negativos.',
            'years_experience.max' => 'Los años de experiencia no pueden exceder :max.',
        ];
    }
}
