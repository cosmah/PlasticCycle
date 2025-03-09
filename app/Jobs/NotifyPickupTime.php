<?php

namespace App\Jobs;

use App\Models\PickupRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PickupTimeReminder;

class NotifyPickupTime implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected PickupRequest $pickupRequest;

    public function __construct(PickupRequest $pickupRequest)
    {
        $this->pickupRequest = $pickupRequest;
    }

    public function handle(): void
    {
        if ($this->pickupRequest->status === 'scheduled' && now()->gte($this->pickupRequest->scheduled_at)) {
            $this->pickupRequest->user->notify(new PickupTimeReminder($this->pickupRequest));
        }
    }
}