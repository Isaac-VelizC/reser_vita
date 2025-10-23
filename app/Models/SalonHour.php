<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalonHour extends Model
{
    protected $fillable = [
        'name',
        'open_time',
        'close_time',
        'salon_day_id'
    ];

    // Un horario pertenece a un día
    public function salonday(): BelongsTo 
    {
        return $this->belongsTo(SalonDay::class, 'salon_day_id');
    }
    
    // Un horario puede tener varias disponibilidades
    public function availabilities(): HasMany 
    {
        return $this->hasMany(Availability::class, 'salon_hour_id');
    }
}
