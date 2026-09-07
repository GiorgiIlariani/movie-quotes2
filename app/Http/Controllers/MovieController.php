<?php

namespace App\Http\Controllers;

use App\Actions\CreateMovie;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Resources\MovieResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            ->limit(10)
            ->get();
        // to do: infinite scroll

        return Inertia::render('Movies/Movies', [
            'movies' => MovieResource::collection($movies),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMovieRequest $request, CreateMovie $action): RedirectResponse
    {
        $action->handle($request->movieDetails(), $request->user());

        return to_route('movies.index');
    }
}
