
## Scope
Five connected changes on the Hybrid Protocol dashboard. All mock-data driven (no real Strava/wearable API yet — wired so it can be later).

## 1. Card styling pass (global)
- Replace `shadow-[var(--shadow-soft)]` on all cards with a visible 1px border using a slightly darker token (`--card-border`, e.g. neutral-200 / oklch ~0.92).
- Remove `--shadow-soft` usage; keep `--shadow-sheet` only for the bottom Record sheet.
- Apply across: TrainTab cards, History, OverviewTab cards (Quadrant, Insights, Retest, Benchmark, Functional, Asymmetry), AccentCallout, StreakBar.

## 2. Run sessions from Strava (Train tab)
- Extend `weeklyPlan` data: RUN A / RUN B days get a `runData` object (mock, shaped like Strava activity):
  `{ source: "Strava", distanceKm, durationMin, avgPaceMinPerKm, avgHr, maxHr, elevationM, calories }`.
- New component `RunSessionCard` renders inside the day's accordion above the exercise list when `runData` exists: distance, pace, avg/max HR, duration, elevation, calories — read-only, with a small "Synced from Strava" tag.
- Logging behaviour for run days: tapping the run card opens the session view (item 3) instead of the Record sheet; day completion logic updates to count the run as one completed item.

## 3. Session view (new route `/session/$sessionId`)
- Mobile screen modelled on the attached Activity PNG:
  - Header: back button, session title (e.g. "Run · Wednesday"), subtitle (date · type).
  - HR over time line chart card (mock series, orange line on soft fill, min/max labels) — uses Recharts.
  - Stat grid: Distance, Pace, Duration, Avg HR, Max HR, Calories.
  - Zones bar list (Z1–Z5 % with horizontal bars), styled like the Stages section in the reference.
  - "Muscles worked" card: SVG body silhouette (front view) with muscle groups tinted by effort intensity (low/med/high) + legend. Static SVG component `MuscleMap`.
  - "Effort" summary: RPE 1–10 ring + perceived effort label (Easy / Moderate / Hard / Max).
  - Linked training: list of the day's exercises with sets logged.
- Accessed from: tapping a logged exercise row, the run card, or a History entry.
- Mock data in `src/data/sessions.ts` keyed by session id.

## 4. Coach notes at end of training
- After the last exercise in a day's accordion, add a `NotesCard`:
  - Textarea ("Notes for coach — how did it feel, pain, technique cues…").
  - Save button → stored in component state + appended to the day's history entry as `notes`.
  - Shown read-only in History and Session view under a "Notes" section with a small "Visible to coach" tag.
- Data shape: extend `HistoryEntry` with `notes?: string`.

## 5. Wearables screen (new route `/wearables`)
- Mirrors the second reference PNG:
  - Hero: watch illustration on radial orange dot-pattern background (use existing orange tokens; SVG dots + emoji/icon placeholder for the watch).
  - Title "Connect Your Wearable" + subtitle.
  - Capability chips: Heart rate, Sleep, SpO2, Steps, Calories, HRV.
  - Supported devices line.
  - "Watches" list: Apple Watch, Garmin, Coros, Fitbit, Amazefit — each row a bordered card with icon + chevron, tapping shows a toast "Coming soon".
  - "Wearables" list: Connect Wearable device row.
  - "Apps" list: **Strava** row marked Connected (green pill) — this is what populates the run data above.
- Entry points: small "Devices" icon in the ProfileHeader top-right; also a row at the bottom of the Train tab "Connect a wearable →".

## Files

New:
- `src/routes/session.$sessionId.tsx`
- `src/routes/wearables.tsx`
- `src/components/hybrid/RunSessionCard.tsx`
- `src/components/hybrid/NotesCard.tsx`
- `src/components/hybrid/MuscleMap.tsx`
- `src/components/hybrid/HrChart.tsx`
- `src/components/hybrid/ZoneBars.tsx`
- `src/data/sessions.ts`

Edited:
- `src/styles.css` — add `--card-border`, drop soft shadows from card recipes.
- `src/data/athlete.ts` — add `runData` to RUN days, `notes` on HistoryEntry, session ids on exercises/days.
- `src/components/hybrid/TrainTab.tsx` — borders, run card, notes card, link to session view, wearable CTA row.
- `src/components/hybrid/OverviewTab.tsx` + all card components — swap shadow → border.
- `src/components/hybrid/ProfileHeader.tsx` — devices icon button → `/wearables`.

## Notes / open items
- No real Strava OAuth — UI only, mock data labelled "Synced from Strava". Real integration can come later via a server function.
- Muscle map is a stylised SVG, not anatomically exhaustive: chest, shoulders, biceps, forearms, abs, quads, calves (front) — enough to communicate focus.
