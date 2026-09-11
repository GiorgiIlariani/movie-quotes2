<?php

namespace App\Actions;

use App\Models\Comment;
use App\Models\Quote;
use App\Models\User;
use App\Notifications\QuoteCommented;

class CreateComment
{
    public function handle(string $comment, Quote $quote, User $user): Comment
    {
        $created = $quote->comments()->create([
            'comment' => $comment,
            'user_id' => $user->id,
        ]);

        $this->notifyOwner($quote, $user);

        return $created;
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

        $quote->user->notify(new QuoteCommented($user, $quote));
    }
}
