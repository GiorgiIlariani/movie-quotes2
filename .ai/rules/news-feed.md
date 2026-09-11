---
paths:
  - 'resources/js/pages/NewsFeed/**'
---

# News Feed

## QuoteCard likes and comments use Inertia Form
Like, comment, and delete-comment on the news feed use Inertia Form plus Wayfinder .form() (quotes.likes.store, quotes.comments.store, comments.destroy). Pass preserveScroll via options={{ preserveScroll: true }}, not as a top-level Form prop. Comment create uses resetOnSuccess.
