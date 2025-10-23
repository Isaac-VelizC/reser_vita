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
        Schema::create('salon_hours', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->time('open_time');
            $table->time('close_time');
            
            $table->unsignedBigInteger('salon_day_id');
            $table->foreign('salon_day_id')->references('id')->on('salon_days')->onDelete('cascade');
        
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salon_hours');
    }
};
