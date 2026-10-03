import type { ReactNode } from "react";
import { Background } from "./Background";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SkipLink } from "./SkipLink";

/** Common page chrome: background, fixed navbar and footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Background />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
