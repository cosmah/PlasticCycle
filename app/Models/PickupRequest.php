<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PickupRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plastic_type',
        'quantity',
        'status',
        'scheduled_at',
        'compliance_notes', // Added for businesses
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function recyclingRecord()
    {
        return $this->hasOne(RecyclingRecord::class);
    }
}