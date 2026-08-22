export function BorderBeam({
  duration = 7,
  delay = 0,
  className = "",
}: {
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-2xl overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 border-beam-spin"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, transparent 82%, var(--color-accent, #7c3aed) 92%, #fff 96%, var(--color-accent, #7c3aed) 100%)",
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
      <div className="absolute inset-[1.5px] rounded-[calc(1rem-1.5px)] bg-white" />
    </div>
  );
}
