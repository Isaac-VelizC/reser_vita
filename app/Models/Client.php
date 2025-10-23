<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'status'
    ];

    // Un horario puede tener varias disponibilidades
    public function historial(): HasMany 
    {
        return $this->hasMany(Reservation::class, 'customer_id');
    }
}