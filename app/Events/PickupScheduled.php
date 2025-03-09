<?php

namespace App\Events;

use App\Models\PickupRequest;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class PickupScheduled implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public PickupRequest $pickupRequest;

    public function __construct(PickupRequest $pickupRequest)
    {
        $this->pickupRequest = $pickupRequest;
    }

    public function broadcastOn(): array
    {
        return [new PrivateChannel('user.' . $this->pickupRequest->user_id)];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->pickupRequest->id,
            'message' => "Pickup scheduled for {$this->pickupRequest->quantity} kg of {$this->pickupRequest->plastic_type} on " . $this->pickupRequest->scheduled_at->toDateTimeString(),
            'pickup_id' => $this->pickupRequest->id,
            'scheduled_at' => $this->pickupRequest->scheduled_at->toDateTimeString(),
            'created_at' => now()->toDateTimeString(),
        ];
    }
}