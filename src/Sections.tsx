import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
  },
  {
    n: "02",
    title: "Landing Pages",
    body: "Pages built for a specific campaign, launch, or market entry — made to convert first and photograph well second. Each one is scoped around a single goal, which means you can run several in parallel across markets or offers without waiting on a full site rebuild.",
    meta: "Scoped per campaign",
  },
  {
    n: "03",
    title: "Digital Sales Assets",
    body: "Decks and presentations for the moments that actually close deals — investor pitches, sales meetings, partner proposals. We build the narrative and the design as one piece of work, so the deck argues your case instead of just decorating it.",
    meta: "Made for the room it's presented in, not for a slide library",
  },
];

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

        <div className="divide-y divide-black/10 border-t border-black/10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} custom={i + 1}>
              <div className="grid md:grid-cols-[80px_1fr_2fr] gap-3 md:gap-8 py-8 md:py-10 items-baseline">
                <span className="text-xs md:text-sm font-semibold text-accent">
                  {s.n}
                </span>
                <h3
                  className="font-semibold uppercase"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
                >
                  {s.title}
                </h3>
                <div>
                  <p className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70">
                    {s.body}
                  </p>
                  <p className="text-xs font-semibold tracking-widest uppercase text-accent mt-3">
                    {s.meta}
                  </p>
                </div>
              </div>
            </Reveal>
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

        <div className="divide-y divide-black/10 border-t border-black/10">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} custom={i + 1}>
              <div className="grid md:grid-cols-[80px_180px_1fr_1fr] gap-3 md:gap-8 py-8 items-baseline">
                <span className="text-xs md:text-sm font-semibold text-accent">
                  {p.n}
                </span>
                <h3 className="font-semibold uppercase text-lg md:text-xl">
                  {p.name}
                </h3>
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
