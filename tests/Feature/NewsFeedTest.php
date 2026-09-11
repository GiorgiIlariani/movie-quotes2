<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('the news feed paginates quotes ten at a time', function () {
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
        ->get(route('news_feed.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('NewsFeed/NewsFeed')
            ->has('quotes.data', 10));
});
