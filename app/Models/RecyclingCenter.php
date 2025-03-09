<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecyclingCenter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'accepted_plastic_types',
        'capacity',
    ];

    protected $casts = [
        'accepted_plastic_types' => 'array', // JSON array of plastic types (e.g., ["PET", "HDPE"])
    ];
}