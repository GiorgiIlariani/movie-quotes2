<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('the movie show page paginates quotes ten at a time', function () {
    $user = User::factory()->create();
    $movie = Movie::query()->create([
        'title' => ['en' => 'Inception', 'ka' => 'დასაწყისი'],
        'release_year' => 2010,
        'director' => ['en' => 'Nolan', 'ka' => 'ნოლანი'],
        'description' => ['en' => 'Dreams', 'ka' => 'ოცნებები'],
        'user_id' => $user->id,
    ]);

    foreach (range(1, 11) as $i) {
        Quote::query()->create([
            'quote' => ['en' => "Quote {$i}", 'ka' => "ციტატა {$i}"],
            'movie_id' => $movie->id,
            'user_id' => $user->id,
        ]);
    }

    $this->actingAs($user)
        ->get(route('movies.show', $movie))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Movie/Movie')
            ->where('movie.data.id', $movie->id)
            ->has('quotes.data', 10)
            ->has('quotes.data.0.user')
            ->has('quotes.data.0.likes_count')
            ->has('quotes.data.0.comments_count')
            ->has('quotes.data.0.liked')
            ->missing('movie.data.quotes'));
});
