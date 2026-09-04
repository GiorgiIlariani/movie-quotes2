<?php

namespace App\Actions;

use App\Http\Requests\StoreMovieRequest;
use App\Models\Movie;
use App\Models\User;

/**
 * @phpstan-import-type MovieDetails from StoreMovieRequest
 */
class CreateMovie
{
    /**
     * @param  MovieDetails  $movieDetails
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
