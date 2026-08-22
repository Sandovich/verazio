export default function Footer() {
  return (
    <footer className="px-5 sm:px-8 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-semibold tracking-widest uppercase text-black/50 font-sans">
      <span>© 2026 Verazio</span>
      <span className="italic normal-case tracking-normal font-medium">
        Effective by design, good-looking as a consequence.
      </span>
      <a href="/ai-ethics" className="hover:text-accent">
        AI Ethics &amp; Compliance
      </a>
    </footer>
  );
}
