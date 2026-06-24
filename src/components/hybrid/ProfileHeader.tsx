import { Ruler, Weight, User, Calendar } from "lucide-react";
import { athlete } from "@/data/athlete";

function Chip({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-border bg-card px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground">
      <Icon className="h-3 w-3 text-primary" />
      {children}
    </span>
  );
}

export function ProfileHeader() {
  return (
    <header className="border-b border-border bg-background px-5 pb-5 pt-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">Athlete</div>
      <h1
        className="mt-1 font-display text-3xl uppercase leading-none tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {athlete.name}
      </h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip icon={Ruler}>{athlete.height}</Chip>
        <Chip icon={Weight}>{athlete.weight}</Chip>
        <Chip icon={User}>{athlete.age}y</Chip>
        <Chip icon={Calendar}>{athlete.dob}</Chip>
      </div>
    </header>
  );
}