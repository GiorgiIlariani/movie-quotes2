<?php

namespace App\Http\Controllers;

use App\Actions\CreateQuote;
use App\Http\Requests\StoreQuoteRequest;
use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;

class QuoteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuoteRequest $request, CreateQuote $action): RedirectResponse
    {
        $quote = $action->handle($request->quoteDetails(), $request->user());

        return to_route('movies.index', $quote);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quote $quote): QuoteResource
    {
        return QuoteResource::make($quote);
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
