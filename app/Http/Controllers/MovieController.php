<?php

namespace App\Http\Controllers;

use App\Actions\CreateMovie;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Resources\MovieOptionResource;
use App\Http\Resources\MovieResource;
use App\Http\Resources\QuoteResource;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $movies = $request->user()
            ->movies()
            ->with(['categories', 'media'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Movies/Movies', [
            'movies' => Inertia::scroll(MovieResource::collection($movies)),
        ]);
    }

    /**
     * Return the authenticated user's movies for the quote selector.
     */
    public function options(Request $request): AnonymousResourceCollection
    {
        $movies = $request->user()
            ->movies()
            ->latest()
            ->get(['id', 'title', 'release_year']);

        return MovieOptionResource::collection($movies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMovieRequest $request, CreateMovie $action): RedirectResponse
    {
        $action->handle($request->movieDetails(), $request->user());

        return to_route('movies.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Movie $movie): Response
    {
        $quotes = $movie->quotes()
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

        return Inertia::render('Movie/Movie', [
            'movie' => new MovieResource($movie),
            'quotes' => Inertia::scroll(QuoteResource::collection($quotes)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreMovieRequest $request, Movie $movie, CreateMovie $action): RedirectResponse
    {
        $action->handle($request->movieDetails(), $request->user(), $movie);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie): RedirectResponse
    {
        $movie->delete();

        return to_route('movies.index');
    }
}
