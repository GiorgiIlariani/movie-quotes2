<?php

namespace App\Actions;

use App\Models\Quote;
use App\Models\User;

class ToggleLike
{
    public function handle(Quote $quote, User $user): void
    {
        $deleted = $quote->likes()->whereBelongsTo($user)->delete();

        if ($deleted === 0) {
            $quote->likes()->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
