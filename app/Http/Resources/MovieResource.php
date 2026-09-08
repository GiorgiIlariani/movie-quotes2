<?php

namespace App\Http\Resources;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;

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
        $locale = App::currentLocale();

        return [
            'id' => $this->id,
            'title' => $this->getTranslation('title', $locale),
            'director' => $this->getTranslation('director', $locale),
            'description' => $this->getTranslation('description', $locale),
            'cover' => $this->getFirstMediaUrl('movie_cover'),
            'release_year' => $this->release_year,
        ];
    }
}
