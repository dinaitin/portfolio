"use client";

import { ArrowUp, Mail } from "lucide-react";
import { site } from "@/data/site";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row lg:px-8">
        <div className="text-center md:text-left">
          <p className="font-display text-sm font-semibold text-fg">
            © {year} {site.name}. <span className="font-normal text-muted">{t.footer.rights}</span>
          </p>
          <p className="mt-1 text-xs text-muted">{t.footer.builtWith}</p>
        </div>

        <div className="flex items-center gap-5 text-muted">
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="-m-2 inline-flex rounded-md p-2 transition-colors hover:text-primary">
              <LinkedinIcon className="size-4" />
            </a>
          )}
          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="-m-2 inline-flex rounded-md p-2 transition-colors hover:text-primary">
              <GithubIcon className="size-4" />
            </a>
          )}
          <a href={`mailto:${site.email}`} aria-label={t.contact.email} className="-m-2 inline-flex rounded-md p-2 transition-colors hover:text-primary">
            <Mail className="size-4" />
          </a>
          <span aria-hidden className="h-4 w-px bg-line-strong" />
          <Link
            href="/#top"
            className="group -my-2 inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:text-primary"
          >
            {t.footer.backToTop}
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
