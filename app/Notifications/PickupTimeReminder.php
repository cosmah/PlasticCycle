<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\PickupRequest;

class PickupTimeReminder extends Notification
{
    use Queueable;

    protected $pickup;

    public function __construct(PickupRequest $pickup)
    {
        $this->pickup = $pickup;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "Reminder: Your pickup for {$this->pickup->quantity} kg of {$this->pickup->plastic_type} is happening now!",
            'pickup_id' => $this->pickup->id,
            'scheduled_at' => $this->pickup->scheduled_at->toDateTimeString(),
        ];
    }
}