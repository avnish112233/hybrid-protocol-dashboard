import { cn } from "@/lib/utils";

type Tone = "orange" | "green" | "neutral";

const toneStyles: Record<Tone, { bar: string; bg: string }> = {
  orange: { bar: "bg-primary", bg: "bg-[var(--accent-orange-soft)]" },
  green: { bar: "bg-[var(--status-optimal)]", bg: "bg-[var(--accent-green-soft)]" },
  neutral: { bar: "bg-border", bg: "bg-surface" },
};

export function AccentCallout({
  tone = "orange",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const s = toneStyles[tone];
  return (
    <div className={cn("relative overflow-hidden rounded-xl pl-4", s.bg, className)}>
      <span className={cn("absolute left-0 top-0 h-full w-[3px]", s.bar)} />
      <div className="px-3 py-3">{children}</div>
    </div>
  );
}