import { QuadrantChart } from "./QuadrantChart";
import { BenchmarkSlider } from "./BenchmarkSlider";
import { FunctionalScores } from "./FunctionalScores";
import { benchmarks } from "@/data/athlete";

export function OverviewTab() {
  return (
    <div className="space-y-5 p-5">
      <QuadrantChart />
      <div className="space-y-3">
        {benchmarks.map((b) => (
          <BenchmarkSlider key={b.label} {...b} />
        ))}
      </div>
      <FunctionalScores />
    </div>
  );
}