"use client";

import { ArrowRight, Check, GraduationCap } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import type { Project, ProjectSection } from "@/data/projects";
import { useLanguage, useLocalized } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ProjectMeta } from "./ProjectMeta";

const sizes = {
  wide: "(min-width: 1024px) 64rem, 100vw",
  // Side by side from md (image column ≈ 18–24rem); stacked and capped at 28rem below.
  split: "(min-width: 768px) 24rem, (min-width: 480px) 28rem, 100vw",
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Rich details page: hero image, overview and numbered image/text blocks. */
export function CaseStudy({ project }: { project: Project }) {
  const { t } = useLanguage();
  const l = useLocalized();
  const sections = project.sections ?? [];
  const cs = t.projects.caseStudy;

  const facts = [
    project.context && { label: cs.type, value: l(project.context) },
    project.institution && { label: cs.institution, value: project.institution },
    project.date && { label: cs.year, value: project.date },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <>
      <Reveal>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          {[project.featured && t.projects.featured, project.context && l(project.context), project.date]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl">
          {l(project.title)}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{l(project.summary)}</p>
      </Reveal>

      {project.grade && (
        <Reveal delay={0.08} className="mt-8">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-line-strong bg-surface/80 px-5 py-4 shadow-[0_0_48px_-20px_rgb(34_211_238/0.55)] backdrop-blur sm:gap-5 sm:px-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/5 text-primary">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <p className="font-display text-3xl font-semibold leading-none tracking-tight text-gradient-accent sm:text-4xl">
                {l(project.grade)}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">{cs.grade}</p>
            </div>
          </div>
        </Reveal>
      )}

      {project.image && typeof project.image !== "string" && (
        <Reveal delay={0.1} className="mt-12">
          <Figure
            src={project.image}
            alt={project.imageAlt ? l(project.imageAlt) : l(project.title)}
            sizes={sizes.wide}
            className="aspect-[4/3] sm:aspect-video"
            imageClassName="object-[50%_55%]"
            preload
          />
        </Reveal>
      )}

      <div className="mt-20 space-y-20 md:mt-24 md:space-y-28">
        {/* 01 · Overview */}
        <section className="grid gap-10 md:grid-cols-[1fr_16rem]">
          <Reveal>
            <SectionHeading index={1} title={cs.summary} />
            <div className="space-y-4 text-base leading-relaxed text-muted">
              {l(project.description).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {project.officialTitle && (
              <blockquote className="mt-8 border-l-2 border-primary/60 pl-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t.projects.officialTitle}</p>
                <p className="mt-1 text-base italic text-fg/90">“{l(project.officialTitle)}”</p>
              </blockquote>
            )}
          </Reveal>

          {facts.length > 0 && (
            <Reveal delay={0.1} className="md:pt-16">
              <dl className="card divide-y divide-line overflow-hidden">
                {facts.map(({ label, value }) => (
                  <div key={label} className="p-4">
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</dt>
                    <dd className="mt-1 text-sm font-medium text-fg">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </section>

        {sections.map((section, i) => {
          const index = i + 2;
          if (section.layout === "wide") return <WideBlock key={section.id} section={section} index={index} />;
          if (section.layout === "metrics") return <MetricsBlock key={section.id} section={section} index={index} />;
          return <SplitBlock key={section.id} section={section} index={index} reverse={i % 2 === 1} />;
        })}

        <Reveal>
          <div className="mb-10 h-px bg-linear-to-r from-primary/40 via-line to-secondary/30" />
          <ProjectMeta project={project} className="grid gap-8 sm:grid-cols-2" />
        </Reveal>
      </div>
    </>
  );
}

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-4">
        <span className="font-mono text-sm text-primary">{pad(index)}</span>
        <span className="h-px flex-1 bg-linear-to-r from-primary/40 via-line to-transparent" />
      </div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{title}</h2>
    </div>
  );
}

function SectionText({ section }: { section: ProjectSection }) {
  const l = useLocalized();
  return (
    <>
      {section.body && (
        <div className="space-y-4 text-base leading-relaxed text-muted">
          {l(section.body).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
      {section.flow && <Flow steps={l(section.flow)} />}
      {section.tags && (
        <div className="mt-6 flex flex-wrap gap-2">
          {section.tags.map((tag, i) => (
            <Tag key={tag} accent={i % 2 === 0 ? "cyan" : "violet"}>
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </>
  );
}

/** Image and text side by side; `reverse` puts the image on the right on desktop. */
function SplitBlock({ section, index, reverse }: { section: ProjectSection; index: number; reverse: boolean }) {
  const { t } = useLanguage();
  const l = useLocalized();

  return (
    <section className="grid items-center gap-8 md:grid-cols-12 lg:gap-12">
      {section.image && (
        <Reveal className={`mx-auto w-full max-w-md md:col-span-5 md:max-w-none ${reverse ? "md:order-2" : ""}`}>
          <Figure
            src={section.image.src}
            alt={l(section.image.alt)}
            sizes={sizes.split}
            className="aspect-[4/5]"
            label={`${t.projects.caseStudy.figure} ${pad(index)}`}
          />
        </Reveal>
      )}
      <Reveal delay={0.1} className={section.image ? "md:col-span-7" : "md:col-span-12"}>
        <SectionHeading index={index} title={l(section.title)} />
        <SectionText section={section} />
      </Reveal>
    </section>
  );
}

/** Full-width image followed by text and a grid of technical cards. */
function WideBlock({ section, index }: { section: ProjectSection; index: number }) {
  const { t } = useLanguage();
  const l = useLocalized();

  return (
    <section>
      <Reveal>
        <SectionHeading index={index} title={l(section.title)} />
      </Reveal>
      {section.image && (
        <Reveal className="mb-8">
          <Figure
            src={section.image.src}
            alt={l(section.image.alt)}
            sizes={sizes.wide}
            className="aspect-[4/3] sm:aspect-[2/1]"
            imageClassName="object-[50%_55%]"
            label={`${t.projects.caseStudy.figure} ${pad(index)}`}
          />
        </Reveal>
      )}
      <Reveal>
        <SectionText section={section} />
      </Reveal>
      {section.points && (
        <Reveal className="mt-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">{t.projects.caseStudy.integrates}</p>
          <ul className="grid gap-2 min-[400px]:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            {l(section.points).map((point, i) => (
              <li key={point} className="card flex items-center gap-3 p-3 hover:-translate-y-0.5 sm:p-4">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-lg border ${
                    i % 2 === 0 ? "border-primary/30 bg-primary/5 text-primary" : "border-secondary/30 bg-secondary/10 text-violet-300"
                  }`}
                >
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm text-fg">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}

/** Connected chips describing a chain, e.g. beacon → radio link → receiver → client. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, i) => (
        // Stacked on mobile with the arrow below each step; inline from sm.
        <li key={step} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <span
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs ${
              i % 2 === 1 ? "border-secondary/30 bg-secondary/10 text-violet-300" : "border-primary/30 bg-primary/5 text-primary"
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight aria-hidden className="ml-4 size-3.5 shrink-0 rotate-90 text-muted sm:ml-0 sm:rotate-0" />
          )}
        </li>
      ))}
    </ol>
  );
}

/** Grid of metric cards plus discreet technical notes. */
function MetricsBlock({ section, index }: { section: ProjectSection; index: number }) {
  const l = useLocalized();

  return (
    <section>
      <Reveal>
        <SectionHeading index={index} title={l(section.title)} />
        <SectionText section={section} />
      </Reveal>
      {section.metrics && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.metrics.map((metric, i) => (
            <Reveal as="li" key={l(metric.label)} delay={(i % 3) * 0.06} y={12} className="h-full">
              <div className="card flex h-full flex-col p-5 hover:-translate-y-0.5">
                <span className="font-display text-3xl font-semibold tracking-tight text-gradient-accent">
                  {l(metric.value)}
                </span>
                <span className="mt-2 text-sm leading-snug text-fg">{l(metric.label)}</span>
                {metric.hint && (
                  <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                    {l(metric.hint)}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      )}
      {section.notes && (
        <Reveal className="mt-6">
          <ul className="space-y-2 border-t border-line pt-5 text-sm leading-relaxed text-muted">
            {l(section.notes).map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary/70" />
                {note}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}

type FigureProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** Sets the aspect ratio of the frame. */
  className?: string;
  /** Extra classes for the image, e.g. object-position. */
  imageClassName?: string;
  label?: string;
  preload?: boolean;
};

/** Framed image in the portfolio card style: object-cover, blur preview and subtle hover. */
function Figure({ src, alt, sizes, className = "", imageClassName = "", label, preload }: FigureProps) {
  return (
    <figure className={`card group relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imageClassName}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/40 via-transparent to-transparent" />
      {label && (
        <figcaption className="absolute top-3 left-3 rounded-full border border-line-strong bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
