<?php

use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\NewsFeedController;
use App\Http\Controllers\QuoteCommentController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\QuoteLikeController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home/Home')->name('home');

Route::post('/locale', [LocaleController::class, 'update'])->name('locale.update');

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

    Route::get('/news-feed', [NewsFeedController::class, 'index'])->name('news_feed.index');

    Route::controller(MovieController::class)->group(function () {
        Route::get('/movies', 'index')->name('movies.index');
        Route::post('/movies', 'store')->name('movies.store');
        Route::get('/movies/options', 'options')->name('movies.options');
        Route::get('/movies/{movie}', 'show')->name('movies.show')->can('workWith', 'movie');
        Route::put('/movies/{movie}', 'update')->name('movies.update')->can('workWith', 'movie');
        Route::delete('/movies/{movie}', 'destroy')->name('movies.destroy')->can('workWith', 'movie');
    });

    Route::controller(QuoteController::class)->group(function () {
        Route::post('/quotes', 'store')->name('quotes.store');
        Route::get('/quotes/{quote}', 'show')->name('quotes.show');
        Route::put('/quotes/{quote}', 'update')->name('quotes.update')->can('workWith', 'quote');
        Route::delete('/quotes/{quote}', 'destroy')->name('quotes.destroy')->can('workWith', 'quote');
    });

    Route::post('/quotes/{quote}/likes', [QuoteLikeController::class, 'store'])
        ->name('quotes.likes.store');
    Route::post('/quotes/{quote}/comments', [QuoteCommentController::class, 'store'])
        ->name('quotes.comments.store');
    Route::delete('/comments/{comment}', [QuoteCommentController::class, 'destroy'])
        ->name('comments.destroy')
        ->can('delete', 'comment');

});
