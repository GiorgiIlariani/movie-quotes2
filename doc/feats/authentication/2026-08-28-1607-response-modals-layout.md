# Authentication — Response modals layout

**Date:** 2026-08-28 16:07
**Feature:** `authentication`
**Flags:** `-doc` `-feat:authentication`
**Prompt:** add these modals into ResponseModals folder, use auth-modal-context to controll their state. dont wire up them with requets

## Summary

Four post-auth response dialogs now live under AuthLayout and open through the same auth modal context as login and register. Buttons do not call APIs. Success “Log in” only switches to the login modal; “Skip, I'll confirm later” only closes the dialog.

## What was made

- Password changed, link expired, check-your-email, and thank-you layouts matching the screenshots
- `resources/js/contexts/auth-modal-context.tsx` — updated (`passwordChanged`, `linkExpired`, `checkEmail`, `thankYou`)
- `resources/js/components/AuthLayout/ResponseModals/ResponseModalLayout.tsx` — created
- `resources/js/components/AuthLayout/ResponseModals/PasswordChangedModal.tsx` — created
- `resources/js/components/AuthLayout/ResponseModals/LinkExpiredModal.tsx` — created
- `resources/js/components/AuthLayout/ResponseModals/CheckEmailModal.tsx` — created
- `resources/js/components/AuthLayout/ResponseModals/ThankYouModal.tsx` — created
- `resources/js/components/AuthLayout/AuthModals.tsx` — updated
- `resources/js/images/icons/Success.png` — password-changed icon
- `resources/js/images/icons/Expired.png` — link-expired icon
- `resources/js/images/icons/EmailSent.png` — check-email and thank-you icon

## How it was made

- One shared `Dialog` still swaps bodies so overlay stays put when switching modals
- Shared layout: icon image, title, description, red action, optional secondary text button
- Icons are PNGs from `resources/js/images/icons/`: `Success.png` on password changed, `Expired.png` on link expired, `EmailSent.png` on check email and thank you
- `tsc --noEmit` passed
- Not opened from register/forgot-password submits yet

## Follow-ups

- Open after real register, forgot-password, reset, and expired-link flows
- Wire “Go to my email” and “Request another link” when those endpoints exist
- Preview with `open('passwordChanged' | 'linkExpired' | 'checkEmail' | 'thankYou')`
