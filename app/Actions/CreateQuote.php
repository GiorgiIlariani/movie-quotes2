<?php

namespace App\Actions;

use App\Http\Requests\StoreQuoteRequest;
use App\Models\Quote;
use App\Models\User;

/**
 * @phpstan-import-type QuoteDetails from StoreQuoteRequest
 */
class CreateQuote
{
    /**
     * @param  QuoteDetails  $quoteDetails
     */
    public function handle(array $quoteDetails, User $user, ?Quote $quote = null): Quote
    {
        /** @var Quote $quote */
        $quote = $user->quotes()->updateOrCreate(
            ['id' => $quote?->id],
            [
                'quote' => [
                    'en' => $quoteDetails['quote_en'],
                    'ka' => $quoteDetails['quote_ka'],
                ],
                'movie_id' => $quoteDetails['movie_id'],
            ],
        );

        if (isset($quoteDetails['cover'])) {
            $quote->addMedia($quoteDetails['cover'])->toMediaCollection('quote_cover');
        }

        return $quote;
    }
}
