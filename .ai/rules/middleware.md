---
paths:
  - app/Http/Middleware/HandleInertiaRequests.php
---

# Middleware

## Do not share user movie options
Do not put the user's movies on HandleInertiaRequests shared props. MovieSelector fetches them on demand from movies.options.

## Do not share notifications
Do not put notifications or unread counts on HandleInertiaRequests shared props. NotificationBell fetches them from notifications.index.
