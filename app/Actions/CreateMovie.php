<?php

namespace App\Actions;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class CreateMovie
{
    /**
     * @param  array{
     *     title_en: string,
     *     title_ka: string,
     *     director_en: string,
     *     director_ka: string,
     *     description_en: string,
     *     description_ka: string,
     *     release_year: int,
     *     cover: UploadedFile,
     *     categories?: list<int>
     * }  $movieDetails
     */
    public function handle(array $movieDetails, User $user): Movie
    {
        /** @var Movie $movie */
        $movie = $user->movies()->create([
            'title' => [
                'en' => $movieDetails['title_en'],
                'ka' => $movieDetails['title_ka'],
            ],
            'director' => [
                'en' => $movieDetails['director_en'],
                'ka' => $movieDetails['director_ka'],
            ],
            'description' => [
                'en' => $movieDetails['description_en'],
                'ka' => $movieDetails['description_ka'],
            ],
            'release_year' => $movieDetails['release_year'],
        ]);

        $movie->addMedia($movieDetails['cover'])->toMediaCollection('movie_cover');

        return $movie;
    }
}
