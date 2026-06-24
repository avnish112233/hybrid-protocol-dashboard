## Changes

### 1. Default tab → Train
- `src/routes/profile.tsx`: initial `useState<"overview" | "train">("train")`.
- `src/routes/index.tsx` (Banner): tapping banner still routes to `/profile` (Train opens by default).

### 2. Profile header cleanup
- `src/components/hybrid/ProfileHeader.tsx`: remove Height / Weight / Age / DOB stats. Keep avatar + name. Add a small subheading line beneath the name:
  > "You are training hard and moving towards becoming better. When you become better, it is important to know yourself."

### 3. Overview tab restructure
New order in `OverviewTab.tsx`:
1. **Quadrant card** (full width, above suggestions)
2. **Suggestions + Injury Risks** card (combined into one panel; remove the side-by-side compact layout in `QuadrantChart`)
3. **Retest reminder card** (new)
4. Benchmarks
5. Functional scores
6. Streak

Remove the `summary` (Primary Strength / Primary Limiter) section entirely.

### 4. QuadrantChart redesign
- Becomes full-width card, larger quadrant (e.g. 180×180) centered or left-aligned with explanation text beside.
- Add explanatory paragraph:
  > "This map plots you across two HYROX axes — Strength (vertical) vs. Aerobic capacity (horizontal). Your dot shows where your current profile sits relative to a pure strength, pure aerobic, or balanced hybrid athlete."
- Remove embedded Suggestions + Injury Risks from this component (moved to its own card).

### 5. New `InsightsCard` component
- Combined card titled "Suggestions & Injury Risks".
- Lists `insights.suggestions` (all) + `insights.injuryRisks` with status dots.
- File: `src/components/hybrid/InsightsCard.tsx`.

### 6. New `RetestCard` component
- File: `src/components/hybrid/RetestCard.tsx`.
- Shows retest date (mock) + explanation:
  > "As you keep training, your baseline shifts: fat % drops, VO₂max climbs, muscle mass grows. Get retested to know your new numbers."
- Three small bullets with up/down arrows: Fat % ↓, VO₂max ↑, Muscle mass ↑.
- Data added to `athlete.ts`: `retest = { lastTested: "12 Sep 2025", nextRetest: "12 Mar 2026" }`.

### 7. Remove Primary Strength / Primary Limiter
- Delete `summary` usage in `OverviewTab`. Keep export in `athlete.ts` or remove — remove for cleanliness.

### 8. Train tab celebrations
- `TrainTab.tsx` + `RecordSheet`:
  - When a single exercise is marked complete (all its sets logged + "Done" tapped), trigger a confetti / burst animation over that row. Use a lightweight inline CSS animation (no new dep) — orange/green burst of dots scaling+fading via `animate-` keyframes added to `styles.css` (`celebrate-burst`).
  - Track per-day completion state in local component state (no backend): `completedExercises: Set<string>` keyed by exercise id, per day.
  - When all exercises for the current day are complete, the day's card header turns **green** (status optimal color) with a check icon + label "Completed". Also fires a larger celebration animation once.
- Add keyframes in `src/styles.css`: `@keyframes celebrate-burst`, `@keyframes day-complete-glow`.
- New small component `src/components/hybrid/CelebrationBurst.tsx` — renders 8–12 absolutely-positioned dots that animate outward then fade.

### 9. Colors
- Day-complete green uses existing `--status-optimal` token. No new accent colors. Orange stays brand-only.

## Files

**Edit**
- `src/routes/profile.tsx` — default tab = train
- `src/components/hybrid/ProfileHeader.tsx` — strip stats, add subheading
- `src/components/hybrid/OverviewTab.tsx` — new order, drop summary
- `src/components/hybrid/QuadrantChart.tsx` — full-width + explanation, drop insights
- `src/components/hybrid/TrainTab.tsx` — completion state + green day + celebration
- `src/data/athlete.ts` — add `retest`, remove `summary` usage
- `src/styles.css` — celebration keyframes

**Create**
- `src/components/hybrid/InsightsCard.tsx`
- `src/components/hybrid/RetestCard.tsx`
- `src/components/hybrid/CelebrationBurst.tsx`

## Out of scope
- No persistence (completion resets on reload).
- No real retest scheduling backend.
- No copy changes beyond what's specified.
