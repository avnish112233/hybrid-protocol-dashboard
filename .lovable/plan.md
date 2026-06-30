## 1. Header — athlete name replaces "Hybrid Protocol"
`ProfileHeader.tsx`:
- Replace the big "HYBRID / PROTOCOL." title with `athlete.name` (e.g. `HARINAG / S P.`), keeping the same Blinker display font, weight, size, yellow color, and the "Vital Insights" eyebrow + "Train · Measure · Repeat" chip above/below.
- Long names: allow up to 2 lines, slightly smaller font on overflow.

## 2. Overview page cleanup (fix overlaps)
`OverviewTab.tsx` / shared scale components:
- Increase vertical rhythm: bump `space-y-4` → `space-y-5`; add more breathing room between the colored track, the "You are here" marker, the zone-label row, and the min/max ticks so they stop colliding on 390px.
- `YouAreHereMarker.tsx`: the small vertical line under the chip is the "line below you are here" the user flagged. Recolor it to **#222222** (and the chip background stays the status color, but the connector line is `#222222`). Drop the line opacity to full and make it sit cleanly **over** the bar.
- `ZoneLabels` (in `BenchmarkSlider.tsx` and `NormativeScale.tsx`):
  - Reduce font to 7px, weight 600, letter-spacing tighter, and clamp with `max-width` so adjacent "Normal" / "Optimal" / "Suboptimal" don't overlap the marker chip.
  - Add a small top offset so labels sit clearly below the bar, not under the marker.
- `QuadrantChart.tsx`: tighten the quadrant tile (smaller header text already), and ensure the "Capacity" rotated label doesn't overlap the dot — move it further into the gutter.

## 3. Bar gradient — symmetric vs sequential
Per your answer:
- **Body Composition (Fat %)** and **Functional Scores asymmetry sliders** → keep symmetric (suboptimal · normal · optimal · normal · suboptimal). No change.
- **VO2 max** and all **Functional Scores normative scales** (IMTP, CMJ, Drop Jump) → switch to **sequential left → right**: Suboptimal → Normal → Optimal (3 zones, red → amber → green, optimal on the right).

Implementation:
- Add a `direction?: "symmetric" | "sequential"` prop to `BenchmarkSlider` and `NormativeScale`.
- Sequential mode: gradient = suboptimal 0→pctNormalLow, normal pctNormalLow→pctOptimalLow, optimal pctOptimalLow→100. ZoneLabels collapses to 3 segments with midpoints in each band.
- Wire `direction="sequential"` for the VO2 max benchmark in `OverviewTab` and for all `NormativeScale` usages in `FunctionalScores.tsx`. Fat % and ALMI stay symmetric (default).

## 4. Phone + OTP login (UI-only mock)
New routes:
- `src/routes/login.tsx` — phone number entry (country code dropdown defaulting to +91, 10-digit input, zod validation), "Send OTP" button. On submit → navigate to `/verify` with phone in search params.
- `src/routes/verify.tsx` — 6-digit OTP using shadcn `InputOTP`, "Verify" button. Any 6-digit code accepted; on success sets `localStorage["hp_auth"]="1"` and navigates to `/`.
- Both screens use the same yellow/black HYROX banner aesthetic at the top (compact), Blinker display font for the headline ("Sign in" / "Verify your number"), Instrument Sans body.
- Add a tiny `useAuth` hook reading the localStorage flag.
- `src/routes/index.tsx`: if not authed, redirect to `/login` via `beforeLoad`.
- Add a small "Sign out" item in the wearables/settings flow (clears the flag, returns to /login). Minimal — just the link in the header avatar menu position, or skip if cluttered.

No backend, no Cloud, no real SMS. Pure UI flow we can wire to real auth later.

## Files
- Edit: `src/components/hybrid/ProfileHeader.tsx`, `src/components/hybrid/YouAreHereMarker.tsx`, `src/components/hybrid/BenchmarkSlider.tsx`, `src/components/hybrid/NormativeScale.tsx`, `src/components/hybrid/OverviewTab.tsx`, `src/components/hybrid/FunctionalScores.tsx`, `src/components/hybrid/QuadrantChart.tsx`, `src/routes/index.tsx`.
- Create: `src/routes/login.tsx`, `src/routes/verify.tsx`, `src/hooks/useAuth.ts`.
