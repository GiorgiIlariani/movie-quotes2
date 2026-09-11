---
paths:
  - routes/web.php
---

# Routes

## Email verification skips notice and auth middleware
Use a single EmailVerificationController. There is no verification.notice route. verification.verify is signed only — resolve the user from the signed URL id/hash, not $request->user(). verification.send is throttled only and accepts an email so guests can resend without revealing whether the account exists. Do not attach auth or verified middleware to these routes.

## Quote routes in the auth group
Register quote show, store, update, and destroy in the auth group. Protect update and destroy with can('workWith', 'quote'). Do not attach the policy to show or store.

## Movie options is a JSON route
Register GET /movies/options as movies.options before /movies/{movie}. It returns MovieOptionResource JSON for the quote selector. Keep it in the auth group. Do not attach the movie policy.

## News feed is auth-only
Register GET /news-feed as news_feed.index inside the auth group. NewsFeedController@index returns all quotes. Do not put this route on the guest home page.

## Quote likes and comments are auth-only
POST /quotes/{quote}/likes is quotes.likes.store (toggle, no policy). POST /quotes/{quote}/comments is quotes.comments.store (no policy). DELETE /comments/{comment} is comments.destroy and uses can('delete', 'comment') so only the comment author can delete.

## Notifications are fetched on demand
GET /notifications is notifications.index (JSON list + unread_count). POST /notifications/read is notifications.read. Keep both in the auth group. Do not share notifications on Inertia middleware.
