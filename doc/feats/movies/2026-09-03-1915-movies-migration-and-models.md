# Movies — Movies & Categories Migrations/Models

**Date:** 2026-09-03 19:15
**Feature:** `movies`
**Flags:** `-doc -feat:movies`
**Prompt:** `make a migration for movies and movie categories, with their corresponding eloquent models and eloquent relations. use the schema in the screenshot as a guide. dont touch controllers or routes`

## Summary

Added database migrations for `movies`, `categories`, and the `category_movie` pivot table based on the provided schema. Implemented corresponding Eloquent models with the required relationships and JSON casts for localized fields.

## What was made

- New migrations:
  - `database/migrations/2026_09_03_151929_create_movies_table.php`
  - `database/migrations/2026_09_03_151930_create_categories_table.php`
  - `database/migrations/2026_09_03_151931_create_category_movie_table.php`
- New Eloquent models:
  - `app/Models/Movie.php`
  - `app/Models/Category.php`

## How it was made

- Mirrored the screenshot schema:
  - `movies` includes `title`, `director`, and `description` as JSON columns, plus `release_year`, `cover`, and `user_id`.
  - `categories` includes `category_title`.
  - `category_movie` stores the many-to-many linkage with timestamps and a unique `(movie_id, category_id)` pair.
- Added Eloquent relations:
  - `Movie::user()` (`belongsTo`)
  - `Movie::categories()` (`belongsToMany` via `category_movie` with timestamps)
  - `Category::movies()` (`belongsToMany` via `category_movie` with timestamps)

## Follow-ups

- Run `php artisan migrate` to apply the new schema, then verify request validation/controller behavior matches the JSON column expectations for `title`, `director`, and `description`.
