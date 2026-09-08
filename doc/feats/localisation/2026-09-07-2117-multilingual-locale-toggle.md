# Localisation — Multilingual Locale Toggle

**Date:** 2026-09-07 21:17
**Feature:** `localisation`
**Flags:** `-doc -feat:localisation`
**Prompt:** i want to make website multilingual. make an endpoint /locale that changes locale from ge to ka and viceverca(using controllers without custom requests). make a middlewarre that sets the locale to every request. publish locale files (en/ka). add locale and its files to handleinertiarequest middleware as shared props. modify the movieresource so it returns the data according to current locale instead of returngin both versions by using App-locale.

## Summary

The site now switches between English (`en`) and Georgian (`ka`). `POST /locale` toggles the session locale, `SetLocale` applies it on every web request, published `lang/en` and `lang/ka` files are shared with Inertia, and `MovieResource` returns a single locale-specific title, director, and description.

## What was made

- `POST /locale` accepts `UpdateLocaleRequest` (`locale` must be `en` or `ka`), stores it on the session, and redirects back
- Locale is applied on every web request and shared with the frontend as `locale` plus the current language files
- Movie list data now exposes `title`, `director`, and `description` for the active locale
- Files created: `app/Http/Controllers/LocaleController.php`, `app/Http/Requests/UpdateLocaleRequest.php`, `app/Enums/Locale.php`, `app/Http/Middleware/SetLocale.php`, `lang/en/*`, `lang/ka/*`, `doc/feats/localisation/2026-09-07-2117-multilingual-locale-toggle.md`
- Files updated: `bootstrap/app.php`, `routes/web.php`, `config/app.php`, `app/Http/Middleware/HandleInertiaRequests.php`, `app/Http/Resources/MovieResource.php`, `resources/js/types/movie.ts`, `resources/js/types/global.d.ts`, `resources/js/pages/Movies/components/MovieCard.tsx`, `resources/js/components/MainLayout/Components/Header.tsx`

## How it was made

- Published Laravel language files with `php artisan lang:publish`, then added a matching `lang/ka` set (`auth`, `pagination`, `passwords`, `validation`)
- `LocaleController@update` type-hints `UpdateLocaleRequest` and stores `$request->locale()` on the session — allowed values are `en` and `ka`
- `SetLocale` is appended to the web group before `HandleInertiaRequests` so shared props see the resolved locale
- `HandleInertiaRequests` shares `locale` and loads every PHP file in `lang/{locale}` as `translations`
- `MovieResource` reads `App::currentLocale()` and returns one translation per field via Spatie `getTranslation()`
- Header language select posts `en` or `ka` to `/locale` through Wayfinder; create-movie form fields stay bilingual (`title_en` / `title_ka`)
- Tests cover the toggle, invalid session fallback, shared Inertia props, and locale-specific movie payloads

## Follow-ups

- Translate remaining hardcoded UI strings using the shared `translations` prop
- Add the language toggle to the home navbar and mobile header
- Finish Georgian `lang/ka/validation.php` (most messages still match English)
