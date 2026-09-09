# Quotes — Movie and Quote Modal Folders

**Date:** 2026-09-09 14:45
**Feature:** `quotes`
**Flags:** `-doc -feat:quotes`
**Prompt:** make 2 folders in components/modals MovieModal and QuoteModal and copy the movie modal logic for the quotes, dont touch the contents of the modal

## Summary

Movie and quote modals live in separate folders. The movie modal is unchanged and still used on the movies list and movie show pages. The quote modal is a controlled dialog shell (`open` / `onOpenChange`) with no form fields or submit logic yet.

## Current structure

```
resources/js/components/modals/
  MovieModal/          full movie form (store/update)
    MovieModal.tsx
    MovieForm.tsx
    MovieTextArea.tsx
    MovieTextField.tsx
    helper.ts
  QuoteModal/          dialog open/close only
    QuoteModal.tsx     controlled Dialog
    QuoteForm.tsx      empty stub
    QuoteTextArea.tsx  empty stub
    helper.ts          QuoteFormVariant only
```

- Import movie modal from `@/components/modals/MovieModal/MovieModal`
- `QuoteModal` props: `open`, `onOpenChange`. Same dialog chrome as the movie modal. No `QuoteForm` inside it yet.
- `QuoteForm` and `QuoteTextArea` render empty placeholders. There is no `QuoteTextField`.
- Quote modal is not mounted on any page.

## What was made

- Movie modal files under `resources/js/components/modals/MovieModal/`
- Quote modal files under `resources/js/components/modals/QuoteModal/`
- Movies list and movie show import `MovieModal/MovieModal`

## How it was made

- Movie form logic stayed in the `MovieModal` folder
- Quote copies were later stripped to placeholders; only open/close was added back

## Follow-ups

- Add quote form fields (`quote_en`, `quote_ka`, optional cover, `movie_id`)
- Point `QuoteForm` at `@/wayfinder/routes/quotes`
- Mount `QuoteModal` on a quote or movie page
