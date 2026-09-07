<?php

use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home/Home')->name('home');

Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware('signed')
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationController::class, 'send'])
    ->middleware('throttle:verification-notification')
    ->name('verification.send');

Route::middleware('guest')->group(function () {
    Route::post('/login', [SessionController::class, 'store'])
        ->middleware('throttle:login')
        ->name('login');

    Route::post('/register', [UserController::class, 'store'])->middleware('precognitive')->name('register');

    Route::controller(GoogleController::class)->group(function () {
        Route::get('/auth/google/redirect', 'redirect')->name('google.redirect');
        Route::get('/auth/google/callback', 'callback')->name('google.callback');
    });
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [SessionController::class, 'destroy'])->name('logout');

    Route::controller(MovieController::class)->group(function () {
        Route::get('/movies', 'index')->name('movies.index');

        Route::post('/movies', 'store')->name('movies.store');
    });

});
