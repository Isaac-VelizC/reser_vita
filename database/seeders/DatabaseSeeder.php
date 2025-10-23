<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('settings')->insert([
            'logo' => null,
            'name' => 'Nombre del negocio',
            'email' => 'contacto@negocio.com',
            'phone' => '+591 12345678',
            'address' => 'Dirección principal del negocio',
            'address2' => 'Dirección secundaria o detalles',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        // User::factory(10)->create();
        $this->call([
            UsersTableSeeder::class,
            ServicesTableSeeder::class,
            AvailabilitiesTableSeeder::class,
            ReservationsTableSeeder::class,
            CategoryTableSeeder::class,
        ]);
    }
}
