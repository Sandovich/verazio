import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.08, duration: 0.5, ease: EASE },
  }),
};

const CASES = [
  {
    n: "01",
    slug: "prisma",
    name: "Prisma",
    tag: "Creative collective",
    problem:
      "A visual-artists collective's site read like every other portfolio template — hero, grid, footer — with nothing that proved craft.",
    approach:
      "Scroll-linked letter reveals, video-native feature cards, and a giant type-led hero that treats the wordmark itself as the visual.",
    result: "Scroll-linked reveal, zero layout shift",
  },
  {
    n: "02",
    slug: "lumina",
    name: "Lumina",
    tag: "Editorial footer system",
    problem:
      "A content-heavy site needed a footer substantial enough to act as a second homepage, without it turning into link soup.",
    approach:
      "Built the liquid-glass footer as its own composable pattern — reusable across page types, not a one-off.",
    result: "Liquid-glass UI kit, reusable across pages",
  },
  {
    n: "03",
    slug: "vibrant-wellness",
    name: "Vibrant Wellness",
    tag: "Wellness clinic",
    problem:
      "Booking a consultation felt clinical and cold — the opposite of what a holistic wellness brand should feel like.",
    approach:
      "Liquid-glass badges, a real human avatar strip, and a single-scroll path from hero straight to \"Begin Your Journey.\"",
    result: "Sub-60s booking flow from hero to form",
  },
  {
    n: "04",
    slug: "cadence",
    name: "Cadence",
    tag: "Dev-tools SaaS",
    problem:
      "Uptime dashboards tell you the system didn't break — they don't tell you whether the team is actually shipping, which is the number engineering leads actually want at standup.",
    approach:
      "A 52-week deploy heatmap and a traced deploy timeline instead of another vanity-metric widget, in a dark dev-tool register most of Verazio's other work deliberately isn't in.",
    result: "52-week deploy heatmap, zero fabricated data",
  },
  {
    n: "05",
    slug: "kessler",
    name: "Kessler",
    tag: "Independent strategist",
    problem:
      "A solo consultant's site has to carry a personal pitch, a work history, and writing samples on one page without turning into an endless scroll that buries the actual ask.",
    approach:
      "A sticky sidebar keeps the pitch and the CTA in view while the content scrolls independently — pitch stays fixed, proof does the scrolling.",
    result: "Sticky-sidebar layout, zero scroll-jank on handoff",
  },
  {
    n: "06",
    slug: "devfolio",
    name: "Rae Calder",
    tag: "Developer portfolio",
    problem:
      "A developer's personal site needed to read as confident and technical at a glance, without leaning on the same soft gradients and card grids every other portfolio uses.",
    approach:
      "A brutalist, high-contrast system instead — layered dash typography, a monospace rule grid, and a plain numbered project index in place of icon-and-card tiles.",
    result: "Brutalist type system, zero dead links",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header animate={false} />

      <section className="px-5 sm:px-8 md:px-12 pt-16 pb-12 md:pt-24 md:pb-20">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs md:text-sm font-semibold tracking-widest uppercase text-accent mb-3"
        >
          Portfolio
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-semibold uppercase leading-[0.95]"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          Problem. Approach. Result.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-sm md:text-base normal-case tracking-normal font-medium text-black/60 max-w-xl"
        >
          Every case here is read the same way a brief is: what was broken,
          what we built, what changed. All six are concept work — built by
          Verazio to demonstrate range, not delivered for a paying client.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32">
        <div className="divide-y divide-black/10 border-t border-black/10">
          {CASES.map((c, i) => (
            <motion.div
              key={c.n}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
            >
            <Link
              to={`/portfolio/${c.slug}`}
              className="group block py-10 md:py-14"
            >
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs md:text-sm font-semibold text-accent">
                    {c.n}
                  </span>
                  <h2 className="font-semibold uppercase text-2xl md:text-4xl flex items-center gap-2">
                    {c.name}
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                </div>
                <span className="hidden sm:block text-[10px] md:text-xs font-semibold tracking-widest uppercase text-black/40">
                  {c.tag}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 md:gap-8 pl-0 md:pl-10">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-1">
                    Problem
                  </p>
                  <p className="text-sm normal-case tracking-normal font-medium text-black/70 leading-relaxed">
                    {c.problem}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-1">
                    Approach
                  </p>
                  <p className="text-sm normal-case tracking-normal font-medium text-black/70 leading-relaxed">
                    {c.approach}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-1">
                    Result
                  </p>
                  <p className="text-sm font-semibold tracking-widest uppercase text-accent">
                    {c.result}
                  </p>
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10 bg-black text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2
            className="font-semibold uppercase leading-[0.95]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Want to be case 07?
          </h2>
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-accent text-white font-semibold uppercase tracking-widest text-sm px-6 py-3"
          >
            Start a brief
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
