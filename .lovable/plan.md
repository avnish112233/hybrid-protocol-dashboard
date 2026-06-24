# Hybrid Protocol — Build Plan

A mobile-first, industrial light-theme web app for Vital Insights. Two routes: a tappable banner landing and an athlete profile with Overview + Train tabs. All data mocked but typed so it can later be wired to a real source.

## Design system (src/styles.css)

Update tokens to the industrial palette:
- `--background` #F7F6F4, `--card` #FFFFFF, `--border` #E8E6E2
- `--foreground` #1A1A1A, `--muted-foreground` #6B6B6B
- `--primary` #E8420A (orange), `--primary-hover` #E56332
- `--radius` 4px (sharp)
- Fonts via `<link>` in `__root.tsx`: Archivo Black (display), Inter (body). Add `--font-display` and `--font-sans` in `@theme`.
- Headings: uppercase, tight tracking. Eyebrow labels: 11px uppercase, letter-spaced, muted.
- Hairline dividers, no shadows beyond a faint 1px border.
- Motion: 150ms fade/slide on tab change, no bounce.

## Routes

- `/` → `BannerScreen` (full-bleed, tappable → `/profile`)
- `/profile` → `ProfilePage` with tab state in URL search param `?tab=overview|train` (persists across navigation)

Each route gets its own `head()` metadata.

## Components (src/components/hybrid/)

- `BannerScreen` — full-viewport orange #E8420A block, black angled lane-stripe SVG accents, stacked headline ("VITAL INSIGHTS PRESENTS" / "HYBRID PROTOCOL" / "Built for a Champion."), bottom CTA "Tap to view your profile →". Whole surface is a `<Link to="/profile">`.
- `ProfileHeader` — name "HARINAG S P", meta chips (163cm · 66kg · 42y · 27/11/1983) with small orange outline icons.
- `TabBar` — two equal-width tabs (OVERVIEW / TRAIN), orange underline on active, drives the `tab` search param.
- `QuadrantChart` — pure SVG 2x2 grid; Y axis Athleticism, X axis Strength↔Aerobic, HYBRID center label; 4 faint quadrant tints + corner labels; single orange dot at sample position with "You are here." callout; caption underneath.
- `BenchmarkSlider` — props `{ label, eyebrow, value, unit, benchmarkLow, benchmarkHigh, min, max }`. Renders eyebrow, big orange value, horizontal track with shaded benchmark band and a vertical tick for the athlete, status text below ("Below / Within / Above HYROX athlete average") computed from value vs band.
- `FunctionalScoreCard` — collapsible category card (Radix Collapsible / shadcn Accordion item) with sub-test rows: icon, bold name, grey one-line race correlation, right-aligned orange value.
- `SummaryChips` — "PRIMARY STRENGTH" / "PRIMARY LIMITER" pills under functional scores.
- `StreakBar` — sticky strip atop Train tab: 🔥 number, "DAY STREAK", motivational line, orange progress bar to next milestone (7/14/30/60).
- `WeeklyPlanCard` — list of 7 day cards, each with day+date, color-coded session chip (orange strength / charcoal run / grey rest), 1-line focus. Tapping expands to exercise list.
- `ExerciseRow` — name, target sets×reps, target load, small orange "Record" dot button.
- `RecordSheet` — shadcn `Drawer` / `Sheet` with Sets stepper, Reps stepper, Weight numeric + ±2.5kg buttons, Save → marks exercise completed (checkmark, greyed row) via local state.
- `HistoryList` — reverse-chronological compact rows (date, session type, exercises completed, total volume); expandable to show logged sets/reps/weights.

## Data (src/data/athlete.ts)

Typed mocks:
- `athlete` (name, height, weight, age, dob)
- `quadrantPosition` (x, y in 0–1)
- `benchmarks`: FAT% 14.2 (8–15), ALMI 7.6 (7.5–9.5), VO2 Max 46.11 (45–55)
- `functionalScores`: Neuromuscular Power, Hybrid Strength, Isometric Power — exact sub-tests, correlations, values from the brief
- `summary`: primary strength + limiter strings
- `weeklyPlan`: Mon–Sun with session type, focus, exercises[]
- `history`: a few completed sessions
- `streak`: { days: 12, nextMilestone: 14 }

Train tab uses `useState` for completion + logged entries (no persistence this pass; structure ready for Cloud later).

## State & interaction

- Tab state via TanStack Router search params (`useNavigate` + `useSearch`) so it persists.
- Expand/collapse via shadcn `Accordion` for functional scores and day cards.
- `Sheet` for Record entry.
- All metric components accept props so a future loader can pass real data.

## Out of scope (this pass)

- No backend / Cloud — purely client mocks with prop-driven components.
- No auth.
- No real charts library; QuadrantChart is hand-rolled SVG (lightweight, on-brand).

## Verification

- Build passes; mobile viewport (375px) renders banner full-bleed and profile tabs without overflow (apply responsive grid pattern for the header meta row).
- Banner tap navigates to `/profile?tab=overview`; tab switch updates URL and persists on back/forward.
- Recording an exercise marks it completed and adds to history list in-session.
