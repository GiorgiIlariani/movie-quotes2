<?php

namespace App\Actions;

use App\Models\Comment;
use App\Models\Quote;
use App\Models\User;

class CreateComment
{
    public function handle(string $comment, Quote $quote, User $user): Comment
    {
        return $quote->comments()->create([
            'comment' => $comment,
            'user_id' => $user->id,
        ]);
    }
}
