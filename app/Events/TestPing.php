<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;

class TestPing implements ShouldBroadcastNow
{
    use Dispatchable;
    use InteractsWithSockets;

    public function __construct(
        public string $kind,
        public string $message,
        public int $number,
        // public User $user,
    ) {}

    public function broadcastOn()
    {
        return new Channel('testing');
    }

    public function broadcastWith()
    {
        return [
            'kind' => $this->kind,
            'message' => $this->message,
            'number' => $this->number,
            // 'user' => $this->user,
        ];
    }
}
