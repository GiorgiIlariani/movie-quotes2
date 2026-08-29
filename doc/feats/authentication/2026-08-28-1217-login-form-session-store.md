# Authentication — Login form session store

**Date:** 2026-08-28 12:17
**Feature:** `authentication`
**Flags:** `-doc` `-feat:authentication`
**Prompt:** hook up the login form with session store controller, remove react hook form and zod validation and replace them with inertias Form component

## Summary

The login modal now submits through Inertia's `<Form>` to `SessionController::store`. Client-side react-hook-form and Zod were removed from this form so Laravel validation errors render in the same fields. A successful login regenerates the session, redirects home, and closes the modal so the navbar can show Log Out.

## What was made

- Login form posts `email`, `password`, and optional `remember_me` to `POST /login`
- Invalid credentials and unverified accounts stay on the modal with an email-field error
- `resources/js/components/AuthLayout/Forms/LoginForm.tsx` — updated
- `resources/js/schemas/auth-forms.ts` — login Zod schema removed
- `resources/js/components/AuthLayout/shared/AuthTextField.tsx` — updated
- `resources/js/components/AuthLayout/shared/AuthPasswordField.tsx` — updated
- `app/Http/Controllers/SessionController.php` — updated
- `app/Http/Requests/SessionStoreRequest.php` — updated
- `app/Providers/AppServiceProvider.php` — updated
- `routes/web.php` — updated
- `tests/Feature/SessionStoreTest.php` — created

## How it was made

- Matched register: Inertia `<Form action={store()}>` with Wayfinder `SessionController.store`
- Aligned `SessionStoreRequest` with the controller (`email` / `password` / `remember_me`) instead of the leftover `user` field
- Replaced JSON 401/403 success/error payloads with `ValidationException` and `to_route('home')` so Inertia can populate `errors` and refresh shared `auth.user`
- Closed the auth modal on `onSuccess` because `AuthModalProvider` lives in `withApp` and would otherwise stay open
- Spread remaining input props on the shared auth fields so `type` and `placeholder` actually reach the DOM
- Throttled login at 5/minute per IP + email, same pattern as verification-notification
- `php artisan test --compact tests/Feature` — 5 passed

## Follow-ups

- Forgot-password still uses react-hook-form and Zod
- Register still returns JSON while using Inertia `<Form>`
- Click through Log In in the browser after a refresh if the UI does not update
