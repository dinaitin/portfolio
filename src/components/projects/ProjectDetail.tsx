"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLanguage, useLocalized } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudy } from "./CaseStudy";
import { imageSizes, ProjectImage } from "./ProjectCard";
import { ProjectMeta } from "./ProjectMeta";

export function ProjectDetail({ project }: { project: Project }) {
  const { t } = useLanguage();

  return (
    <article className="mx-auto max-w-5xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <Reveal y={12}>
        <Link
          href="/#projects"
          className="group mb-8 inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          {t.projects.back}
        </Link>
      </Reveal>

      {project.sections ? <CaseStudy project={project} /> : <StandardDetail project={project} />}
    </article>
  );
}

/** Default details layout for projects without case-study sections. */
function StandardDetail({ project }: { project: Project }) {
  const { t } = useLanguage();
  const l = useLocalized();
  const description = l(project.description);

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
        {project.officialTitle && (
          <blockquote className="mt-6 max-w-3xl border-l-2 border-primary/60 pl-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t.projects.officialTitle}</p>
            <p className="mt-1 text-base italic text-fg/90">“{l(project.officialTitle)}”</p>
          </blockquote>
        )}
      </Reveal>

      <Reveal delay={0.1} className="card group mt-12 overflow-hidden">
        <ProjectImage
          project={project}
          featured
          placeholder={t.projects.imagePlaceholder}
          sizes={imageSizes.detail}
        />
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_16rem]">
        <Reveal>
          <h2 className="mb-4 font-display text-2xl font-semibold text-fg">{t.projects.overview}</h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {description.length > 0 ? (
              description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            ) : (
              <p>{t.projects.moreSoon}</p>
            )}
          </div>
          {project.highlights && (
            <>
              <h2 className="mt-10 mb-4 font-display text-2xl font-semibold text-fg">{t.projects.highlights}</h2>
              <ul className="space-y-3 text-base leading-relaxed text-muted">
                {l(project.highlights).map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Reveal>

        <Reveal delay={0.1} as="div">
          <ProjectMeta project={project} />
        </Reveal>
      </div>
    </>
  );
}
