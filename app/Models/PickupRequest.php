<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PickupRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'collector_id',
        'plastic_type',
        'quantity',
        'status',
        'scheduled_at',
        'compliance_notes',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function collector()
    {
        return $this->belongsTo(User::class, 'collector_id');
    }

    public function recyclingRecord()
    {
        return $this->hasOne(RecyclingRecord::class);
    }
}