<?php

namespace Database\Seeders;

use App\Models\Reservation;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Reservation::insert([
            [
                'customer_id' => 1,
                'service_id' => 1,
                'stylist_id' => 3,
                'date' => now()->addDay()->setTime(10, 0),
                'time' => '11:00',
                'status' => 'confirmed',
                'notes' => 'Prefiere estilo bob.',
            ],
            [
                
                'customer_id' => 2,
                'service_id' => 2,
                'stylist_id' => 2,
                'date' => now()->addDay(2)->setTime(15, 0),
                'time' => '15:00',
                'status' => 'pending',
                'notes' => 'Evento de boda.',
            ]
        ]);
    }
}
