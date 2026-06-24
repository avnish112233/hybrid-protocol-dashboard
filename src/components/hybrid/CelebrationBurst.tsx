import { useEffect, useState } from "react";

export function CelebrationBurst({ trigger, count = 12 }: { trigger: number; count?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 750);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!show) return null;

  const colors = ["var(--status-optimal)", "var(--primary)", "var(--foreground)"];
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const dist = 28 + Math.random() * 18;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    return { tx, ty, color: colors[i % colors.length], delay: Math.random() * 80 };
  });

  return (
    <span className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="celebrate-particle"
          style={{
            backgroundColor: p.color,
            ["--tx" as never]: `${p.tx}px`,
            ["--ty" as never]: `${p.ty}px`,
            animationDelay: `${p.delay}ms`,
          }}
        />
      ))}
    </span>
  );
}