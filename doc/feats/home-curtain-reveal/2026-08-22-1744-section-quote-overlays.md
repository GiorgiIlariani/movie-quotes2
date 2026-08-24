# Home Curtain Reveal — Section quote overlays

**Date:** 2026-08-22 17:44
**Feature:** `home-curtain-reveal`
**Flags:** `-feat:home-curtain-reveal`
**Prompt:** Add texts on each section acording the screenshot. each text should appear when its corresponding mask is halfway revealed, position on the vertical center and hide when the mask gets scrolled up fully, dont use opacity, control texts speed to show/hide them outside of the screen

## Summary

Each cover now shows a movie quote in the screenshot layout: large white lines, smaller title and year, left-aligned and vertically centered. The quote slides up from below when that cover’s mask is halfway open, then slides out the top when the wipe finishes. A later pass slowed the in/out window so the move reads less abrupt.

## What was made

- Quote overlays on all three home curtain sections
- `resources/js/pages/Home/CurtainQuote.tsx` — created
- `resources/js/pages/Home/Home.tsx` — updated (quote data + shared start/end)
- `resources/js/pages/Home/CurtainPanel.tsx` — updated (takes `start` / `end`)

## How it was made

- Same scroll range as each mask (`start` / `end` computed once in `Home`) so text and wipe stay aligned
- `useTransform` on `y` only — no opacity. Off-screen is `100dvh` / `-150dvh`
- Text stays below the viewport until the midpoint of the mask, slides in over `23%` of the section span, holds, then slides out before `end`
- Layout: grid overlap (`col-start-1 row-start-1`), `items-center`, `pl-[15%]`, Instrument Sans, white
- Quotes: Interstellar (cover 1), The Royal Tenenbaums (cover 2, screenshot line), The Lord of the Rings (cover 3)
