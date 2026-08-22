import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
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

const ROLES = [
  {
    title: "Full-Stack Developer",
    body: "Comfortable owning a build end to end — framework choice through deployment — not just shipping components against someone else's architecture.",
  },
  {
    title: "Frontend / Motion Developer",
    body: "The kind of person who notices when an interaction is 80% right and won't ship it until it's actually right.",
  },
  {
    title: "AI & Automation Engineer",
    body: "Builds the tooling that makes a 1-to-3-week timeline possible — not just a user of AI tools, someone who wires them into a real production pipeline.",
  },
  {
    title: "UI/UX Designer",
    body: "Can defend a layout decision with a reason, not a trend — and knows the difference between a bold design and a generic 'AI-default' one.",
  },
];

export default function Careers() {
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
          Careers
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-semibold uppercase leading-[0.95]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          Not hiring on
          <br />
          a schedule.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-sm md:text-base normal-case tracking-normal font-medium text-black/60 max-w-xl"
        >
          We're a small studio, not a pipeline of open reqs. We're not
          actively recruiting against a headcount plan right now — but if
          you're genuinely strong at one of the things below, we'd rather
          hear from you before we need you than after.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32 border-t border-black/10 pt-16 md:pt-20">
        <Reveal className="mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40">
            Roles we'd always make time for
          </p>
        </Reveal>

        <div className="divide-y divide-black/10 border-t border-black/10">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} custom={i + 1}>
              <div className="grid md:grid-cols-[1fr_1.6fr] gap-3 md:gap-8 py-8 md:py-10 items-baseline">
                <h3 className="font-semibold uppercase text-lg md:text-xl">
                  {r.title}
                </h3>
                <p className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10 bg-black text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2
              className="font-semibold uppercase leading-[0.95] mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Send us what you've built.
            </h2>
            <p className="text-sm md:text-base normal-case tracking-normal font-medium text-white/60 max-w-md">
              A portfolio or a GitHub link tells us more than a cover
              letter. Send both if you've got them.
            </p>
          </div>
          <a
            href="mailto:careers@verazio.com"
            className="flex items-center gap-2 bg-accent text-white font-semibold uppercase tracking-widest text-sm px-6 py-3 shrink-0"
          >
            <Mail className="w-4 h-4" />
            careers@verazio.com
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
