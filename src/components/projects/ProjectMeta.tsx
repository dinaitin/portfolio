"use client";

import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

/** Technologies and external links of a project. */
export function ProjectMeta({ project, className = "space-y-8" }: { project: Project; className?: string }) {
  const { t } = useLanguage();
  const hasLinks = Boolean(project.github || project.demo);

  return (
    <aside className={className}>
      <div>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{t.projects.technologies}</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} accent="cyan">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{t.projects.links}</h2>
        {hasLinks ? (
          <div className="flex flex-col gap-3">
            {project.github && (
              <ButtonLink href={project.github} target="_blank" rel="noreferrer" variant="secondary">
                <GithubIcon className="size-4" />
                {t.projects.code}
              </ButtonLink>
            )}
            {project.demo && (
              <ButtonLink href={project.demo} target="_blank" rel="noreferrer" variant="secondary">
                <ExternalLink className="size-4" />
                {t.projects.demo}
              </ButtonLink>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">{t.projects.noLinks}</p>
        )}
      </div>
    </aside>
  );
}
