<?php

namespace App\Http\Controllers;

use App\Actions\CreateComment;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;

class QuoteCommentController extends Controller
{
    /**
     * Store a comment on the quote.
     */
    public function store(StoreCommentRequest $request, Quote $quote, CreateComment $action): RedirectResponse
    {
        $action->handle($request->comment(), $quote, $request->user());

        return back();
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return back();
    }
}
