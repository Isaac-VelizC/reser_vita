<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Gallery extends Model
{
    protected $fillable = [
        'category_id',
        'url',
        'title',
        'description',
        'alt_text',
        'position',
        'is_active'
    ];

    // Un horario puede tener varias disponibilidades
    public function galleries(): BelongsTo 
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
