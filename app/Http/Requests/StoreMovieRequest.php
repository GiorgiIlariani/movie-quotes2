<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

/**
 * @phpstan-type MovieDetails array{
 *     title_en: string,
 *     title_ka: string,
 *     director_en: string,
 *     director_ka: string,
 *     description_en: string,
 *     description_ka: string,
 *     release_year: int,
 *     cover: UploadedFile
 * }
 */
class StoreMovieRequest extends FormRequest
{
    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'title_en' => ['required', 'string', 'max:255'],
            'title_ka' => ['required', 'string', 'max:255'],
            'director_en' => ['required', 'string', 'max:255'],
            'director_ka' => ['required', 'string', 'max:255'],
            'description_en' => ['required', 'string'],
            'description_ka' => ['required', 'string'],
            'release_year' => ['required', 'integer', 'digits:4', 'min:1888', 'max:'.now()->year],
            'cover' => ['required', 'image', 'max:5120'],
        ];
    }

    /**
     * @return MovieDetails
     */
    public function movieDetails(): array
    {
        /** @var MovieDetails $validated */
        $validated = $this->validated();

        return $validated;
    }
}
