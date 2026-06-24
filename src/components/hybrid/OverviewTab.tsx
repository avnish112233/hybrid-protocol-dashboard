import { QuadrantChart } from "./QuadrantChart";
import { BenchmarkSlider } from "./BenchmarkSlider";
import { FunctionalScores } from "./FunctionalScores";
import { Eyebrow } from "./Eyebrow";
import { benchmarks } from "@/data/athlete";

export function OverviewTab() {
  return (
    <div className="space-y-4 px-5 pb-8 pt-2">
      <QuadrantChart />
      <div>
        <Eyebrow className="mb-2 px-1">Benchmarks</Eyebrow>
        <div className="space-y-3">
          {benchmarks.map((b) => (
            <BenchmarkSlider key={b.label} {...b} />
          ))}
        </div>
      </div>
      <FunctionalScores />
    </div>
  );
}