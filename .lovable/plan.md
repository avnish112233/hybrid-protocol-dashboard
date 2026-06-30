1. **Add VO2 max benchmark** — In `OverviewTab.tsx`, render a `BenchmarkSlider` for the VO2 max entry (already in `benchmarks` data) below the Body Composition card.

2. **More gap between bar and "You are here" marker** — In `BenchmarkSlider.tsx`, `NormativeScale.tsx`, and `AsymmetrySlider.tsx`, increase the spacing (e.g. add `mt-1.5` to the marker container / bump the marker row height) so the label sits clearly below the colored track.

3. **Zone labels under every scale** — Under the colored bar in `BenchmarkSlider` and `NormativeScale`, replace the current min / "Optimal x–y" / max row with a sequential zone-label row showing **Suboptimal · Normal · Optimal · Normal · Suboptimal** positioned to align with each colored segment (using the same percent breakpoints already computed). Keep the numeric min/max as small tick text on a second line.

4. **Remove the green suggestions box** — Delete the green `AccentCallout` block in `InsightsCard.tsx` (the "Add a dedicated grip endurance block…" list + champions quote). Remove the `InsightsCard` render from `OverviewTab.tsx` as well since nothing is left.