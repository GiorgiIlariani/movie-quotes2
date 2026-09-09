# Quotes — Quote Controller Backend

**Date:** 2026-09-09 14:07
**Feature:** `quotes`
**Flags:** `-doc -feat:quotes`
**Prompt:** i want to work on quotes now. use the screenshot for the structure ref. make a route controller in the auth route group. make a request for the quote ill specify riles later. make a quote controller with show, store, update and destroy requests. make a new actions file and put the creating/updating logic in there and also use same request for update/store. make a new policy and protect destroy/update routes with it

## Summary

Quotes backend mirrors movies: auth-grouped `QuoteController`, one `StoreQuoteRequest` for store and update, `CreateQuote` (`updateOrCreate`), and `QuotePolicy::workWith` on update and destroy. The `quotes` table is `quote` JSON, `movie_id`, and `user_id`. Cover is optional media (`quote_cover`).

## Current structure

- Routes (auth group): `POST /quotes`, `GET /quotes/{quote}`, `PUT /quotes/{quote}`, `DELETE /quotes/{quote}`
- Update and destroy use `can('workWith', 'quote')`. Show and store do not.
- `StoreQuoteRequest` rules: required `quote_en`, `quote_ka`, `movie_id`; nullable `cover` image
- `CreateQuote` maps `quote_en` / `quote_ka` into translatable JSON, sets `movie_id`, and attaches cover to `quote_cover` only when a file is present
- `QuoteController::show` returns `QuoteResource` (not an Inertia page)
- `Quote` uses Spatie translations on `quote` and Spatie media (`quote_cover`, single file)
- `QuoteResource` exposes `id`, `quote` translations, `cover` URL or `null`, `movie_id`, `user_id`
- Frontend type: `resources/js/types/quote.ts`

## What was made

- `app/Actions/CreateQuote.php`
- `app/Http/Controllers/QuoteController.php`
- `app/Http/Requests/StoreQuoteRequest.php`
- `app/Http/Resources/QuoteResource.php`
- `app/Policies/QuotePolicy.php`
- `app/Models/Quote.php`
- `database/migrations/2026_09_09_100620_create_quotes_table.php`
- `resources/js/types/quote.ts`
- `routes/web.php` (quote routes in the auth group)

## How it was made

- Table and model follow the screenshot: JSON `quote`, FKs to movies and users with cascade delete
- Flat request fields match the movie bilingual pattern (`quote_en` / `quote_ka`)
- Policy `workWith` is owner-only (`user_id`)

## Follow-ups

- Wire `QuoteModal` form fields to this request
- Mount `QuoteModal` on a page
