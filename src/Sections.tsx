import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Globe, Rocket, Presentation, Plus, Check } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { LiquidMetalButton } from "./LiquidMetalButton";
import { TextLoop } from "./TextLoop";
import { BorderBeam } from "./BorderBeam";

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
    capabilities: [
      "Multi-page architecture mapped to the actual buyer journey",
      "CMS wiring so you can update content without calling us",
      "SEO fundamentals built in, not bolted on after launch",
      "Custom motion and interaction, not a page-builder template",
    ],
  },
  {
    n: "02",
    title: "Landing Pages",
    body: "Pages built for a specific campaign, launch, or market entry — made to convert first and photograph well second. Each one is scoped around a single goal, which means you can run several in parallel across markets or offers without waiting on a full site rebuild.",
    meta: "Scoped per campaign",
    icon: Rocket,
    capabilities: [
      "Single-goal structure, scoped to one offer or campaign",
      "Variant builds ready for message or offer A/B testing",
      "Analytics and conversion tracking wired in from day one",
      "Fast enough to run several in parallel across markets",
    ],
  },
  {
    n: "03",
    title: "Digital Sales Assets",
    body: "Decks and presentations for the moments that actually close deals — investor pitches, sales meetings, partner proposals. We build the narrative and the design as one piece of work, so the deck argues your case instead of just decorating it.",
    meta: "Made for the room it's presented in, not for a slide library",
    icon: Presentation,
    capabilities: [
      "Investor decks, sales decks, and partner proposals",
      "Narrative structure built alongside the visual design",
      "Print-ready and on-screen presentation versions",
      "Data visualization that argues the point, not just displays it",
    ],
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
          <ul className="mt-5 space-y-2.5 border-t border-black/10 pt-5">
            {s.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-xs normal-case tracking-normal font-medium text-black/70">
                <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" strokeWidth={2.25} />
                {c}
              </li>
            ))}
          </ul>
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
    name: "Prisma",
    tag: "Concept work — creative collective",
    result: "Scroll-linked reveal, zero layout shift",
    href: "/verazio/demos/prisma/index.html",
    image: "/verazio/case-studies/prisma-hero.jpg",
  },
  {
    name: "Lumina",
    tag: "Concept work — editorial footer system",
    result: "Liquid-glass UI kit, reusable across pages",
    href: "/verazio/demos/lumina/index.html",
    image: "/verazio/case-studies/lumina-hero.jpg",
  },
  {
    name: "Vibrant Wellness",
    tag: "Concept work — wellness clinic",
    result: "Sub-60s booking flow from hero to form",
    href: "/verazio/demos/vibrant-wellness/index.html",
    image: "/verazio/case-studies/vibrant-wellness-hero.jpg",
  },
  {
    name: "Cadence",
    tag: "Concept work — dev-tools SaaS",
    result: "52-week deploy heatmap, zero fabricated data",
    href: "/verazio/demos/cadence/index.html",
    image: "/verazio/case-studies/cadence-hero.jpg",
  },
  {
    name: "Kessler",
    tag: "Concept work — independent strategist",
    result: "Sticky-sidebar layout, zero scroll-jank on handoff",
    href: "/verazio/demos/kessler/index.html",
    image: "/verazio/case-studies/kessler-hero.jpg",
  },
];

const FAQ = [
  {
    q: "How long does a project actually take?",
    a: "Most websites: 1 to 3 weeks from an approved brief to a live asset. Landing pages usually land at the shorter end of that; a heavier multi-page site or one with custom interactions can run longer — we'll tell you which before you commit, not after.",
  },
  {
    q: "What does the process look like, step by step?",
    a: "Diagnose, Build, Measure, Iterate — the same four steps in the \"How we work\" section above, not marketing language for something looser. Diagnose ends with a scoped brief you approve before any building starts. Build ends with a live, working asset. Nothing ships without you seeing it first.",
  },
  {
    q: "How many rounds of revisions are included?",
    a: "Two structured revision rounds are built into every project by default — you'll see a live draft, give one consolidated pass of feedback, see the update, and confirm. Larger changes in scope (a new section, a different structure) are handled as a separate scoped addition, not squeezed into a \"revision.\"",
  },
  {
    q: "Who owns the site and the files once it's done?",
    a: "You do — full transfer of the final code, assets, and any custom components on delivery. There's no ongoing license fee to keep using what we built you, and no dependency on us remaining your host or dev team unless you want that.",
  },
  {
    q: "What determines the price?",
    a: "Scope, not hours: number of pages/sections, how custom the interactions are, and whether copy and content strategy are part of the brief or supplied by you. You get a fixed quote after the Diagnose step, before Build starts — no open-ended retainer, no surprise invoice at the end.",
  },
  {
    q: "Is this just AI-generated, or does a person actually work on it?",
    a: "A senior person owns your brief end to end — the same one from the first call through delivery. AI is what makes the 1-to-3-week timeline possible; it isn't what makes the decisions. Every layout, every line of copy, every interaction gets a human judgment call before it ships.",
  },
  {
    q: "The portfolio says \"concept work\" — have you shipped for real clients?",
    a: "We're a newly formed studio, and we're not going to dress that up: the cases in our portfolio are concept builds we made ourselves to show range and craft, not client deliverables — each one says so on the page. What you're evaluating is the actual capability behind them, at full quality, before a single client brief has touched it.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes, scoped the same way everything else is: a fixed-price maintenance window if you want us on call for the first month or two after launch, or pay-as-you-go for specific changes later. Nothing recurring you didn't explicitly sign up for.",
  },
];

function FAQItem({ item, i }: { item: (typeof FAQ)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal custom={i}>
      <div className="border-b border-black/10">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left"
        >
          <span className="font-semibold uppercase text-base md:text-lg">
            {item.q}
          </span>
          <Plus
            className="w-5 h-5 shrink-0 text-accent transition-transform duration-300"
            style={{ transform: open ? "rotate(45deg)" : "none" }}
          />
        </button>
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <p className="pb-6 md:pb-7 max-w-2xl text-sm normal-case tracking-normal font-medium leading-relaxed text-black/70">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

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
            <p className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70">
              "AI-native" doesn't mean a prompt and a export. AI changes how
              fast a senior team can move — it doesn't replace the judgment
              that decides what to build, why a page is laid out the way it
              is, or when a generated asset isn't good enough to ship. Every
              brief still gets a human decision-maker end to end; AI is the
              part of the pipeline that used to cost you weeks, not the part
              that used to require someone who knew what they were doing.
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
            What we build: <TextLoop items={SERVICES.map((s) => s.title)} />
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
                <div className="relative rounded-2xl border border-black/10 p-5 md:p-6 h-full overflow-hidden">
                  <BorderBeam duration={9} delay={i * 1.4} />
                  <div className="relative">
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
                className="group block border border-black/10 hover:border-accent transition-colors"
              >
                <div className="overflow-hidden border-b border-black/10">
                  <img
                    src={w.image}
                    alt={`${w.name} — live build screenshot`}
                    className="w-full h-44 md:h-52 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8">
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
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10">
        <Reveal className="mb-12 md:mb-20">
          <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-accent mb-3">
            FAQ
          </p>
          <h2
            className="font-semibold uppercase leading-[0.95]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Questions worth answering upfront.
          </h2>
        </Reveal>

        <div className="border-t border-black/10">
          {FAQ.map((item, i) => (
            <FAQItem key={item.q} item={item} i={i} />
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
            <div className="mt-8">
              <LiquidMetalButton
                label="Talk to us directly"
                onClick={() => {
                  window.location.href = "mailto:hello@verazio.com";
                }}
              />
            </div>
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
