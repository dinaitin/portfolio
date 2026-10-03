"use client";

import { skillCategories } from "@/data/skills";
import { useLanguage, useLocalized } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export function Skills() {
  const { t } = useLanguage();
  const l = useLocalized();

  return (
    <section id="skills" className="relative py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map(({ id, title, icon: Icon, accent, skills }, i) => (
            <Reveal key={id} delay={(i % 3) * 0.08} className="h-full">
              <div className="card group h-full p-6 hover:-translate-y-1">
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`flex size-11 items-center justify-center rounded-xl border transition-shadow duration-300 ${
                      accent === "cyan"
                        ? "border-primary/30 bg-primary/5 text-primary group-hover:shadow-[0_0_24px_-6px_rgb(34_211_238/0.7)]"
                        : "border-secondary/30 bg-secondary/10 text-violet-300 group-hover:shadow-[0_0_24px_-6px_rgb(139_92_246/0.7)]"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span aria-hidden className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mb-4 font-display text-lg font-semibold text-fg">{l(title)}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const name = typeof skill === "string" ? skill : l(skill);
                    return <Tag key={name}>{name}</Tag>;
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
