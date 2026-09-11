<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
            ->get();

        return Inertia::render('NewsFeed/NewsFeed', [
            'quotes' => QuoteResource::collection($quotes),
        ]);
    }
}
