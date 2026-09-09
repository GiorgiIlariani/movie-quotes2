<?php

namespace App\Policies;

use App\Models\Quote;
use App\Models\User;

class QuotePolicy
{
    /**
     * Determine whether the user can update or delete the model.
     */
    public function workWith(User $user, Quote $quote): bool
    {
        return $user->id === $quote->user_id;
    }
}
