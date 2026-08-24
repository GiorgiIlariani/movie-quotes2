# Home Curtain Reveal — Scroll-linked vertical curtain

**Date:** 2026-08-22 13:23
**Feature:** `home-curtain-reveal`
**Flags:** `-doc`
**Prompt:** on the home page, using framer motion make Scroll-linked vertical curtain reveal: a black first frame, then the three cover images wipe up from the bottom with a hard edge. using the 3 images in recourses/js/images

## Summary

The home page opens on a full-viewport black frame. As the user scrolls, the three landscape covers in `resources/js/images` wipe up one after another with a hard horizontal edge. The wipe is a CSS mask driven by Framer Motion scroll progress, not a timed animation.

## What was made

- Scroll-driven curtain sequence on `/` (black, then three sequential mask wipes)
- `resources/js/pages/Home/Home.tsx` — sticky stage and cover list
- `resources/js/pages/Home/CurtainPanel.tsx` — one cover; CSS mask wipe
- `resources/js/types/vite-env.d.ts` — PNG module typing
- `package.json`, `package-lock.json` — `framer-motion` added

## How it was made

- Tall `500vh` section with a sticky `h-dvh` black stage so the viewport stays pinned while scroll progress drives the wipes
- Covers overlap in one CSS grid cell (`col-start-1 row-start-1`), not absolute positioning
- Each panel uses a CSS mask: `mask-image: linear-gradient(#000 0 0)`, `mask-position: bottom`, `mask-repeat: no-repeat`
- `useScroll` + `useTransform` map scroll progress to `mask-size` (`100% 0%` → `100% 100%`), so the solid mask grows upward from the bottom and keeps a hard edge
- `WebkitMaskSize` is set to the same motion value for Safari
- A `0` keyframe keeps later panels fully masked until their slice starts (avoids HomeCover_3 showing at the top)
- Scroll range is split across the three covers; each wipe uses 75% of its slice so the image holds briefly
- Images imported from `resources/js/images/HomeCover_{1,2,3}.png` so Vite versions them

## Follow-ups

- Run `npm run dev` or `composer run dev` if the home page still shows the old stub
