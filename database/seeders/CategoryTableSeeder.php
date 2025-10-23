<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::insert([
            [
                'name' => 'Corte',
                'description' => 'Corte de cabello profesional para hombres y mujeres.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Color',
                'description' => 'Peinados elegantes para eventos especiales.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tratamientos',
                'description' => 'Cuidado de uñas y esmaltado.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maquillaje',
                'description' => 'Cuidado de uñas y esmaltado.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
