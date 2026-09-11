<?php

namespace App\Notifications;

use App\Models\Quote;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class QuoteLiked extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public User $actor,
        public Quote $quote,
    ) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * @return array{kind: string, actor_name: string, quote_id: int, quote_cover: string|null}
     */
    public function toArray(object $notifiable): array
    {
        return [
            'kind' => 'like',
            'actor_name' => $this->actor->name,
            'quote_id' => $this->quote->id,
            'quote_cover' => $this->quote->getFirstMediaUrl('quote_cover') ?: null,
        ];
    }
}
