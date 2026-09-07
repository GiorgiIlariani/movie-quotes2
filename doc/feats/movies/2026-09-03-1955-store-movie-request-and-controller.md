# Movies — StoreMovieRequest, Store & Update Controller Methods

**Date:** 2026-09-03 19:55
**Feature:** `movies`
**Flags:** `-doc -feat:movies`
**Prompt:** make a StoreMovieRequest and add validation rules, skip authorization step. also make an update controller that creates new movie with authentication user relation. use spatie translatable structure to add _en and _ka variants for title, description and author

## Summary

Added `StoreMovieRequest` with full validation rules for bilingual movie fields. Implemented `store` and `update` in `MovieController` using the authenticated user relation and Spatie `HasTranslations` to persist `_en`/`_ka` variants as JSON. Also wired `User::movies()` and updated `Movie` to use the correct `$translatable` array.

## What was made

- `app/Http/Requests/StoreMovieRequest.php` — created
- `app/Http/Controllers/MovieController.php` — `store`, `update`, `show`, `destroy` implemented
- `app/Models/Movie.php` — replaced attribute-based translatable with `$translatable` array (Spatie v6)
- `app/Models/User.php` — added `movies(): HasMany` relation

## How it was made

- Form sends flat `title_en`, `title_ka`, `director_en`, `director_ka`, `description_en`, `description_ka` fields
- Request validates all fields including `release_year` range, optional `cover` image, and optional `categories` array of existing IDs
- Controller maps flat fields into `['en' => ..., 'ka' => ...]` arrays before passing to Eloquent, matching Spatie's storage format
- `store` uses `$request->user()->movies()->create()` to automatically set `user_id`
- `update` keeps the cover unchanged unless a new file is uploaded
- Categories synced via `sync()` on the `BelongsToMany` relation

## Follow-ups

- Add route registration for `store`, `update`, `destroy` in `routes/web.php`
- Wire the `MovieForm` frontend to POST to `MovieController::store` via Wayfinder
