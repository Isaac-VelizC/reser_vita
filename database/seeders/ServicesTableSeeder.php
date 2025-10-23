<?php

namespace Database\Seeders;

use App\Models\Service;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::insert([
            [
                'name' => 'Corte de Cabello',
                'description' => 'Corte de cabello profesional para hombres y mujeres.',
                'duration_minutes' => 45,
                'price' => 50.00,
            ],
            [
                'name' => 'Peinado',
                'description' => 'Peinados elegantes para eventos especiales.',
                'duration_minutes' => 60,
                'price' => 80.00,
            ],
            [
                'name' => 'Manicure',
                'description' => 'Cuidado de uñas y esmaltado.',
                'duration_minutes' => 30,
                'price' => 40.00,
            ]
        ]);
    }
}
