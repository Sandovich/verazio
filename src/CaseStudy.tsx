import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
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

type CaseStudy = {
  n: string;
  name: string;
  tag: string;
  href: string;
  hook: string;
  image: string;
  palette: { name: string; hex: string }[];
  typography: string;
  brief: string;
  approach: string[];
  build: string[];
  result: string;
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  prisma: {
    n: "01",
    name: "Prisma",
    tag: "Concept work — creative collective",
    href: "/verazio/demos/prisma/index.html",
    hook: "A wordmark built to be the visual, not a caption sitting on top of one.",
    image: "/verazio/case-studies/prisma-hero.jpg",
    palette: [
      { name: "Ink", hex: "#101010" },
      { name: "Graphite card", hex: "#212121" },
      { name: "Parchment", hex: "#DEDBC8" },
      { name: "Warm ivory", hex: "#E1E0CC" },
    ],
    typography: "Almarai for every weight of the working type, Instrument Serif italic reserved for the one line that needs to read as a signature, not a heading.",
    brief:
      "A worldwide network of visual artists and filmmakers, and the same problem every creative collective site runs into: hero, grid, footer, indistinguishable from the last twenty portfolio templates a client has already scrolled past. If a site about visual craft doesn't prove craft in the first three seconds, the work underneath it never gets a fair look.",
    approach: [
      "The wordmark is the hero — a single giant, cinematic frame with the word \"Prisma\" set large enough that it functions as the visual, not a caption sitting on top of one. The supporting type is a warm off-white against near-black, which keeps every still image in the collective's actual work the brightest thing on the page instead of competing with a busy color system.",
      "Motion carries more of the design weight here than on any other case: letters pull up into place on scroll instead of the page just fading in, and the feature cards are built around short looping video rather than static thumbnails, because a network of filmmakers showing static JPEGs would have undercut its own premise.",
    ],
    build: [
      "We re-encoded both of Prisma's background videos this session — the originals were 16–18MB apiece at bitrates heavy enough to visibly stall on a normal connection right as they looped. Re-encoded at the same resolution and a tighter bitrate, they're now roughly a third the size with no visible quality loss, which matters more here than almost anywhere else on the site: a site about visual craft cannot afford to stutter.",
      "The founder-statement section — \"I am Marcus Chen, a self-taught director\" — runs as a large editorial pull-quote with a partial-opacity scroll effect, treating a testimonial less like a review widget and more like a page out of an actual profile piece.",
    ],
    result: "Scroll-linked reveal, zero layout shift",
  },
  lumina: {
    n: "02",
    name: "Lumina",
    tag: "Concept work — editorial footer system",
    href: "/verazio/demos/lumina/index.html",
    hook: "The footer that does the job most homepages give up on halfway through.",
    image: "/verazio/case-studies/lumina-hero.jpg",
    palette: [
      { name: "Deep space", hex: "#161C2C" },
      { name: "Cloud grey", hex: "#A9B0B8" },
      { name: "Ember", hex: "#D98A4C" },
      { name: "Moss", hex: "#2C3A28" },
    ],
    typography: "A plain system sans throughout, deliberately — the liquid-glass surfaces are already doing the visual work, and a display font on top would have competed with the video instead of framing it.",
    brief:
      "Every content-heavy site eventually hits the same afterthought: a gray strip of links at the bottom nobody actually designed. We asked what happens if that strip is treated with the same care as the hero — built substantial enough to work as a second homepage, without collapsing into the link-soup \"comprehensive\" usually produces.",
    approach: [
      "The whole page is staged around one full-bleed cinematic video — a figure on a hillside, a planet rising through cloud cover — running behind everything, with the footer itself rendered as a \"liquid-glass\" panel: a blurred, translucent surface that reads as glass sitting on top of the scene rather than a flat card interrupting it.",
      "Content is grouped into exactly three columns — Discover, The Mission, Concierge — deliberately capped there. A footer that tries to hold six or seven categories stops being navigable; three is enough to feel complete without becoming the link-soup the brief was written to avoid.",
    ],
    build: [
      "The liquid-glass treatment is built as its own reusable pattern rather than a one-off effect on this single footer, specifically so it's a component Verazio can drop into a different brief's footer, modal, or nav without rebuilding the blur-and-border recipe from scratch each time.",
      "lucide-react's 1.33.0 release quietly removed every brand social icon (Facebook, X, YouTube, Instagram) over trademark policy — the social row here runs on neutral generic icons instead, a small real constraint that shaped the final build.",
    ],
    result: "Liquid-glass UI kit, reusable across pages",
  },
  "vibrant-wellness": {
    n: "03",
    name: "Vibrant Wellness",
    tag: "Concept work — wellness clinic",
    href: "/verazio/demos/vibrant-wellness/index.html",
    hook: "From landing on the page to booked in under a minute, without losing the warmth.",
    image: "/verazio/case-studies/vibrant-wellness-hero.jpg",
    palette: [
      { name: "Periwinkle", hex: "#C8C6ED" },
      { name: "Lavender grey", hex: "#C2BBD7" },
      { name: "Cornflower", hex: "#8597DE" },
      { name: "Bloom pink", hex: "#D067AE" },
    ],
    typography: "Inter, full-width, at weights soft enough not to fight the gradient — a clinical grotesque would have undone the warmth the palette is doing the work of building.",
    brief:
      "Booking a wellness consultation online usually feels like booking a dentist appointment — a clinical, multi-step form buried behind a menu. That's the wrong first impression for a brand selling warmth and trust before anything clinical happens. The brief was to compress \"landing on the page\" to \"booked\" into a single unbroken scroll.",
    approach: [
      "The palette leans into soft gradient — lavender into blush into pale blue — instead of the sterile white-and-teal most clinical sites default to, paired with a full-bleed anatomical hero image that's confident enough to hold its own rather than being cropped down to a discreet icon.",
      "Liquid-glass badges carry the trust signals — a small avatar strip, a stat chip — as translucent floating elements rather than a boxed \"as seen in\" bar, which keeps them feeling like part of the scene instead of a stapled-on credibility widget.",
    ],
    build: [
      "The entire path is a single scroll: hero to social proof to \"Begin Your Journey\" with nothing forcing a detour through a separate booking page first. Every extra click in a booking flow is a chance for someone to close the tab; this build was scoped around removing as many of those as the concept allowed.",
      "The background video here was another case of an oversized source file — re-encoded this session from 8.3MB down to roughly 3.7MB at the same resolution, so it buffers fully in the time it takes the hero copy to finish animating in, instead of catching up mid-scroll.",
    ],
    result: "Sub-60s booking flow from hero to form",
  },
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = slug ? CASE_STUDIES[slug] : undefined;

  if (!study) return <Navigate to="/portfolio" replace />;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header animate={false} />

      <section className="px-5 sm:px-8 md:px-12 pt-16 pb-10 md:pt-24 md:pb-14">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest uppercase text-black/50 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All work
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-xs md:text-sm font-semibold tracking-widest uppercase text-accent mb-3"
        >
          {study.n} — {study.tag}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-semibold uppercase leading-[0.95]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
        >
          {study.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-6 max-w-2xl normal-case tracking-normal font-medium leading-snug"
          style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.75rem)" }}
        >
          {study.hook}
        </motion.p>

        <motion.a
          href={study.href}
          target="_blank"
          rel="noreferrer"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-8 inline-flex items-center gap-2 bg-black text-white font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-accent transition-colors"
        >
          View the live build
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
        className="px-5 sm:px-8 md:px-12"
      >
        <img
          src={study.image}
          alt={`${study.name} — live build screenshot`}
          className="w-full h-auto border border-black/10"
          loading="lazy"
        />
      </motion.div>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32 border-t border-black/10 pt-16 md:pt-20 mt-16 md:mt-24">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16 mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40"
          >
            The Brief
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="text-base md:text-lg normal-case tracking-normal font-medium leading-relaxed"
          >
            {study.brief}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16 mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40"
          >
            Design System
          </motion.p>
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
              className="flex flex-wrap gap-4 mb-6"
            >
              {study.palette.map((c) => (
                <div key={c.hex} className="flex items-center gap-2.5">
                  <span
                    className="w-9 h-9 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="leading-tight">
                    <p className="text-xs font-semibold uppercase">{c.name}</p>
                    <p className="text-[10px] font-medium text-black/40 uppercase tracking-wide">
                      {c.hex}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={2}
              className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70"
            >
              {study.typography}
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16 mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40"
          >
            The Approach
          </motion.p>
          <div className="space-y-5">
            {study.approach.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i + 1}
                className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16 mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40"
          >
            The Build
          </motion.p>
          <div className="space-y-5">
            {study.build.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i + 1}
                className="text-sm md:text-base normal-case tracking-normal font-medium leading-relaxed text-black/70"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-xs md:text-sm font-semibold tracking-widest uppercase text-black/40"
          >
            Result
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="text-lg md:text-2xl font-semibold uppercase tracking-widest text-accent"
          >
            {study.result}
          </motion.p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10 bg-black text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2
            className="font-semibold uppercase leading-[0.95]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Want something built like this?
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
