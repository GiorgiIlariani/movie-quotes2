# Authentication — Email verification

**Date:** 2026-08-27 13:15
**Feature:** `authentication`
**Flags:** `-doc` `-feat:authentication`
**Prompt:** i want to build a simple email verification using laravels email verification. - skip email verification notifice route. - use single EmailVerificationController - dont protect routes with Auth middleware

## Summary

Registration sends Laravel’s default verification email. The signed link marks the address verified and returns home. Verify and resend live on one `EmailVerificationController`. There is no notice page, and neither route uses `auth`.

## What was made

- `User` implements `MustVerifyEmail` so `Registered` sends `VerifyEmail`
- `GET /email/verify/{id}/{hash}` (`verification.verify`) — signed, no `auth`
- `POST /email/verification-notification` (`verification.send`) — throttled, no `auth`, body `{ email }`
- `app/Http/Controllers/EmailVerificationController.php` — created (`verify`, `send`)
- `app/Http/Requests/SendEmailVerificationNotificationRequest.php` — created
- `app/Models/User.php` — implements `MustVerifyEmail`
- `app/Providers/AppServiceProvider.php` — `verification-notification` rate limiter
- `routes/web.php` — verify and resend routes
- `.ai/rules/routes.md` — recorded the single-controller / no-notice / no-auth constraint

## How it was made

- Standard Laravel pieces: `MustVerifyEmail`, `Registered` → `SendEmailVerificationNotification`, named `verification.verify` / `verification.send`, `Verified` event, `signed` + throttle
- Skipped `verification.notice` and did not attach `auth` or `verified`
- `verify` loads the user from the signed URL `id`/`hash` instead of `$request->user()`
- Resend looks up by email and stays silent for unknown or already-verified addresses
- Pint on dirty PHP; no tests written

## Follow-ups

- Add a resend control in the auth UI if guests need it after leaving the inbox
