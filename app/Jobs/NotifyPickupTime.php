<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\PickupRequest;
use App\Notifications\PickupTimeReminder;

class NotifyPickupTime implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $pickup;

    public function __construct(PickupRequest $pickup)
    {
        $this->pickup = $pickup;
    }

    public function handle()
    {
        $this->pickup->user->notify(new PickupTimeReminder($this->pickup));
    }
}