<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Availability extends Model
{
    protected $fillable = [
        'salon_day_id',
        'salon_hour_id',
        'is_working',
        'is_available',
        'stylist_id',
    ];

    public function stylist(): BelongsTo 
    {
        return $this->belongsTo(User::class, 'stylist_id');
    }

    public function day(): BelongsTo 
    {
        return $this->belongsTo(SalonDay::class, 'salon_day_id');
    }

    public function hour(): BelongsTo 
    {
        return $this->belongsTo(SalonHour::class, 'salon_hour_id');
    }
}
