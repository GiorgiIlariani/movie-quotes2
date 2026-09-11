<?php

namespace App\Actions;

use App\Models\Quote;
use App\Models\User;
use App\Notifications\QuoteLiked;

class ToggleLike
{
    public function handle(Quote $quote, User $user): void
    {
        $deleted = $quote->likes()->whereBelongsTo($user)->delete();

        if ($deleted === 0) {
            $quote->likes()->create([
                'user_id' => $user->id,
            ]);

            $this->notifyOwner($quote, $user);
        }
    }

    private function notifyOwner(Quote $quote, User $user): void
    {
        if ($quote->user_id === $user->id) {
            return;
        }

        $quote->loadMissing('user');

        if ($quote->user === null) {
            return;
        }

        $quote->user->notify(new QuoteLiked($user, $quote));
    }
}
