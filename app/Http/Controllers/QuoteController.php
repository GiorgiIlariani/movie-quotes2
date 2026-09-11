<?php

namespace App\Http\Controllers;

use App\Actions\CreateQuote;
use App\Http\Requests\StoreQuoteRequest;
use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuoteRequest $request, CreateQuote $action): RedirectResponse
    {
        $action->handle($request->quoteDetails(), $request->user());

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Quote $quote): Response
    {
        $quote->load([
            'media',
            'movie',
            'user',
            'comments' => fn (HasMany $query) => $query->with('user')->oldest(),
        ])->loadCount(['likes', 'comments'])
            ->loadExists([
                'likes as liked' => fn (Builder $query) => $query->where('user_id', $request->user()->id),
            ]);

        return Inertia::render('Quotes/Show', [
            'quote' => new QuoteResource($quote),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreQuoteRequest $request, Quote $quote, CreateQuote $action): RedirectResponse
    {
        $action->handle($request->quoteDetails(), $request->user(), $quote);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quote $quote): RedirectResponse
    {
        $quote->delete();

        return back();
    }
}
