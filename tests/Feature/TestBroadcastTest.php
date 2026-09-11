<?php

use App\Events\TestPing;
use App\Models\User;
use Illuminate\Support\Facades\Event;

test('guests cannot fire the test ping', function () {
    Event::fake();

    $this->post(route('news_feed.ping'))->assertRedirect(route('login'));

    Event::assertNotDispatched(TestPing::class);
});

test('an authenticated user can dispatch a test ping', function () {
    $user = User::factory()->create();

    Event::fake();

    $this->actingAs($user)
        ->from(route('news_feed.index'))
        ->post(route('news_feed.ping'))
        ->assertRedirect(route('news_feed.index'))
        ->assertSessionHas('test_ping');

    Event::assertDispatched(TestPing::class);
});
