<?php

namespace App\Http\Controllers;

use App\Actions\ToggleLike;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class QuoteLikeController extends Controller
{
    /**
     * Toggle the authenticated user's like on the quote.
     */
    public function store(Request $request, Quote $quote, ToggleLike $action): RedirectResponse
    {
        $action->handle($quote, $request->user());

        return back();
    }
}
