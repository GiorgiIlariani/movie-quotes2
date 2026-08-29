<?php

namespace App\Http\Controllers;

use App\Http\Requests\SessionStoreRequest;
use Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(SessionStoreRequest $request): RedirectResponse
    {
        if (! Auth::attempt($request->credentials(), $request->boolean('remember_me'))) {
            throw ValidationException::withMessages([
                'error' => 'Invalid user or password.',
            ]);
        }

        if (! $request->user()->hasVerifiedEmail()) {
            Auth::logout();

            throw ValidationException::withMessages([
                'error' => 'Your email address is not verified.',
            ]);
        }

        $request->session()->regenerate();

        return to_route('home');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('home');
    }
}
