<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalonDay extends Model
{
    protected $fillable = [
        'day_of_week',
        'is_open',
    ];

    
    // Un día puede tener muchos horarios
    public function hours(): HasMany
    {
        return $this->hasMany(SalonHour::class, 'salon_day_id');
    }

    // Un día puede estar en varias disponibilidades
    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class, 'salon_day_id');
    }

}
