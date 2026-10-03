import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  accent?: "cyan" | "violet" | "neutral";
};

const accents = {
  cyan: "border-primary/25 bg-primary/5 text-primary",
  violet: "border-secondary/30 bg-secondary/10 text-violet-300",
  neutral: "border-line-strong bg-surface-2/60 text-muted",
};

export function Tag({ children, accent = "neutral" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide ${accents[accent]}`}
    >
      {children}
    </span>
  );
}
