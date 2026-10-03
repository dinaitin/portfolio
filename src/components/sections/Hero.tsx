"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ButtonLink, IconLink } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { RotatingText } from "@/components/ui/RotatingText";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden pt-24 pb-16 lg:pt-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        {/* Text column */}
        <div>
          <motion.p {...fadeUp(0.1)} className="mb-4 flex items-center gap-3 font-mono text-sm text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.92] font-bold tracking-tight"
          >
            <span className="block text-gradient">DAVID</span>
            <span className="block text-gradient">SÁNCHEZ</span>
          </motion.h1>

          <motion.div
            {...fadeUp(0.35)}
            className="mt-6 flex items-center gap-3 font-display text-lg text-fg min-[375px]:text-xl sm:text-2xl md:text-3xl"
          >
            <span className="font-mono text-primary">&gt;</span>
            <RotatingText words={t.hero.roles} className="text-gradient-accent font-medium" />
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="mt-6 max-w-xl text-base leading-relaxed text-muted lg:max-w-[38rem]">
            {t.hero.description}
          </motion.p>

          <motion.ul {...fadeUp(0.55)} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {t.hero.location}
            </li>
            <li className="flex items-center gap-2">
              <Briefcase className="size-4 text-secondary" />
              {t.hero.workModes}
            </li>
          </motion.ul>

          <motion.div {...fadeUp(0.65)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <ButtonLink href="#projects">
              {t.hero.viewProjects}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={site.cv} download variant="secondary">
              <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
              {t.hero.downloadCv}
            </ButtonLink>
            <div className="flex items-center gap-3 sm:ml-2">
              {site.linkedin && (
                <IconLink href={site.linkedin} target="_blank" rel="noopener noreferrer" label="LinkedIn">
                  <LinkedinIcon className="size-4" />
                </IconLink>
              )}
              {site.github && (
                <IconLink href={site.github} target="_blank" rel="noopener noreferrer" label="GitHub">
                  <GithubIcon className="size-4" />
                </IconLink>
              )}
              <IconLink href={`mailto:${site.email}`} label="Email">
                <Mail className="size-4" />
              </IconLink>
            </div>
          </motion.div>
        </div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="mx-auto w-full max-w-[18rem] sm:max-w-sm lg:max-w-md"
        >
          <PhotoFrame />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-primary lg:flex"
      >
        {t.hero.scroll}
        <span className="h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="block h-4 w-px bg-primary"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}

function PhotoFrame() {
  return (
    <div className="relative aspect-[4/5] w-full">
      {/* Glow behind the frame */}
      <div className="absolute -inset-6 rounded-[2rem] bg-linear-to-br from-primary/25 via-transparent to-secondary/25 blur-3xl" />

      <div className="relative size-full overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface">
        {/*
          The source is a full-body portrait (≈9:16). object-cover keeps its
          proportions; the scale + origin crop it to a chest-up framing with
          the face centred in the upper third of the 4:5 frame. Because the
          frame ratio is fixed, the crop is identical on every breakpoint.
        */}
        <Image
          src={site.photo}
          alt={site.name}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) 56rem, (min-width: 640px) 48rem, 36rem"
          className="origin-[50%_8%] scale-[2] object-cover object-top brightness-[1.02]"
        />
        {/* Cool tint so the white studio background blends with the dark palette */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-secondary/15 mix-blend-multiply" />
        {/* Vignette + fade into the page background */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgb(5_7_11/0.35)]" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/70 via-bg/0 via-25% to-transparent" />
      </div>

      {/* Corner brackets */}
      {[
        "top-0 left-0 border-t-2 border-l-2 rounded-tl-[1.75rem]",
        "top-0 right-0 border-t-2 border-r-2 rounded-tr-[1.75rem]",
        "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[1.75rem]",
        "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[1.75rem]",
      ].map((position) => (
        <span key={position} className={`pointer-events-none absolute size-10 border-primary/70 ${position}`} />
      ))}

      {/* Floating status chips */}
      <div className="absolute -left-4 top-10 hidden animate-float items-center gap-2 rounded-full border border-line-strong bg-bg/80 px-3 py-1.5 font-mono text-[11px] text-fg backdrop-blur sm:flex">
        <span className="size-1.5 rounded-full bg-primary" />
        UAV · LoRa
      </div>
      <div className="absolute -right-4 bottom-16 hidden animate-float items-center gap-2 rounded-full border border-line-strong bg-bg/80 px-3 py-1.5 font-mono text-[11px] text-fg backdrop-blur [animation-delay:-3s] sm:flex">
        <span className="size-1.5 rounded-full bg-secondary" />
        AI · Networks · Security
      </div>
    </div>
  );
}
