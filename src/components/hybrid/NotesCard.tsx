import { useState } from "react";
import { Check, MessageSquareText } from "lucide-react";

export function NotesCard({
  value,
  onSave,
}: {
  value?: string;
  onSave: (note: string) => void;
}) {
  const [text, setText] = useState(value ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mt-3 rounded-2xl border border-[var(--card-border)] bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground">
          <MessageSquareText className="h-4 w-4" />
          <span className="text-sm font-medium">Notes for your coach</span>
        </div>
        <span className="rounded-full bg-surface px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
          Visible to coach
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSaved(false);
        }}
        placeholder="How did it feel? Any pain, technique cues, or context the coach should know…"
        className="mt-3 min-h-[88px] w-full resize-y rounded-xl border border-[var(--card-border)] bg-surface p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
      />
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => {
            onSave(text.trim());
            setSaved(true);
          }}
          disabled={!text.trim()}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background disabled:opacity-40"
        >
          {saved ? <Check className="h-3.5 w-3.5" /> : null}
          {saved ? "Saved" : "Save note"}
        </button>
      </div>
    </div>
  );
}