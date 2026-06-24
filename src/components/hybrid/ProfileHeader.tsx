import { athlete } from "@/data/athlete";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span
        className="text-xl font-medium leading-none tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function ProfileHeader() {
  const initials = athlete.name.split(" ").slice(0, 2).map((n) => n[0]).join("");
  return (
    <header className="bg-background px-5 pb-5 pt-7">
      <div className="flex items-center gap-4">
        <div
          className="grid h-14 w-14 place-items-center rounded-full bg-surface text-base font-medium text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Athlete
          </div>
          <h1
            className="mt-0.5 truncate text-xl leading-tight tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {athlete.name}
          </h1>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-5 rounded-2xl bg-surface px-5 py-4">
        <Stat label="Height" value={athlete.height} />
        <span className="h-8 w-px bg-border" />
        <Stat label="Weight" value={athlete.weight} />
        <span className="h-8 w-px bg-border" />
        <Stat label="Age" value={`${athlete.age}`} />
      </div>
    </header>
  );
}