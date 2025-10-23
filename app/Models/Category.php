<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    // Un horario puede tener varias disponibilidades
    public function galleries(): HasMany 
    {
        return $this->hasMany(Gallery::class, 'category_id');
    }
}
