---
paths:
  - app/Http/Middleware/HandleInertiaRequests.php
---

# Middleware

## Do not share user movie options
Do not put the user's movies on HandleInertiaRequests shared props. MovieSelector fetches them on demand from movies.options.
