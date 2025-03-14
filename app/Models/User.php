<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'type',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Requests where the user is the requester
    public function pickupRequests()
    {
        return $this->hasMany(PickupRequest::class, 'user_id');
    }

    // Requests where the user is the collector
    public function collectedRequests()
    {
        return $this->hasMany(PickupRequest::class, 'collector_id');
    }

    public function rewards()
    {
        return $this->hasMany(Reward::class);
    }

    public function recyclingRecords()
    {
        return $this->hasMany(RecyclingRecord::class);
    }
}