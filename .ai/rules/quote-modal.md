---
paths:
  - 'resources/js/components/modals/QuoteModal/**'
---

# Quote Modal

## Quote modal is an empty shell
QuoteModal files are placeholders without form fields or submit logic. Do not copy movie form content into them unless asked.

## Quote modal open and close
QuoteModal is a controlled Dialog. Pass open and onOpenChange. Do not add form fields or submit logic unless asked.

## Quote text areas use a corner language badge
QuoteTextArea is a dark bordered textarea with an absolutely positioned Eng/ქარ label in the top-right and an italic placeholder. Do not reuse MovieTextArea layout (label on the left).

## Quote UI strings live in lang quotes files
Add Quote button and QuoteModal copy come from lang/en/quotes.php and lang/ka/quotes.php, shared as translations.quotes. Language badges use translations.locale. Do not hardcode those strings.

## Quote MovieSelector when movieId is absent
When QuoteForm has no movieId, render MovieSelector as a shadcn Select. Fetch the user's movies with useHttp from movies.options on mount (id, title, release_year). Submit movie_id via the Select name. Use quotes.select_movie for the placeholder. Do not hardcode movie titles or the select copy. Do not use Inertia shared props for this list.

## MovieSelector fetches via useHttp
MovieSelector loads the user's movies with useHttp from movies.options when it mounts. Do not read userMovies from page props.
