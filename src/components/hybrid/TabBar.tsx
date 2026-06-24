import { cn } from "@/lib/utils";

type Tab = "overview" | "train";

export function TabBar({ value, onChange }: { value: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "train", label: "Train" },
  ];
  return (
    <div className="sticky top-0 z-20 bg-background/85 px-5 py-3 backdrop-blur-md">
      <div className="grid grid-cols-2 gap-1 rounded-full bg-surface p-1">
        {tabs.map((t) => {
          const active = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                "relative rounded-full py-2 text-sm font-medium transition-all",
                active
                  ? "bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-6px_rgba(0,0,0,0.08)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {active && (
                <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}