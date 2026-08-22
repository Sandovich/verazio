import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-5 sm:px-8 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-semibold tracking-widest uppercase text-black/50 font-sans">
      <span>© 2026 Verazio</span>
      <span className="italic normal-case tracking-normal font-medium order-first md:order-none">
        Effective by design, good-looking as a consequence.
      </span>
      <div className="flex items-center gap-6">
        <Link to="/journal" className="hover:text-accent">
          Journal
        </Link>
        <Link to="/careers" className="hover:text-accent">
          Careers
        </Link>
        <Link to="/contact" className="hover:text-accent">
          Contact
        </Link>
        <Link to="/ai-ethics" className="hover:text-accent">
          AI Ethics &amp; Compliance
        </Link>
      </div>
    </footer>
  );
}
