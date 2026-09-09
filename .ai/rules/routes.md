---
paths:
  - routes/web.php
---

# Routes

## Email verification skips notice and auth middleware
Use a single EmailVerificationController. There is no verification.notice route. verification.verify is signed only — resolve the user from the signed URL id/hash, not $request->user(). verification.send is throttled only and accepts an email so guests can resend without revealing whether the account exists. Do not attach auth or verified middleware to these routes.

## Quote routes in the auth group
Register quote show, store, update, and destroy in the auth group. Protect update and destroy with can('workWith', 'quote'). Do not attach the policy to show or store.
