<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

/**
 * @phpstan-type QuoteDetails array{
 *     quote_en: string,
 *     quote_ka: string,
 *     movie_id: int,
 *     cover?: UploadedFile
 * }
 */
class StoreQuoteRequest extends FormRequest
{
    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'quote_en' => ['required', 'string', 'max:1000'],
            'quote_ka' => ['required', 'string', 'max:1000'],
            'cover' => ['nullable', 'image', 'max:5120'],
            'movie_id' => ['required', 'integer'],
        ];
    }

    /**
     * @return QuoteDetails
     */
    public function quoteDetails(): array
    {
        /** @var QuoteDetails $validated */
        $validated = $this->validated();

        return $validated;
    }
}
