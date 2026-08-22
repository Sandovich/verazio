import { motion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LiquidMetalButton } from "./LiquidMetalButton";

const MotionLink = motion.create(Link);

// `hidden md:flex` only hides the shader nav visually — React still mounts
// every LiquidMetalButton underneath it, and each one opens its own WebGL
// context. On mobile that's 6 contexts doing real GPU/battery work for
// buttons nobody can even see. Gate the mount itself on viewport width so
// mobile never creates them at all, not just hides them.
function useIsDesktopNav() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5, ease: EASE },
  }),
};

const NAV_LINKS = [
  { label: "Story", href: "/#about" },
  { label: "Expertise", href: "/#services" },
  { label: "Studios", href: "/#work" },
  { label: "FAQ", href: "/#faq" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center ${className}`}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-accent" />
    </div>
  );
}

export default function Header({ animate = true }: { animate?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isDesktopNav = useIsDesktopNav();
  const initialState = animate ? "hidden" : false;

  return (
    <>
      <nav className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6 font-sans uppercase tracking-widest font-semibold text-black">
        <MotionLink
          to="/"
          variants={fadeDown}
          initial={initialState}
          animate="visible"
          custom={0}
        >
          <Logo />
        </MotionLink>

        {/* Desktop only — LiquidMetalButton mounts a WebGL context per
            instance, six of which is real weight on a mobile GPU/battery.
            Mobile keeps the plain-text menu below instead. */}
        <div className="hidden md:flex items-center gap-3">
          {isDesktopNav &&
            NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                variants={fadeDown}
                initial={initialState}
                animate="visible"
                custom={i + 1}
              >
                <LiquidMetalButton
                  label={link.label}
                  compact
                  onClick={() => navigate(link.href)}
                />
              </motion.div>
            ))}
        </div>

        <motion.button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          variants={fadeDown}
          initial={initialState}
          animate="visible"
          custom={5}
          className="w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1"
        >
          <span className="w-4 h-0.5 bg-white" />
          <span className="w-4 h-0.5 bg-white" />
          <span className="w-4 h-0.5 bg-white" />
        </motion.button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col px-5 sm:px-8 pt-5 pb-8 font-sans uppercase tracking-widest font-semibold">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-black flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-8 mt-16">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-3xl font-semibold tracking-widest uppercase text-black"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-auto flex items-center gap-2 text-xl font-semibold text-accent uppercase tracking-widest"
          >
            Work With Us
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </>
  );
}
