<?php

namespace App\Http\Resources;

use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Quote
 */
class QuoteResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quote' => $this->getTranslations('quote'),
            'cover' => $this->getFirstMediaUrl('quote_cover') ?: null,
            'movie_id' => $this->movie_id,
            'user_id' => $this->user_id,
        ];
    }
}
