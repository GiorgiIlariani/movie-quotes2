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
                'error' => __('auth.failed'),
            ]);
        }

        if (! $request->user()->hasVerifiedEmail()) {
            Auth::logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw ValidationException::withMessages([
                // Temporary message before adding the custom lang files
                'error' => __('Your email address is not verified.'),
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
