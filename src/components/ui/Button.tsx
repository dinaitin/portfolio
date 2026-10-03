import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-bg hover:bg-white shadow-[0_0_30px_-8px_rgb(34_211_238/0.7)] hover:shadow-[0_0_40px_-6px_rgb(34_211_238/0.9)]",
  secondary:
    "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:border-primary/60 hover:text-primary",
  ghost: "text-muted hover:text-fg",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

/** Anchor styled as a button. Use for in-page links, downloads and external links. */
export function ButtonLink({ variant = "primary", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

type IconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  children: ReactNode;
};

/** Round icon-only link (social networks, etc.). */
export function IconLink({ label, className = "", children, ...props }: IconLinkProps) {
  return (
    <a
      aria-label={label}
      title={label}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface/60 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_20px_-6px_rgb(34_211_238/0.8)] ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
