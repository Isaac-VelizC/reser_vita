<?php

namespace Database\Seeders;

use App\Models\SalonDay;
use App\Models\SalonHour;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AvailabilitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $days = [
            0 => false, // Domingo cerrado
            1 => true,  // Lunes
            2 => true,  // Martes
            3 => true,  // Miércoles
            4 => true,  // Jueves
            5 => true,  // Viernes
            6 => true,  // Sábado
        ];

        foreach ($days as $day => $isOpen) {
            $salonDay = SalonDay::create([
                // 'salon_id' => $salon->id,
                'day_of_week' => $day,
                'is_open' => $isOpen,
            ]);

            if ($isOpen) {
                // Ejemplo: mañana y tarde
                SalonHour::create([
                    'name' => 'Mañana',
                    'salon_day_id' => $salonDay->id,
                    'open_time' => '09:00:00',
                    'close_time' => '13:00:00',
                ]);

                SalonHour::create([
                    'name' => 'Tarde',
                    'salon_day_id' => $salonDay->id,
                    'open_time' => '15:00:00',
                    'close_time' => '20:00:00',
                ]);
            }
        }

        $stylistIds = [2, 3]; // IDs de los estilistas de ejemplo
        $salonDays = DB::table('salon_days')->where('is_open', true)->pluck('id');

        foreach ($stylistIds as $stylistId) {
            foreach ($salonDays as $dayId) {
                // Obtener solo las horas de este día
                $hoursOfDay = DB::table('salon_hours')->where('salon_day_id', $dayId)->pluck('id');

                foreach ($hoursOfDay as $hourId) {
                    DB::table('availabilities')->insert([
                        'stylist_id' => $stylistId,
                        'salon_day_id' => $dayId,
                        'salon_hour_id' => $hourId,
                        'is_working' => true,
                        'is_available' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
