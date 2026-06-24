# Hybrid Protocol — Redesign & Feature Pass

## 1. Visual overhaul — "Apple Health / Fitness"

Replace the industrial light theme with a softer, sleeker system.

**Tokens (`src/styles.css`)**
- Background `#FFFFFF`, surface `#F2F2F7`, card `#FFFFFF`, border `#E5E5EA`
- Foreground `#1C1C1E`, muted `#8E8E93`
- Accent (orange) `#FF6B35` — used ONLY for: brand mark, primary CTA, streak ring, active tab indicator. Never on numeric values.
- Status colors (semantic, used everywhere a value is judged):
  - `--status-optimal` `#30D158` (green)
  - `--status-normal` `#FFD60A` (amber)
  - `--status-suboptimal` `#FF453A` (red)
- Radii: `--radius` 16px (cards `rounded-2xl`, controls `rounded-xl`, chips `rounded-full`)
- Shadows: very soft `0 1px 2px rgba(0,0,0,.04), 0 8px 24px -12px rgba(0,0,0,.06)` — replaces hairline borders on cards
- Type: keep Inter for body, swap Archivo Black → **Inter Tight** (weights 300/500/700) for display. Large numerals are light-weight (300) and tabular. Drop uppercase tracking on big headings; keep tiny uppercase only on eyebrows.

**Component sweep**
- Remove 1px hairline borders from cards; use shadow + surface contrast.
- Round all cards/buttons/sheets/inputs.
- Drop the lane-stripe industrial motif on the banner; keep it minimal — large light-weight wordmark, single orange dot accent, soft gradient.
- Eyebrows shrink to 10px uppercase, muted color, no orange.

## 2. Status indication system

New helper `src/lib/status.ts` exporting:
```ts
type Status = "optimal" | "normal" | "suboptimal";
getBenchmarkStatus(value, low, high, min, max): Status
```
Plus a small `<StatusDot />` and `<StatusPill />` component (colored dot + label "Optimal / Normal / Suboptimal").

**Where it's applied**
- `BenchmarkSlider`: the track itself becomes a 3-segment gradient — red (suboptimal) → amber (normal) → green (optimal) → amber → red, with the optimal band centered on `benchmarkLow..benchmarkHigh`. The numeric readout is rendered in the matching status color (no orange). A status pill sits next to the label.
- `FunctionalScores`: each sub-test row gets a `status` field in the mock data (you can tune later) and renders a colored dot + value in status color. Category headers show an aggregate pill.
- Quadrant: dot color reflects overall status (not orange).

## 3. Quadrant card — compact + insights

`QuadrantChart` shrinks and joins suggestions + injury risks in one card:

```text
┌─────────────────────────────────────────────┐
│ EYEBROW: Athlete Profile                    │
│ ┌──────────┐  SUGGESTIONS                   │
│ │ ▓▓░░     │  • Add grip endurance block    │
│ │ ░▓●░     │  • Z2 volume +20%              │
│ │ ░░░░     │                                │
│ │ Hybrid   │  INJURY RISKS                  │
│ └──────────┘  • L/R grip asymmetry 22%      │
│  120×120      • Knee shock absorption       │
└─────────────────────────────────────────────┘
```
- Quadrant becomes a fixed 120×120 (was full-width square), labels minimized to corner glyphs.
- On mobile (<380px) the suggestions/risks stack below; ≥380px they sit to the right in a 2-col grid.
- New data in `athlete.ts`: `suggestions: string[]`, `injuryRisks: { label: string; severity: Status }[]`.

## 4. Per-set logging (weight varies between sets)

`RecordSheet` defaults to **per-set rows**. Each set is a row with reps + weight steppers:

```text
SET 1   [reps 8] [weight 60 kg]
SET 2   [reps 8] [weight 65 kg]   ⨯
SET 3   [reps 6] [weight 70 kg]   ⨯
[+ Add set]   [Copy previous]
```
- Sheet initializes from `ex.sets` × planned reps/load.
- Stored entry shape changes to `sets: { reps: number; weight: number }[]`.
- History row shows volume = Σ reps×weight, and expanding shows per-set breakdown.
- Update `LogEntry`, `HistoryEntry.logs[].sets` typing accordingly.

## 5. Other UI touch-ups

- `TabBar`: pill background `#F2F2F7`, active pill white with soft shadow, label color `#1C1C1E`, thin orange underline dot under active label (orange's only appearance here).
- `StreakBar`: circular ring (Apple Activity style) in orange, replacing the bar.
- `ProfileHeader`: larger avatar circle, lighter weight name, stats as 3 inline metrics with hairline dividers between them.
- Banner: full-bleed white → very soft top-down gradient `#FFFFFF → #F2F2F7`, centered light-weight wordmark "HYBRID PROTOCOL", small orange dot, "Tap to enter" muted.

## 6. Files

**Edit**
- `src/styles.css` — tokens, radius, shadows, fonts
- `src/routes/__root.tsx` — swap font link to Inter + Inter Tight
- `src/data/athlete.ts` — add `status` to benchmarks & functional sub-tests; add `suggestions`, `injuryRisks`; change exercise/log shape to per-set
- `src/components/hybrid/BannerScreen.tsx`
- `src/components/hybrid/ProfileHeader.tsx`
- `src/components/hybrid/TabBar.tsx`
- `src/components/hybrid/QuadrantChart.tsx` → compact + insights (rename internally or keep file; add new InsightsPanel section in same card)
- `src/components/hybrid/BenchmarkSlider.tsx` — gradient track, status pill, status-colored value
- `src/components/hybrid/FunctionalScores.tsx` — dots + status colors
- `src/components/hybrid/StreakBar.tsx` — ring
- `src/components/hybrid/TrainTab.tsx` — per-set RecordSheet + history expansion
- `src/components/hybrid/OverviewTab.tsx` — layout/spacing

**Create**
- `src/lib/status.ts` — helper + `<StatusDot />`, `<StatusPill />`

**No changes**: routing, data source wiring (still mock), shadcn primitives.

## 7. Out of scope

- No backend / persistence.
- No real charts library.
- No copy rewrite beyond what's needed for new fields.
- Quadrant remains static-positioned from mock data.
