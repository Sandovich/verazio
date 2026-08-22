import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function NumberTicker({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 90 });

  // This only ever renders inside the hero, above the fold on every
  // viewport — no scroll-triggered useInView gate here, since a tight
  // mobile flex row (three stats squeezed under justify-end) can put the
  // last item's box right at the intersection-root edge and leave it
  // permanently "not in view" while its siblings animate fine.
  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Math.round(latest)
          );
        }
      }),
    [springValue]
  );

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
