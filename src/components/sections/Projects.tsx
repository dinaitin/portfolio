"use client";

import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  const { t } = useLanguage();
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative py-20 md:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[30rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="space-y-6">
          {featured.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} featured />
            </Reveal>
          ))}

          {/*
            Closed: cards stretch to a common row height (balanced grid).
            While a card's "Description" panel is open, stop stretching so only
            that card grows and the others keep their natural height.
          */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 has-[[aria-expanded=true]]:items-start has-[[aria-expanded=true]]:*:h-auto">
            {others.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
