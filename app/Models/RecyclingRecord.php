<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecyclingRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pickup_request_id',
        'recycling_center_id', // Added
        'quantity',
        'processed_at',
    ];

    protected $casts = [
        'processed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pickupRequest()
    {
        return $this->belongsTo(PickupRequest::class);
    }

    public function recyclingCenter()
    {
        return $this->belongsTo(RecyclingCenter::class);
    }
}