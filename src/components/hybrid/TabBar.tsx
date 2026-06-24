import { cn } from "@/lib/utils";

type Tab = "overview" | "train";

export function TabBar({ value, onChange }: { value: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "OVERVIEW" },
    { id: "train", label: "TRAIN" },
  ];
  return (
    <div className="sticky top-0 z-20 grid grid-cols-2 border-b border-border bg-background">
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={cn(
              "relative py-4 text-xs font-bold uppercase tracking-[0.24em] transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-[3px] transition-colors",
                active ? "bg-primary" : "bg-transparent",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}