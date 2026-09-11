<?php

namespace App\Http\Controllers;

use App\Events\TestPing;
use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsFeedController extends Controller
{
    /**
     * Display all quotes.
     */
    public function index(Request $request): Response
    {
        $quotes = Quote::query()
            ->with([
                'media',
                'movie',
                'user',
                'comments' => fn (HasMany $query) => $query->with('user')->oldest(),
            ])
            ->withCount(['likes', 'comments'])
            ->withExists([
                'likes as liked' => fn (Builder $query) => $query->where('user_id', $request->user()->id),
            ])
            ->latest()
            ->paginate(10);

        return Inertia::render('NewsFeed/NewsFeed', [
            'quotes' => Inertia::scroll(QuoteResource::collection($quotes)),
            'testPing' => session('test_ping'),
        ]);
    }

    public function ping(): RedirectResponse
    {
        $ping = new TestPing(
            fake()->randomElement(['like', 'comment', 'follow']),
            fake()->sentence(),
            fake()->numberBetween(1, 999),
        );

        event($ping);

        return back()->with('test_ping', [
            'kind' => $ping->kind,
            'message' => $ping->message,
            'number' => $ping->number,
        ]);
    }
}
