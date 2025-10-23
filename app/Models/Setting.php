<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'currency',
        'language',
        'logo',
        'name',
        'email',
        'phone',
        'address',
        'address2',
        'years_experience'
    ];
}
