# Authentication — Google OAuth user columns

**Date:** 2026-08-27 14:40
**Feature:** `authentication`
**Flags:** `-doc` `-feat:authentication`
**Prompt:** make a new migration for users table that adds neccessary fields for google oauth whicih are google_id, google_token, google_refresh_token and make password nullable

## Summary

`users` now has nullable Google OAuth columns and a nullable `password` so Socialite-only accounts can be stored. The `User` model fillable/hidden/casts match those columns.

## What was made

- `database/migrations/2026_08_27_104019_add_google_oauth_fields_to_users_table.php` — created
- `app/Models/User.php` — fillable, hidden, PHPDoc, encrypted token casts

## How it was made

- New migration (did not edit the original users migration)
- `google_id` nullable unique string; tokens nullable `text` (OAuth tokens and encrypted values need more than 255)
- `password` made nullable via `change()`
- Tokens hidden and `encrypted` so they are not serialized or stored in plaintext
- `php artisan migrate` could not run here (MySQL connection refused); run it locally

## Follow-ups

- Run `php artisan migrate`
