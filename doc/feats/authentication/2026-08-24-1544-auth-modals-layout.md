# Authentication — Auth modals layout

**Date:** 2026-08-24 15:44
**Feature:** `authentication`
**Flags:** `-doc` `-feat:authentication`
**Prompt:** build login/up/password reset modals layout according to the screenshot. using react context to control the modal state. react hook form for the form and zod for the validation.

## Summary

The home page now opens register, login, and forgot-password dialogs that match the screenshot: dark surface, light inputs, red primary actions, and Google buttons. A React context owns which modal is open, and each form uses react-hook-form with Zod so clientside rules run before any later backend wiring.

## What was made

- Register, login, and forgot-password layouts with switch links between them
- `resources/js/contexts/auth-modal-context.tsx` — created
- `resources/js/components/AuthLayout/` — dialog host, forms, and shared fields
- `resources/js/schemas/auth-forms.ts` — Zod schemas
- `resources/js/app.tsx` — wrapped the Inertia app with the auth modal provider
- `resources/js/components/ui/dialog.tsx` — optional overlay class
- `package.json`, `package-lock.json` — `zod` and `@hookform/resolvers` added

## How it was made

- `AuthModalProvider` + `useAuthModal()` store `'login' | 'register' | 'forgotPassword' | null` and are mounted via Inertia `withApp`
- One shared `Dialog` swaps form bodies so switching login/register/forgot does not close the overlay
- `react-hook-form` + `zodResolver`: name min 3 and lowercase, password 8–15 and lowercase, email format, confirm password match
- Theme tokens from `app.css` (`brand`, `surface`, `info`, `muted`) for the screenshot colors
- `tsc --noEmit` and `eslint` passed; home and Vite modules return 200

## Follow-ups

- Wire the forms and Google buttons to real auth endpoints
- Click through Sign up / Log in / forgot-password in the browser after a refresh if the UI does not update
