## 1. Remove remaining orange/status dots (Overview + Train)

The earlier pass dropped `StatusDot` from `OverviewTab`/`TrainTab` shells, but two still render visually on those tabs:

- `InsightsCard` → injury-risk list (`StatusDot` per row). Replace dot with a plain bullet (`•`) so the row carries only text.
- `FunctionalScores` → per-test `StatusDot` (a yellow/orange dot for "normal"/"suboptimal" tests). Remove the dot; status will continue to be conveyed by the value color and the aggregate `StatusPill` on each category header, plus the new asymmetry slider (see §5).

No other changes to status semantics.

## 2. Typography: Blinker (headings) + Instrument Sans (body)

- `src/routes/__root.tsx`: replace the Inter/Inter Tight Google Fonts `<link>` with one for `Blinker` (400/500/600/700) and `Instrument Sans` (400/500/600).
- `src/styles.css`:
  - `--font-sans: "Instrument Sans", system-ui, sans-serif;`
  - `--font-display: "Blinker", "Instrument Sans", system-ui, sans-serif;`
- Headings already use `var(--font-display)` via inline style. Body inherits `--font-sans` via Tailwind's `font-sans` default — no per-component changes needed. The few `Eyebrow`/uppercase labels keep their current sizing.

## 3. Header subheading copy

`src/components/hybrid/ProfileHeader.tsx` — replace the current sentence with a HYROX-flavoured line:

> "Champions don't guess — they measure. Train the gaps your numbers reveal."

## 4. Overview tab restructure

New order in `OverviewTab.tsx`:

1. **Athlete profile** (compact `QuadrantChart`) — see redesign below
2. **Benchmarks** (VI test data: Fat %, ALMI, VO₂ max)
3. **Functional Scores** (with new asymmetry sliders — §5)
4. **Insights** (testing suggestions only; injury risks moved into the quadrant card)
5. **Retest Reminder**

### QuadrantChart redesign

- Eyebrow stays "Athlete Profile" but rendered at **12px** (`text-xs`), not the current 10px uppercase tracking.
- Drop the H2 "Hybrid · Aerobic-leaning" line and shrink the explanatory copy to one short sentence: *"Your position on the HYROX map — overall capacity vs. strength/aerobic mix."*
- Axes relabel:
  - **Y axis** = "Athlete level" (low → high; bottom = developing, top = elite)
  - **X axis** = "Strength ← → Aerobic"
  - Update the four corner labels accordingly (remove Power/Endurance corners; keep just the two axis end labels).
- Below the matrix, inline an **Injury risk** mini-section: small eyebrow "Injury risk" + bulleted pointers from `insights.injuryRisks` (label only, no status dot, no severity pill — pointers, as requested).

### InsightsCard

- Remove the "Injury Risks" block (now lives under the quadrant).
- Rename heading to **"Testing Suggestions"**; keep the suggestion list as plain bullets.

## 5. Asymmetry slider in Functional Scores

A new presentational component `src/components/hybrid/AsymmetrySlider.tsx`:

- Input: `percent: number` (absolute asymmetry %).
- Track: gradient with three zones — `0–10%` optimal (green), `10–18%` normal (amber), `18%+` suboptimal (red). Visual scale capped at 25%.
- Thumb at `min(percent, 25)` with the numeric `±X%` rendered to its right.
- Tiny axis labels: `0%`, `10`, `18`, `25%+`.

Wire-up in `src/components/hybrid/FunctionalScores.tsx`:

- For each `SubTest`, parse asymmetry from `value` when present (regex on patterns like `3.7% L>R`, `−22.9/−22%`, `6.5% R>L`; take the absolute first percentage that appears with a directional token). If no asymmetry is detected (e.g. `IMTP 161 kg`, `CMJ 46 W/kg`), don't render the slider.
- Render the slider beneath the existing test row, full-width, replacing the per-test `StatusDot`. The slider's own zone color is the visual status indicator now.
- Derive `status` from the parsed percent (`<10 optimal`, `<18 normal`, else `suboptimal`) instead of the hard-coded `status` field for tests that have asymmetry. Non-asymmetry tests keep their existing `status` for the aggregate pill.

No data shape changes in `athlete.ts` — values stay strings; parsing is in the component.

## Files

**Edit**
- `src/routes/__root.tsx` — Google Fonts link → Blinker + Instrument Sans
- `src/styles.css` — `--font-sans`, `--font-display`
- `src/components/hybrid/ProfileHeader.tsx` — new subheading copy
- `src/components/hybrid/OverviewTab.tsx` — new section order
- `src/components/hybrid/QuadrantChart.tsx` — smaller header, new axes, injury-risk pointers inline
- `src/components/hybrid/InsightsCard.tsx` — drop injury risks, rename, keep suggestions
- `src/components/hybrid/FunctionalScores.tsx` — drop `StatusDot`, render `AsymmetrySlider` when applicable
- `src/components/hybrid/TrainTab.tsx` — (no functional change; only here if a stray status dot remains after audit)

**Create**
- `src/components/hybrid/AsymmetrySlider.tsx`

## Out of scope
- No changes to Train tab structure, celebration, or History.
- No changes to data in `athlete.ts`.
- No new color tokens; reuse `--status-optimal/normal/suboptimal`.
