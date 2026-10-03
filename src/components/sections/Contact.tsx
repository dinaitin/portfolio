"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

  const channels: ContactChannelProps[] = [
    { label: t.contact.email, value: site.email, href: `mailto:${site.email}`, icon: <Mail className="size-5" /> },
    ...(site.linkedin
      ? [{ label: "LinkedIn", value: stripProtocol(site.linkedin), href: site.linkedin, icon: <LinkedinIcon className="size-5" />, external: true }]
      : []),
    ...(site.github
      ? [{ label: "GitHub", value: stripProtocol(site.github), href: site.github, icon: <GithubIcon className="size-5" />, external: true }]
      : []),
    { label: t.contact.location, value: t.hero.location, icon: <MapPin className="size-5" /> },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface p-6 sm:p-12 lg:p-16">
            <div aria-hidden className="absolute inset-0 bg-tech-grid opacity-70" />
            <div aria-hidden className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/15 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -left-32 size-96 rounded-full bg-secondary/15 blur-3xl" />

            {/* grid-cols-1 = minmax(0, 1fr): keeps the truncated email from widening the column on small screens */}
            <div className="relative grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="min-w-0">
                <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                  <span className="h-px w-8 bg-linear-to-r from-primary to-transparent" />
                  {t.contact.eyebrow}
                </p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
                  {t.contact.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.contact.subtitle}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`mailto:${site.email}`}>
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {t.contact.emailCta}
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/60 px-6 py-3 text-sm text-fg transition-all hover:border-primary/60 hover:text-primary active:scale-[0.97]"
                  >
                    {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                    <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
                  </button>
                </div>
              </div>

              <ul className="min-w-0 space-y-3">
                {channels.map((channel, i) => (
                  <Reveal as="li" key={channel.label} delay={0.1 + i * 0.08} y={12}>
                    <ContactChannel {...channel} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type ContactChannelProps = {
  label: string;
  value: string;
  /** Without `href` the channel is rendered as plain information. */
  href?: string;
  icon: ReactNode;
  external?: boolean;
};

function ContactChannel({ label, value, href, icon, external }: ContactChannelProps) {
  // Show the value in full: an email may break right after "@" on narrow screens.
  const at = value.indexOf("@");
  const displayValue =
    at > 0 ? (
      <>
        {value.slice(0, at + 1)}
        <wbr />
        {value.slice(at + 1)}
      </>
    ) : (
      value
    );

  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-strong text-muted transition-colors group-hover:border-primary/50 group-hover:text-primary sm:size-11">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">{label}</span>
        <span className="block text-sm text-fg [overflow-wrap:anywhere]">{displayValue}</span>
      </span>
    </>
  );

  const baseClass = "flex items-center gap-3 rounded-2xl border border-line bg-bg/60 p-3 backdrop-blur sm:gap-4 sm:p-4";

  if (!href) return <div className={baseClass}>{content}</div>;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group ${baseClass} transition-all duration-300 hover:border-primary/40 hover:bg-bg/80`}
    >
      {content}
      <ArrowUpRight className="hidden size-5 shrink-0 text-muted transition-all sm:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
    </a>
  );
}
