import { athlete } from "@/data/athlete";

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
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        You are training hard and moving towards becoming better. When you become better,
        it is important to know yourself.
      </p>
    </header>
  );
}