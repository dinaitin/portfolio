import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

// Canonical is set per page (not in the root layout) so project pages don't inherit "/".
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </SiteShell>
  );
}
