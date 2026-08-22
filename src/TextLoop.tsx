import { useEffect, useState } from "react";

// A from-scratch reimplementation of the "static text + rotating word,
// typewriter reveal, gradient fill" mechanic (the pattern behind things
// like 21st.dev's community "text-loop" component) — no code copied, just
// the same three-part behavior: type forward, hold, delete, move to the
// next word in the list, loop.
export function TextLoop({
  items,
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseMs = 1400,
  className = "",
}: {
  items: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  useEffect(() => {
    const current = items[index % items.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 0);
      return () => clearTimeout(t);
    }

    // deleting
    if (text.length > 0) {
      const t = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deletingSpeed
      );
      return () => clearTimeout(t);
    }
    setIndex((i) => (i + 1) % items.length);
    setPhase("typing");
  }, [text, phase, index, items, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span
      className={`bg-gradient-to-r from-accent to-fuchsia-500 bg-clip-text text-transparent ${className}`}
    >
      {text}
      <span className="inline-block w-[2px] h-[0.85em] bg-accent ml-1 align-middle animate-pulse" />
    </span>
  );
}
