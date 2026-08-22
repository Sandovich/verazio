import { motion, type Variants } from "framer-motion";
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

const FOUNDERS = [
  {
    name: "Yana",
    role: "Co-Founder & Creative Director",
    focus:
      "The instinct behind every brief. If a build doesn't feel right, she's the one who says so before it ships, not after.",
  },
  {
    name: "Veronika",
    role: "Co-Founder & Client Lead",
    focus:
      "The person you'll actually talk to. Keeps every project honest about scope, timeline, and what's realistic before it becomes a problem.",
  },
];

const PRODUCTION = [
  {
    name: "Alexander",
    role: "Lead Developer",
    focus:
      "Turns an approved brief into working code fast enough that \"1 to 3 weeks\" is a schedule, not a marketing line.",
  },
  {
    name: "Kamila",
    role: "Frontend Developer",
    focus:
      "Builds the difference between a site that works and one that feels alive — the motion and interaction most studios skip.",
  },
  {
    name: "Nikolai",
    role: "AI & Automation Engineer",
    focus:
      "Builds the machinery behind the machinery — the AI tooling that lets the rest of the team move at speed without cutting corners.",
  },
  {
    name: "Ekaterina",
    role: "UI/UX Designer",
    focus:
      "Draws the line between \"looks like everyone else's AI output\" and something that actually looks considered.",
  },
];

const COLLABORATORS = [
  {
    name: "Anastasia",
    role: "Copywriter & Content Strategist",
    focus: "Writes so a page argues its case in the first five seconds, not somewhere in paragraph four.",
  },
  {
    name: "Vlada",
    role: "QA & Delivery Lead",
    focus: "The last person who touches a build before your client does. Nothing ships broken on her watch.",
  },
];

function PersonCard({
  person,
  i,
  large = false,
}: {
  person: { name: string; role: string; focus: string };
  i: number;
  large?: boolean;
}) {
  return (
    <Reveal custom={i}>
      <div className="border border-black/10 p-6 md:p-8 h-full">
        <h3
          className={`font-semibold uppercase ${large ? "text-xl md:text-2xl" : "text-lg"}`}
        >
          {person.name}
        </h3>
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mt-1 mb-4">
          {person.role}
        </p>
        <p className="text-sm normal-case tracking-normal font-medium leading-relaxed text-black/70">
          {person.focus}
        </p>
      </div>
    </Reveal>
  );
}

export default function Team() {
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
          Team
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-semibold uppercase leading-[0.95]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          People, not a pipeline.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-sm md:text-base normal-case tracking-normal font-medium text-black/60 max-w-xl"
        >
          Every brief that comes through Verazio is owned by someone on
          this list, end to end — not routed through a rotating bench of
          freelancers.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32 border-t border-black/10 pt-16 md:pt-20">
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-5">
            Founders
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {FOUNDERS.map((p, i) => (
              <PersonCard key={p.name} person={p} i={i} large />
            ))}
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-5">
            Production
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTION.map((p, i) => (
              <PersonCard key={p.name} person={p} i={i} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-5">
            Collaborators
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {COLLABORATORS.map((p, i) => (
              <PersonCard key={p.name} person={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
