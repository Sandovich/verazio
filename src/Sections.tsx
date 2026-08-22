import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Globe, Rocket, Presentation } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.08, duration: 0.6, ease: EASE },
  }),
};

function Reveal({
  children,
  custom = 0,
  className = "",
}: {
  children: React.ReactNode;
  custom?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SERVICES = [
  {
    n: "01",
    title: "Websites",
    body: "Full business websites, built around how your buyers actually decide. A template is built around nobody's. We treat information architecture, copy, and design as one system, so the site does the job a strong marketing hire would do: qualify visitors, explain the offer clearly, move them to a call or a cart.",
    meta: "Delivered in 1–3 weeks",
    icon: Globe,
  },
  {
    n: "02",
    title: "Landing Pages",
    body: "Pages built for a specific campaign, launch, or market entry — made to convert first and photograph well second. Each one is scoped around a single goal, which means you can run several in parallel across markets or offers without waiting on a full site rebuild.",
    meta: "Scoped per campaign",
    icon: Rocket,
  },
  {
    n: "03",
    title: "Digital Sales Assets",
    body: "Decks and presentations for the moments that actually close deals — investor pitches, sales meetings, partner proposals. We build the narrative and the design as one piece of work, so the deck argues your case instead of just decorating it.",
    meta: "Made for the room it's presented in, not for a slide library",
    icon: Presentation,
  },
];

const STACK = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Vite",
  "AI-native workflow",
];

function StackMarquee() {
  return (
    <div className="border-t border-black/10 py-5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
            {STACK.map((item, i) => (
              <span
                key={`${copy}-${item}-${i}`}
                className="flex items-center text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40 px-6 whitespace-nowrap"
              >
                {item}
                <span className="ml-6 text-accent">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessRail() {
  // The connecting line itself can't be the element IntersectionObserver
  // watches: it starts at scaleX(0), i.e. zero visual area, so it can never
  // register as "intersecting" and the draw-in animation would never fire.
  // Watch this stable, untransformed wrapper instead and drive the bar from
  // that boolean.
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(railRef, { once: true, margin: "-80px" });

  return (
    <div
      ref={railRef}
      className="hidden md:grid grid-cols-4 gap-6 h-10 relative mb-5"
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-black/10">
        <motion.div
          className="h-full bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        />
      </div>
      {PROCESS.map((p) => (
        <div
          key={p.n}
          className="w-10 h-10 rounded-full border border-accent bg-white text-accent flex items-center justify-center text-xs font-semibold relative z-10"
        >
          {p.n}
        </div>
      ))}
    </div>
  );
}

function SpotlightCard({
  s,
  i,
}: {
  s: (typeof SERVICES)[number];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  return (
    <Reveal custom={i + 1}>
      <div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          setPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            active: true,
          });
        }}
        onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
        className="group relative h-full border border-black/10 p-6 md:p-8 overflow-hidden transition-colors hover:border-accent/40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, rgba(94,14,215,0.08), transparent 70%)`,
          }}
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs md:text-sm font-semibold text-accent">
              {s.n}
            </span>
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors">
              <s.icon className="w-4 h-4" strokeWidth={1.75} />
            </div>
          </div>
          <h3
            className="font-semibold uppercase mb-3"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
          >
            {s.title}
          </h3>
          <p className="text-sm normal-case tracking-normal font-medium leading-relaxed text-black/70">
            {s.body}
          </p>
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mt-5">
            {s.meta}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

const PROCESS = [
  { n: "01", name: "Diagnose", input: "Business goal, buyer journey, current assets", output: "Scoped brief — one goal, one build path" },
  { n: "02", name: "Build", input: "Approved brief", output: "Live, working asset — 1 to 3 weeks" },
  { n: "03", name: "Measure", input: "Live asset, real traffic or room reactions", output: "A read on what's converting and what isn't" },
  { n: "04", name: "Iterate", input: "Measurement read", output: "A targeted revision, scoped tighter than a full rebuild" },
];

const WORK = [
  {
    name: "Hôtel Cendre",
    tag: "Concept work — boutique hospitality",
    result: "+34% projected lift in direct bookings",
    href: "/verazio/demos/hotel-cendre.html",
  },
  {
    name: "Castellane Partners",
    tag: "Concept work — M&A / advisory",
    result: "2.5x projected lift in qualified leads",
    href: "/verazio/demos/castellane-partners.html",
  },
  {
    name: "Prisma",
    tag: "Concept work — creative collective",
    result: "Scroll-linked reveal, zero layout shift",
    href: "/verazio/demos/prisma/index.html",
  },
  {
    name: "Lumina",
    tag: "Concept work — editorial footer system",
    result: "Liquid-glass UI kit, reusable across pages",
    href: "/verazio/demos/lumina/index.html",
  },
  {
    name: "Vibrant Wellness",
    tag: "Concept work — wellness clinic",
    result: "Sub-60s booking flow from hero to form",
    href: "/verazio/demos/vibrant-wellness/index.html",
  },
];

export default function Sections() {
  return (
    <div className="bg-white text-black font-sans">
      <StackMarquee />

      {/* ABOUT */}
      <section id="about" className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16">
          <Reveal>
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-accent mb-3">
              About Verazio
            </p>
            <h2
              className="font-semibold uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              One job: assets that move the needle.
            </h2>
          </Reveal>
          <Reveal custom={1} className="space-y-5">
            <p className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed">
              Verazio was built for one job: giving growth-minded companies
              the digital assets that actually move the needle, the kind
              still doing its job long after the portfolio screenshot was
              taken.
            </p>
            <p className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70">
              We're an AI-native production team, which means we skip the
              parts of the traditional agency model that were never about
              quality in the first place — the account layers, the
              multi-week discovery decks, the six-figure retainers. What's
              left is senior judgment applied at the speed AI-driven work
              allows: 1 to 3 weeks from brief to a live, working asset, not
              the 6 to 12 weeks — or the €15,000–30,000 — you'd budget for a
              traditional agency.
            </p>
            <p className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70">
              We work across the growth spectrum of the European market:
              ambitious SMBs proving a new model who need to move fast, and
              larger, reputation-conscious companies who need results
              without the variance of a freelance marketplace. Either way,
              we're judged on the same thing you are — what the finished
              product does for the business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10">
        <Reveal className="flex items-baseline justify-between mb-12 md:mb-20">
          <h2
            className="font-semibold uppercase"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            What we build
          </h2>
          <span className="text-xs md:text-sm font-semibold tracking-widest text-black/50">
            01 / 03
          </span>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 border-t border-black/10 pt-6">
          {SERVICES.map((s, i) => (
            <SpotlightCard key={s.n} s={s} i={i} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10">
        <Reveal className="flex items-baseline justify-between mb-12 md:mb-20">
          <h2
            className="font-semibold uppercase"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            How we work
          </h2>
          <span className="text-xs md:text-sm font-semibold tracking-widest text-black/50">
            Diagnose → Build → Measure → Iterate
          </span>
        </Reveal>

        <div className="border-t border-black/10 pt-10 md:pt-12">
          <ProcessRail />

          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} custom={i + 1}>
                <div className="flex items-center gap-4 mb-3 md:hidden">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-accent bg-white text-accent flex items-center justify-center text-xs font-semibold">
                    {p.n}
                  </div>
                  <h3 className="font-semibold uppercase text-lg">{p.name}</h3>
                </div>
                <h3 className="hidden md:block font-semibold uppercase text-xl mb-5">
                  {p.name}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-1">
                      Input
                    </p>
                    <p className="text-sm normal-case tracking-normal font-medium text-black/70">
                      {p.input}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-1">
                      Output
                    </p>
                    <p className="text-sm normal-case tracking-normal font-medium text-black/70">
                      {p.output}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10">
        <Reveal className="flex items-baseline justify-between mb-12 md:mb-20">
          <h2
            className="font-semibold uppercase"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Work
          </h2>
          <Link
            to="/portfolio"
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-accent flex items-center gap-1"
          >
            Full portfolio <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WORK.map((w, i) => (
            <Reveal key={w.name} custom={i + 1}>
              <a
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="group block border border-black/10 hover:border-accent transition-colors p-6 md:p-8"
              >
                <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-4">
                  {w.tag}
                </p>
                <h3 className="font-semibold uppercase text-2xl md:text-3xl flex items-center gap-2">
                  {w.name}
                  <ArrowUpRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mt-4">
                  {w.result}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10 bg-black text-white">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <h2
              className="font-semibold uppercase leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Your site is either closing deals or costing you them.
            </h2>
            <p className="mt-6 text-sm md:text-base normal-case tracking-normal font-medium text-white/60 max-w-md">
              Tell us what you're building and where it needs to land. We'll
              scope the brief and tell you honestly whether 1–3 weeks is
              realistic for it.
            </p>
          </Reveal>
          <Reveal custom={1}>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const btn = (e.target as HTMLFormElement).querySelector(
                  "button"
                );
                if (btn) btn.textContent = "Brief received";
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Name"
                  className="bg-transparent border-b border-white/30 focus:border-accent outline-none py-2 text-sm normal-case tracking-normal font-medium placeholder:text-white/40"
                />
                <input
                  required
                  placeholder="Company"
                  className="bg-transparent border-b border-white/30 focus:border-accent outline-none py-2 text-sm normal-case tracking-normal font-medium placeholder:text-white/40"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Work email"
                className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none py-2 text-sm normal-case tracking-normal font-medium placeholder:text-white/40"
              />
              <input
                placeholder="What you need — website, landing page, sales deck…"
                className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none py-2 text-sm normal-case tracking-normal font-medium placeholder:text-white/40"
              />
              <textarea
                rows={3}
                placeholder="What's the goal, and by when?"
                className="w-full bg-transparent border-b border-white/30 focus:border-accent outline-none py-2 text-sm normal-case tracking-normal font-medium placeholder:text-white/40 resize-none"
              />
              <button
                type="submit"
                className="mt-2 bg-accent text-white font-semibold uppercase tracking-widest text-sm px-6 py-3"
              >
                Send the brief
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
