## Goal
Remove the standalone banner/intro page and turn `/profile` into the landing page. Add a HYROX-style yellow/black industrial banner, a quadrant chart at the top with a "target" marker, and tighten every section (weekly plan, body composition, functional scores) so they read denser and clearer. Replace heavy black "you are here" dots with horizontal scales + a "You are here" bar pin.

## Routing
- Delete `src/routes/index.tsx` (current `BannerScreen` route) and the `BannerScreen.tsx` component.
- Move profile content to root: rename `src/routes/profile.tsx` → `src/routes/index.tsx` with `createFileRoute("/")`. Default tab stays `train`.
- Update any `<Link to="/profile">` / `<Link to="/">` references (ProfileHeader back button, wearables/session back links) accordingly.

## Header / Banner
Replace `ProfileHeader.tsx` with a HYROX-flavored banner:
- Yellow (#FFD60A-ish) + near-black, sharp diagonal stripes / chevrons background, condensed display type.
- Title "HYBRID PROTOCOL" + tagline "TRAIN. MEASURE. REPEAT." Last-updated line kept small.
- No back button. Keep the small wearable icon (top-right) for `/wearables`.
- Add new design tokens `--hyrox-yellow`, `--hyrox-black` in `src/styles.css`.

## Train tab (new top section)
New `TrainHeroCard` placed above the StreakBar:
- Eyebrow "TRAIN" + heading.
- Mini quadrant chart (reuse `QuadrantChart` visuals, simplified): shows current black dot AND a target ring at the elite center, with a subtle dashed line/arrow from current → target.
- Streak count rendered inline ("12 day streak — every completed session nudges you toward Elite").
- For every completed day (`celebratedDays`/logs), nudge the current dot a small step toward the target (compute interpolated position from `quadrantPosition` toward `{x:0.5,y:0.5}` based on completion count). Pure presentational — mock math, no backend.

## Weekly Plan rows (shrink)
In `TrainTab.tsx` `AccordionItem` header:
- Single line layout: `[DATE + DAY left] · [SESSION chip] [focus text inline] · [Done/▾ right]`.
- Smaller vertical padding (`py-2`), focus text truncated, session chip smaller.
- Left column shows date over day (e.g. `24 NOV` bold, `MON` muted) per request.

## History
- Each `HistoryEntry` row gains an optional `avgHr` field in `src/data/athlete.ts` (e.g. Strength B = 142 bpm). Render under the session line as `142 bpm avg HR`.

## Overview tab
### Body Composition card (`BenchmarkSlider`)
- Card padding reduced (`p-4`), no big `Eyebrow` block on its own row.
- New layout: large "Body Composition" heading on the left with small `Fat %` under it; on the right, the value `14.2%` rendered as a **legend pill** — light-green background, green text, no separate StatusPill, no "Optimal" word on the right.
- Slider track stays but smaller (h-1.5), keep the optimal band coloring.
- Replace the heavy black dot marker with a thin vertical bar + a tiny "You are here" label above the bar. Build a new shared component `YouAreHereMarker` (vertical line + label chip) used by both `BenchmarkSlider` and `AsymmetrySlider`.

### Functional Scores
- Rename section: remove the "Lab Report" eyebrow; just heading "Functional Scores".
- Tighter card (`p-4`, smaller accordion row padding).
- For each non-asymmetry test (IMTP, CMJ, Drop Jump, Knee Extension), add normative scales below the value:
  - Add `scale` metadata to `SubTest` in `src/data/athlete.ts`: `{ min, max, normalLow, optimalLow, optimalHigh, normalHigh, valueNumeric, unit }` (optional; falls back to existing string if absent).
  - New `NormativeScale` component (same color-banded track as BenchmarkSlider, smaller) with `YouAreHereMarker`.
- Asymmetry: rework `AsymmetrySlider` into a **balance scale**: center = 0% (best), left/right extremes show direction (e.g. "L>R 22%"). Track: green center band (±10%), amber (±10–18%), red (±18%+). Marker is the `YouAreHereMarker` bar pushed left/right based on signed asymmetry.

## Files touched
- Delete: `src/components/hybrid/BannerScreen.tsx`, `src/routes/index.tsx` (old).
- Rename/replace: `src/routes/profile.tsx` → new `src/routes/index.tsx`.
- Edit: `src/components/hybrid/ProfileHeader.tsx` (HYROX banner), `TrainTab.tsx` (hero card, denser rows, history HR), `BenchmarkSlider.tsx` (compact + legend pill), `AsymmetrySlider.tsx` (signed/balance), `FunctionalScores.tsx` (no Lab Report eyebrow, tighter, normative scales), `OverviewTab.tsx` (heading copy), `src/data/athlete.ts` (add scale + history HR), `src/styles.css` (yellow tokens).
- New: `TrainHeroCard.tsx`, `YouAreHereMarker.tsx`, `NormativeScale.tsx`.

## Out of scope
- No new backend/data wiring; quadrant "movement toward target" is mock interpolation only.
- No changes to wearables/session detail pages beyond fixing the back-link target.
