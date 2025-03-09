<?php

namespace App\Notifications;

use App\Models\PickupRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class PickupTimeReminder extends Notification
{
    use Queueable;

    protected PickupRequest $pickupRequest;

    public function __construct(PickupRequest $pickupRequest)
    {
        $this->pickupRequest = $pickupRequest;
    }

    public function via($notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray($notifiable): array
    {
        return [
            'id' => $this->id,
            'message' => "Your pickup for {$this->pickupRequest->quantity} kg of {$this->pickupRequest->plastic_type} is happening now!",
            'pickup_id' => $this->pickupRequest->id,
            'scheduled_at' => $this->pickupRequest->scheduled_at->toDateTimeString(),
            'created_at' => now()->toDateTimeString(),
        ];
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }
}