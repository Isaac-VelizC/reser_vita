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
        Schema::create('availabilities', function (Blueprint $table) {
            $table->id();

            // Relación al día de la semana del salón
            $table->unsignedBigInteger('salon_day_id');
            $table->foreign('salon_day_id')->references('id')->on('salon_days')->onDelete('cascade');

            // Relación al bloque de hora del salón (mañana, tarde, noche)
            $table->unsignedBigInteger('salon_hour_id');
            $table->foreign('salon_hour_id')->references('id')->on('salon_hours')->onDelete('cascade');

            // Indica si el estilista trabaja en ese bloque o no
            $table->boolean('is_working')->default(true);

            // Indica si está disponible para reserva
            $table->boolean('is_available')->default(true);

            // Relación con el estilista
            $table->foreignId('stylist_id')->constrained('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('availabilities');
    }
};
