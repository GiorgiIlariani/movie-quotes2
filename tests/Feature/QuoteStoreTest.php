<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;

test('storing a quote from the news feed stays on the news feed', function () {
    $user = User::factory()->create();
    $movie = Movie::query()->create([
        'title' => ['en' => 'Inception', 'ka' => 'დასაწყისი'],
        'release_year' => 2010,
        'director' => ['en' => 'Nolan', 'ka' => 'ნოლანი'],
        'description' => ['en' => 'Dreams', 'ka' => 'ოცნებები'],
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->from(route('news_feed.index'))
        ->post(route('quotes.store'), [
            'quote_en' => 'We need to go deeper',
            'quote_ka' => 'უფრო ღრმად',
            'movie_id' => $movie->id,
        ])
        ->assertRedirect(route('news_feed.index'));

    $quote = Quote::query()->where('user_id', $user->id)->first();

    $this->assertModelExists($quote);
    expect($quote->movie_id)->toBe($movie->id)
        ->and($quote->getTranslation('quote', 'en'))->toBe('We need to go deeper');
});

test('guests cannot store quotes', function () {
    $this->post(route('quotes.store'))->assertRedirect(route('login'));
});
