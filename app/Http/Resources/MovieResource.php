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
            'title_en' => $this->getTranslation('title', 'en'),
            'title_ka' => $this->getTranslation('title', 'ka'),
            'director_en' => $this->getTranslation('director', 'en'),
            'director_ka' => $this->getTranslation('director', 'ka'),
            'description_en' => $this->getTranslation('description', 'en'),
            'description_ka' => $this->getTranslation('description', 'ka'),
            'cover' => $this->getFirstMediaUrl('movie_cover') ?: null,
            'release_year' => $this->release_year,
        ];
    }
}
