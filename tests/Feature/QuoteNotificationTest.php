<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use App\Notifications\QuoteCommented;
use App\Notifications\QuoteLiked;
use Inertia\Testing\AssertableInertia as Assert;

function createQuoteOwnedBy(User $owner): Quote
{
    $movie = Movie::query()->create([
        'title' => ['en' => 'Inception', 'ka' => 'დასაწყისი'],
        'release_year' => 2010,
        'director' => ['en' => 'Nolan', 'ka' => 'ნოლანი'],
        'description' => ['en' => 'Dreams', 'ka' => 'ოცნებები'],
        'user_id' => $owner->id,
    ]);

    return Quote::query()->create([
        'quote' => ['en' => 'We need to go deeper', 'ka' => 'უფრო ღრმად'],
        'movie_id' => $movie->id,
        'user_id' => $owner->id,
    ]);
}

test('liking someone elses quote notifies the owner with the quote id', function () {
    $owner = User::factory()->create();
    $liker = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($liker)
        ->from(route('news_feed.index'))
        ->post(route('quotes.likes.store', $quote))
        ->assertRedirect(route('news_feed.index'));

    expect($owner->fresh()->notifications)->toHaveCount(1);

    $notification = $owner->notifications->first();

    expect($notification->type)->toBe(QuoteLiked::class)
        ->and($notification->data['kind'])->toBe('like')
        ->and($notification->data['quote_id'])->toBe($quote->id)
        ->and($notification->data['actor_name'])->toBe($liker->name);
});

test('a user is not notified when they like their own quote', function () {
    $owner = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($owner)->post(route('quotes.likes.store', $quote));

    expect($owner->fresh()->notifications)->toHaveCount(0);
});

test('unliking a quote does not notify the owner', function () {
    $owner = User::factory()->create();
    $liker = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($liker)->post(route('quotes.likes.store', $quote));
    $this->actingAs($liker)->post(route('quotes.likes.store', $quote));

    expect($owner->fresh()->notifications)->toHaveCount(1);
});

test('commenting on someone elses quote notifies the owner with the quote id', function () {
    $owner = User::factory()->create();
    $commenter = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($commenter)
        ->from(route('news_feed.index'))
        ->post(route('quotes.comments.store', $quote), [
            'comment' => 'Great line.',
        ])
        ->assertRedirect(route('news_feed.index'));

    expect($owner->fresh()->notifications)->toHaveCount(1);

    $notification = $owner->notifications->first();

    expect($notification->type)->toBe(QuoteCommented::class)
        ->and($notification->data['kind'])->toBe('comment')
        ->and($notification->data['quote_id'])->toBe($quote->id)
        ->and($notification->data['actor_name'])->toBe($commenter->name);
});

test('the owner can open the quote from a notification payload', function () {
    $owner = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($owner)
        ->get(route('quotes.show', $quote))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Quotes/Show')
            ->where('quote.data.id', $quote->id)
            ->missing('notifications'));
});

test('the owner can fetch notifications on demand', function () {
    $owner = User::factory()->create();
    $liker = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($liker)->post(route('quotes.likes.store', $quote));

    $this->actingAs($owner)
        ->getJson(route('notifications.index'))
        ->assertSuccessful()
        ->assertJsonPath('unread_count', 1)
        ->assertJsonPath('data.0.quote_id', $quote->id)
        ->assertJsonPath('data.0.kind', 'like');
});

test('inertia pages do not share notifications', function () {
    $owner = User::factory()->create();
    $liker = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($liker)->post(route('quotes.likes.store', $quote));

    $this->actingAs($owner)
        ->get(route('news_feed.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page->missing('notifications'));
});

test('the owner can mark notifications as read', function () {
    $owner = User::factory()->create();
    $liker = User::factory()->create();
    $quote = createQuoteOwnedBy($owner);

    $this->actingAs($liker)->post(route('quotes.likes.store', $quote));

    $this->actingAs($owner)
        ->from(route('news_feed.index'))
        ->post(route('notifications.read'))
        ->assertRedirect(route('news_feed.index'));

    expect($owner->fresh()->unreadNotifications)->toHaveCount(0)
        ->and($owner->notifications)->toHaveCount(1);
});

test('guests cannot view a quote', function () {
    $quote = createQuoteOwnedBy(User::factory()->create());

    $this->get(route('quotes.show', $quote))->assertRedirect(route('login'));
});

test('guests cannot fetch notifications', function () {
    $this->getJson(route('notifications.index'))->assertUnauthorized();
});
