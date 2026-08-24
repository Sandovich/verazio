import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

// Deterministic hash-based pseudo-random in [0, 1). Math.random() would hand
// every character a fresh trajectory on each re-render — the line would
// visibly re-shuffle mid-scroll — so the flight path is derived from the
// character's index instead and stays identical for the life of the page.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type ScatterItemProps = {
  /** 0 → 1 scroll progress that drives the break-up. */
  progress: MotionValue<number>;
  seed: number;
  /** Position along the line, -1 (first character) → 1 (last). */
  bias?: number;
  /** Index along the line; only its parity is used, to stagger the lift. */
  index?: number;
  /** Travel budget, in vw. */
  spread?: number;
  className?: string;
  children: ReactNode;
};

/**
 * One flying fragment. Transform-only (no layout properties), so the text keeps
 * occupying exactly the box it did before — nothing below it shifts.
 */
export function ScatterItem({
  progress,
  seed,
  bias = 0,
  index = 0,
  spread = 16,
  className = "",
  children,
}: ScatterItemProps) {
  // Fragments explode outward from the middle of the line rather than in fully
  // random directions: pure randomness lets neighbouring letters converge on
  // the same spot and pile into unreadable clumps. The centre of the explosion
  // sits right of the true middle because this headline is flush right — that
  // sends most of the line into the open space on its left instead of straight
  // off the edge of the frame.
  const dx = (bias - 0.8) * spread + (rand(seed) * 2 - 1) * spread * 0.16;
  // Vertical drift is biased upward: the hero clips its own overflow, so a
  // fragment falling far enough gets sliced off against the hero's bottom edge
  // along a hard horizontal line; drifting up, it leaves through open space.
  // The alternating lift puts neighbours on different vertical tracks, so a
  // horizontal near-miss doesn't become an overlap.
  const dy = -(0.22 + rand(seed + 17.3) * 0.4 + (index % 2 ? 0 : 0.42)) * spread * 1.3;
  // Spin follows the direction of travel — a fragment thrown left turns
  // counter-clockwise — which reads as physics rather than as noise.
  const rot = dx * 2.4 + (rand(seed + 91.7) * 2 - 1) * 16;
  // Each fragment finishes its flight at a slightly different scroll offset, so
  // the line comes apart unevenly instead of every letter moving in lockstep.
  const end = 0.38 + rand(seed + 5.1) * 0.34;

  const x = useTransform(progress, [0, end], ["0vw", `${dx.toFixed(2)}vw`]);
  const y = useTransform(progress, [0, end], ["0vh", `${dy.toFixed(2)}vh`]);
  const rotate = useTransform(progress, [0, end], [0, rot]);
  // Fragments stay fully opaque through the break-up itself and only dissolve
  // once the hero is nearly gone — otherwise they'd meet the hero's clip edge
  // at full strength and vanish along a straight line.
  const opacity = useTransform(progress, [0.78, 0.98], [1, 0]);

  return (
    <motion.span
      aria-hidden="true"
      style={{ x, y, rotate, opacity, willChange: "transform" }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

type ScatterTextProps = {
  text: string;
  progress: MotionValue<number>;
  seed?: number;
  spread?: number;
  className?: string;
};

/**
 * Renders `text` as per-character fragments that come apart as the reader
 * scrolls. Falls back to plain text under prefers-reduced-motion.
 */
export function ScatterText({
  text,
  progress,
  seed = 0,
  spread,
  className = "",
}: ScatterTextProps) {
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{text}</span>;

  const chars = text.split("");
  const last = Math.max(chars.length - 1, 1);

  return (
    <span className={className}>
      {/* Every fragment is aria-hidden, so assistive tech never spells the line
          out letter by letter. The accessible name comes from an aria-label on
          the owning element (the <h1>, the <a>) — deliberately not from a
          visually-hidden copy of the string, which would leave the text
          duplicated in the DOM for anything reading rendered text. */}
      {chars.map((char, i) =>
        char === " " ? (
          <span key={`${char}-${i}`} aria-hidden="true">
            {"\u00A0"}
          </span>
        ) : (
          <ScatterItem
            key={`${char}-${i}`}
            progress={progress}
            seed={seed + i * 13.37}
            bias={(i / last) * 2 - 1}
            index={i}
            spread={spread}
          >
            {char}
          </ScatterItem>
        )
      )}
    </span>
  );
}
