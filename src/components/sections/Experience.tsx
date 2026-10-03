"use client";

import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { useLanguage, useLocalized } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export function Experience() {
  const { t } = useLanguage();
  const l = useLocalized();

  return (
    <section id="experience" className="relative py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} subtitle={t.experience.subtitle} />

        {/*
          Desktop: alternating timeline on a 2-column grid. Each entry spans two
          rows and starts one row after the previous one, so an entry begins
          halfway down its neighbour on the opposite side instead of below it.
          Entries on the same side never share rows, so they cannot overlap.
        */}
        {/*
          The trailing 0px row is only spanned by the last entry: being fixed,
          it takes none of that entry's height, so the grid (and the center
          line) ends exactly where the last card ends.
        */}
        <ol
          style={{ gridTemplateRows: `repeat(${experience.length}, auto) 0px` }}
          className="relative ml-3 border-l border-line-strong md:ml-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-6 md:border-l-0"
        >
          {/* Center line on desktop */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-linear-to-b from-primary/60 via-line-strong to-secondary/50 md:block"
          />

          {experience.map((item, i) => {
            const Icon = item.kind === "education" ? GraduationCap : Briefcase;
            const right = i % 2 === 1;

            return (
              <li
                key={i}
                style={{ gridRow: `${i + 1} / span 2` }}
                className={`relative mb-10 pl-8 last:mb-0 md:mb-0 md:self-start md:pl-0 ${right ? "md:col-start-2" : "md:col-start-1"}`}
              >
                {/* Node, centred on the timeline line (half of gap-x-12 away from the card) */}
                <span
                  className={`absolute top-6 -left-[13px] flex size-6 items-center justify-center rounded-full border bg-bg ${
                    right ? "md:-left-[calc(1.5rem+12px)]" : "md:left-auto md:-right-[calc(1.5rem+12px)]"
                  } ${item.kind === "education" ? "border-secondary/70 text-secondary" : "border-primary/70 text-primary"}`}
                >
                  <Icon className="size-3" />
                </span>

                <Reveal className={right ? "" : "md:text-right"} y={16}>
                  <article className={`card p-5 sm:p-6 ${item.placeholder ? "border-dashed" : ""}`}>
                    <div className={`mb-3 flex flex-wrap items-center gap-2 ${right ? "" : "md:justify-end"}`}>
                      <span className="font-mono text-xs text-primary">{l(item.period)}</span>
                      {item.placeholder && <Tag>{t.experience.placeholderBadge}</Tag>}
                      {item.kind === "education" && <Tag accent="violet">{t.experience.educationBadge}</Tag>}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-fg">{l(item.role)}</h3>
                    <p className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted ${right ? "" : "md:justify-end"}`}>
                      <span className="text-fg/80">{item.organization}</span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {l(item.location)}
                        </span>
                      )}
                    </p>
                    {item.description && (
                      <p className="mt-4 text-sm leading-relaxed text-muted">{l(item.description)}</p>
                    )}
                    {item.highlights && (
                      <ul className="mt-4 space-y-2 text-left text-sm leading-relaxed text-muted">
                        {l(item.highlights).map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.tags && (
                      <div className={`mt-4 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
                        {item.tags.map((tag) => (
                          <Tag key={tag} accent={item.kind === "education" ? "violet" : "cyan"}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
