"use client";

import type { LucideIcon } from "lucide-react";
import { Antenna, Bot, Brain, Briefcase, Cpu, Drone, GraduationCap, Languages, MapPin, Network, ShieldAlert, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const focusAreas: { key: keyof Dictionary["about"]["focus"]; icon: LucideIcon }[] = [
  { key: "telecom", icon: Antenna },
  { key: "networks", icon: Network },
  { key: "uav", icon: Drone },
  { key: "embedded", icon: Cpu },
  { key: "critical", icon: ShieldAlert },
  { key: "security", icon: ShieldCheck },
  { key: "ai", icon: Brain },
];

export function About() {
  const { t } = useLanguage();
  const { facts } = t.about;

  const factList = [
    { icon: GraduationCap, label: facts.education, value: facts.educationValue },
    { icon: MapPin, label: facts.location, value: t.hero.location },
    { icon: Briefcase, label: facts.availability, value: t.hero.workModes },
    { icon: Languages, label: facts.languages, value: facts.languagesValue },
  ];

  return (
    <section id="about" className="relative py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-5">
            {t.about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <dl className="card divide-y divide-line overflow-hidden">
              {factList.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 p-5">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</dt>
                    <dd className="mt-1 text-sm font-medium text-fg sm:text-base">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <Bot className="size-4 text-secondary" />
            {t.about.focusTitle}
          </h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {focusAreas.map(({ key, icon: Icon }, i) => (
              <Reveal as="li" key={key} delay={i * 0.05} y={12}>
                <div className="card group flex h-full flex-col items-start gap-3 p-4 hover:-translate-y-1">
                  <Icon className="size-5 text-primary transition-colors group-hover:text-secondary" />
                  <span className="text-sm leading-snug text-fg">{t.about.focus[key]}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
