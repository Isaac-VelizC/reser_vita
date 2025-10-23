<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Admin Belleza Total',
            'email' => 'admin@bellezatotal.com',
            'phone' => '70000000',
            'password' => Hash::make('admin12345'),
            'role' => 'admin',
        ]);
        // Estilistas
        User::create([
            'name' => 'Maria Estilista',
            'email' => 'maria@bellezatotal.com',
            'phone' => '70000001',
            'password' => Hash::make('password123'),
            'role' => 'stylist',
        ]);
        User::create([
            'name' => 'Pedro Estilista',
            'email' => 'pedro@bellezatotal.com',
            'phone' => '70000002',
            'password' => Hash::make('password123'),
            'role' => 'stylist',
        ]);
        // Clientes
        Client::create([
            'name' => 'Ana Cliente',
            'surname' => 'Gomez',
            'email' => 'ana@cliente.com',
            'phone' => '70000003',
        ]);
        Client::create([
            'name' => 'Luis Cliente',
            'surname' => 'Gomez',
            'email' => 'luis@cliente.com',
            'phone' => '70000004',
        ]);
    }
}
