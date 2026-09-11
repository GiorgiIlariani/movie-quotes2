<?php

namespace App\Http\Resources;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Movie
 */
class MovieResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getTranslations('title'),
            'director' => $this->getTranslations('director'),
            'description' => $this->getTranslations('description'),
            'cover' => $this->getFirstMediaUrl('movie_cover'),
            'release_year' => $this->release_year,
            'quotes' => QuoteResource::collection($this->whenLoaded('quotes')),
        ];
    }
}
