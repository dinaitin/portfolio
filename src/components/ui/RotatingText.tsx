"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTextProps = {
  words: string[];
  interval?: number;
  className?: string;
};

/** Cycles through `words` with a vertical slide + blur transition. */
export function RotatingText({ words, interval = 2600, className = "" }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  const word = words[index % words.length];

  return (
    <>
      {/*
        Screen readers get the full list once instead of a word that keeps
        changing. It must live outside the styled span: a `background-clip: text`
        gradient there would paint through this visually hidden text too.
      */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1 inline-block w-[2px] animate-blink bg-primary" />
      </span>
    </>
  );
}
