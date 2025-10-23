<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('currency', 3)->default('USD'); // Código ISO de moneda (ejemplo: USD, EUR)
            $table->string('language', 5)->default('es'); // Código ISO de idioma (ejemplo: es, en)
            $table->string('logo')->nullable(); // URL o ruta del logo
            $table->string('name')->default('Nombre del negocio'); // Nombre del negocio o app
            $table->string('email')->nullable(); // Correo electrónico
            $table->string('phone')->nullable(); // Número telefónico
            $table->string('address')->nullable();
            $table->string('address2')->nullable();
            $table->integer('years_experience')->default(0); // Años de experiencia        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
