---
paths:
  - 'app/Actions/**'
---

# Actions

## Shared movie store and update
Store and update movies through CreateMovie and StoreMovieRequest. CreateMovie uses updateOrCreate; cover is required only when no movie is on the route.

## Shared quote store and update
Store and update quotes through CreateQuote and StoreQuoteRequest. CreateQuote uses updateOrCreate. StoreQuoteRequest rules are still pending.

## Quote cover is optional
CreateQuote attaches cover to the quote_cover media collection only when a file is present. StoreQuoteRequest treats cover as nullable.
