"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Camera, ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import type { Project } from "@/data/projects";
import { useLanguage, useLocalized } from "@/i18n/LanguageProvider";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Tag } from "@/components/ui/Tag";

type ProjectCardProps = {
  project: Project;
  /** Larger, horizontal layout used for the flagship project. */
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { t } = useLanguage();
  const l = useLocalized();
  const href = `/projects/${project.slug}`;
  const inline = project.detail === "inline";

  return (
    <article
      className={`card group relative flex h-full flex-col overflow-hidden hover:-translate-y-1 ${
        featured
          ? "border-primary/30 shadow-[0_0_60px_-30px_rgb(34_211_238/0.6)] lg:grid lg:grid-cols-[1.1fr_1fr]"
          : ""
      }`}
    >
      {featured && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-secondary"
        />
      )}

      <ProjectImage project={project} featured={featured} placeholder={t.projects.imagePlaceholder} />

      <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8 lg:p-10" : ""}`}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
              <Sparkles className="size-3" />
              {t.projects.featured}
            </span>
          )}
          <StatusBadge status={project.status} label={t.projects.status[project.status]} />
          {(project.context || project.date) && (
            // One unbreakable unit so the date never wraps onto a line of its own.
            <span className="font-mono text-xs whitespace-nowrap text-muted">
              {[project.context && l(project.context), project.date].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>

        <h3
          className={`font-display font-semibold tracking-tight text-fg ${
            inline ? "" : "transition-colors group-hover:text-primary"
          } ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl"}`}
        >
          {inline ? (
            l(project.title)
          ) : (
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {l(project.title)}
            </Link>
          )}
        </h3>

        <p className={`mt-3 leading-relaxed text-muted ${featured ? "text-base sm:text-lg" : "text-sm"}`}>
          {l(project.summary)}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <Tag key={tag} accent={i % 2 === 0 ? "cyan" : "violet"}>
              {tag}
            </Tag>
          ))}
        </div>

        {inline ? (
          <InlineDetails project={project} />
        ) : (
          /* Links sit above the stretched card link (z-10). */
          <div className="relative z-10 mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
            {/* Same destination as the title link, which already makes the whole card
                clickable: kept for pointer users, skipped by keyboard and screen readers. */}
            <Link
              href={href}
              tabIndex={-1}
              aria-hidden
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
            >
              {t.projects.details}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <ExternalLinks project={project} />
          </div>
        )}
      </div>
    </article>
  );
}

function ExternalLinks({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <>
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
          <GithubIcon className="size-4" />
          {t.projects.code}
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
          <ExternalLink className="size-4" />
          {t.projects.demo}
        </a>
      )}
    </>
  );
}

/**
 * Collapsible "Description" panel for projects without a detail page
 * (`detail: "inline"`): shows `description` and `highlights` inside the card.
 * A native <button> with aria-expanded/aria-controls, so it works with the
 * keyboard (Enter/Space); the height animation is skipped with reduced motion.
 */
function InlineDetails({ project }: { project: Project }) {
  const { t } = useLanguage();
  const l = useLocalized();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const points = project.highlights ? l(project.highlights) : [];

  return (
    <div className="mt-auto pt-6 text-sm">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="-mx-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 font-medium text-primary transition-colors hover:text-fg"
        >
          {t.projects.description}
          <ChevronDown
            aria-hidden
            className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <ExternalLinks project={project} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 border-t border-line pt-4 leading-relaxed text-muted">
              {l(project.description).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {points.length > 0 && (
                <ul className="space-y-1.5 pt-1">
                  {points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-fg/90">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status, label }: { status: Project["status"]; label: string }) {
  const color = {
    completed: "bg-emerald-400",
    inProgress: "bg-amber-400",
    planned: "bg-muted",
  }[status];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 font-mono text-[11px] text-muted">
      <span className={`size-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

/** Rendered widths of the image area in each layout, for next/image `sizes`. */
export const imageSizes = {
  card: "(min-width: 1024px) 25rem, (min-width: 768px) 50vw, 100vw",
  featured: "(min-width: 1280px) 42rem, (min-width: 1024px) 55vw, 100vw",
  detail: "(min-width: 1024px) 64rem, 100vw",
};

export function ProjectImage({
  project,
  featured,
  placeholder,
  sizes = featured ? imageSizes.featured : imageSizes.card,
}: {
  project: Project;
  featured?: boolean;
  placeholder: string;
  sizes?: string;
}) {
  const l = useLocalized();
  const { image } = project;

  return (
    <div
      className={`relative overflow-hidden border-line bg-surface ${
        featured ? "aspect-video border-b lg:aspect-auto lg:min-h-[26rem] lg:border-r lg:border-b-0" : "aspect-video border-b"
      }`}
    >
      {image ? (
        <Image
          src={image}
          alt={project.imageAlt ? l(project.imageAlt) : l(project.title)}
          fill
          sizes={sizes}
          // Imported images carry a tiny blur preview; plain /public paths don't.
          placeholder={typeof image === "string" ? "empty" : "blur"}
          style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-3 bg-tech-grid text-muted">
          <Camera className={featured ? "size-8 text-primary/70" : "size-6 text-primary/60"} />
          <span className="font-mono text-[11px] uppercase tracking-widest">{placeholder}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
