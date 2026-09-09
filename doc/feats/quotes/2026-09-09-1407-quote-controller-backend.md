# Quotes — Quote Controller Backend

**Date:** 2026-09-09 14:07
**Feature:** `quotes`
**Flags:** `-doc -feat:quotes`
**Prompt:** i want to work on quotes now. use the screenshot for the structure ref. make a route controller in the auth route group. make a request for the quote ill specify riles later. make a quote controller with show, store, update and destroy requests. make a new actions file and put the creating/updating logic in there and also use same request for update/store. make a new policy and protect destroy/update routes with it

## Summary

Added a quotes backend that mirrors movies: an auth-grouped controller, one shared form request, a single `CreateQuote` action for store and update, and a `QuotePolicy` that gates only update and destroy. The `quotes` table matches the screenshot (`quote` JSON, `movie_id`, `user_id`).

## What was made

- Auth-only `quotes.store`, `quotes.show`, `quotes.update`, and `quotes.destroy` routes
- `QuotePolicy::workWith` on update and destroy
- Store and update share `StoreQuoteRequest` and `CreateQuote` (`updateOrCreate`)
- Files created / updated:
  - `app/Actions/CreateQuote.php`
  - `app/Http/Controllers/QuoteController.php`
  - `app/Http/Requests/StoreQuoteRequest.php`
  - `app/Http/Resources/QuoteResource.php`
  - `app/Policies/QuotePolicy.php`
  - `app/Models/Quote.php`
  - `app/Models/Movie.php`
  - `app/Models/User.php`
  - `database/migrations/2026_09_09_100620_create_quotes_table.php`
  - `database/factories/QuoteFactory.php`
  - `database/factories/MovieFactory.php`
  - `resources/js/pages/Quote/Quote.tsx`
  - `resources/js/types/quote.ts`
  - `resources/js/types/index.ts`
  - `routes/web.php`
  - `tests/Feature/QuoteControllerTest.php`
  - `.ai/rules/actions.md`
  - `.ai/rules/routes.md`

## How it was made

- Table and model follow the screenshot and Spatie translatable JSON (`quote.en` / `quote.ka`), with indexed FKs that cascade on delete
- `CreateQuote` maps flat `quote_en`, `quote_ka`, and `movie_id` the same way `CreateMovie` maps bilingual movie fields
- `StoreQuoteRequest::rules()` is empty on purpose; `quoteDetails()` is ready for the later rule set
- Policy uses the existing `workWith` name and owner check (`user_id`)
- Feature tests cover guest redirects, show, owner destroy, and forbidden update/destroy for non-owners

## Follow-ups

- Add `StoreQuoteRequest` validation rules
- Wire a quote form on the frontend
