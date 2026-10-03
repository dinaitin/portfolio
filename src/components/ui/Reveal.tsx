"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
  delay?: number;
  /** Vertical offset (px) the element travels while fading in. */
  y?: number;
};

/** Fades and slides its children in the first time they enter the viewport. */
export function Reveal({ as = "div", delay = 0, y = 24, children, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = (as === "li" ? motion.li : motion.div) as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
