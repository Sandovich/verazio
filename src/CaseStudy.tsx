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
  cadence: {
    n: "04",
    name: "Cadence",
    tag: "Concept work — dev-tools SaaS",
    href: "/verazio/demos/cadence/index.html",
    hook: "One honest number for \"are we actually shipping,\" not another uptime widget.",
    image: "/verazio/case-studies/cadence-hero.jpg",
    palette: [
      { name: "Void", hex: "#0A0A0D" },
      { name: "Terminal green", hex: "#0AD68B" },
      { name: "Warning amber", hex: "#F59E0B" },
      { name: "Panel white", hex: "#FFFFFF" },
    ],
    typography: "Inter for every UI label and heading; monospace reserved for anything that's actually a number or a timestamp — a deliberate split so data reads as data, not as decorated copy.",
    brief:
      "Engineering leads already have an uptime dashboard. What they don't have is an honest answer to \"is the team actually shipping\" without digging through a dozen tabs before standup. The brief: one screen, one real metric, no vanity number dressed up as insight.",
    approach: [
      "Every other Verazio case so far reads warm — limewash, gradients, glass. Cadence deliberately doesn't: near-black void, a single terminal-green accent, monospace for anything numeric. The register has to match the audience — an engineering lead evaluating a dev tool trusts a dashboard that looks like the terminal they already live in, not a marketing site.",
      "The structural idea came from a real developer's personal site (victoreke.com, checked and confirmed MIT-licensed before anything was adapted from it) — a GitHub-style contribution heatmap. We rebuilt the mechanic from scratch as a deploy-activity heatmap rather than copying any code, because it's a genuinely honest way to show output over time without inventing specific client data.",
    ],
    build: [
      "The heatmap and the deploy timeline are both real, working components — a seeded pseudo-random generator for the heatmap (so it renders the same believable pattern every load instead of reshuffling), and a traced timeline with status icons for each deploy. No fabricated client logos or testimonials anywhere on the page, consistent with every other concept case here.",
      "Added a decorative \"System Watch\" panel built as an actual from-scratch Canvas2D reimplementation of a grid-sample-and-render effect (the mechanic behind ascii/dither art tools) — not fed a real photo, since none was available, so what's rendering is a procedurally generated pulsing pattern. The primary CTA uses a WebGL liquid-metal shader via the open-source @paper-design/shaders package, Apache-2.0 licensed and used exactly as its public API intends.",
    ],
    result: "52-week deploy heatmap, zero fabricated data",
  },
  devfolio: {
    n: "05",
    name: "Rae Calder",
    tag: "Concept work — developer portfolio",
    href: "/verazio/demos/devfolio/index.html",
    hook: "A portfolio that reads like a spec sheet, not a mood board.",
    image: "/verazio/case-studies/devfolio-hero.jpg",
    palette: [
      { name: "Void", hex: "#111111" },
      { name: "Grey", hex: "#AAAAAA" },
      { name: "Boulder", hex: "#777777" },
      { name: "Signal orange", hex: "#CB450C" },
    ],
    typography: "Bebas Neue at enormous scale for every headline — the hero, project titles, the marquee — paired with Open Sauce One for everything else, so the huge condensed display type reads as the site's whole personality rather than a one-off hero moment.",
    brief:
      "Developer portfolios tend to converge on the same soft, card-grid template — rounded corners, pastel gradients, an icon per skill. This one instead follows a specific real-world reference closely in structure and register — a well-known dark, typography-first developer portfolio — matched section by section and down to the actual color values and font choices, rebuilt entirely from scratch with an original fictional persona, copy, and code rather than any reused assets.",
    approach: [
      "The hero splits a compound job title — \"Full-Stack Developer\" — across two rows the same way the reference splits its own compound title: \"Full\" opposite \"— Stack\" on one row, \"Developer\" beside an About paragraph on the next, all in room-filling Bebas Neue with a single orange dash as the only color accent.",
      "Selected Work alternates each project's giant title left and right down the page instead of a card grid, and the lower half splits into the same two-column shape as the reference: a bordered Recognition list on the left, stacked Interests and Icebreakers blocks on the right.",
    ],
    build: [
      "The palette and type scale are pulled directly from the reference's own source (colors, font names, the dark-mode-by-default background) rather than approximated from a screenshot — checked against the actual CSS rather than guessed.",
      "The closing marquee is a genuine seamless CSS loop, and the footer email uses real copy-to-clipboard with a status label, plus a live local-time readout — a functioning detail, not a static mock. No fictional 'visit project' links point anywhere real, and the Recognition copy stays deliberately generic rather than naming real award bodies for a fabricated win.",
    ],
    result: "Room-filling type system, zero dead links",
  },
  sub2: {
    n: "06",
    name: "SUB2",
    tag: "Concept work — race campaign",
    href: "/verazio/demos/sub2/index.html",
    hook: "One screen, no scroll — a broadcast plate, not a brochure.",
    image: "/verazio/case-studies/sub2-hero.jpg",
    palette: [
      { name: "Void", hex: "#0B0B0C" },
      { name: "White", hex: "#FFFFFF" },
      { name: "White/60", hex: "#FFFFFF99" },
      { name: "Signal red", hex: "#FF3D2E" },
    ],
    typography: "Inter Tight at heavy weights (600–900) for the headline and every button, IBM Plex Mono reserved for the live-campaign label, splits, and stat units — so the mono type reads as a broadcast lower-third rather than decoration.",
    brief:
      "A campaign announcing an attempt to break the marathon's 2-hour barrier needed to land like a live broadcast moment, not a scrollable landing page with a hero banner up top. The brief specified a single full-viewport screen with no scroll at all, a looping video plate, and a liquid-glass UI language for every interactive element.",
    approach: [
      "The whole page is one screen: a bottom-anchored layout with the headline, status row, and CTAs on the left and a stat rail on the right, everything staggering in with a blurred fade-up on load rather than on scroll — because there's no scroll to trigger anything from.",
      "Two overlays do the color work instead of a flat dark gradient: a bottom-masked backdrop-blur for legibility, and a separate red 'heat scrim' layered on top with mix-blend-mode: screen, so the campaign's signal color rises from the base without ever flattening or darkening the footage under it.",
    ],
    build: [
      "Every glass surface — the nav pill, the badges, the stat plates — shares one reusable `.liquid-glass` utility class: a near-transparent blurred background plus a gradient-ring pseudo-element masked to just the border, built once and reused everywhere rather than restyled per component.",
      "Caught two real bugs before shipping. First, a CSS cascade issue: `.liquid-glass` sets its own `position: relative` for its border pseudo-element, which was silently overriding the `fixed` utility on the FREE ENTRY badge (same specificity, later in the stylesheet, so the plain rule won) — fixed by moving `.liquid-glass` into Tailwind's `@layer components`, so utility classes always win regardless of source order. Second, a mobile-only bug: the root container used `height: 100vh`, which on Safari is measured against the browser chrome collapsed — on a page with no scroll at all, that pushed the CTAs and stats below the real visible fold with no way to reach them. Switched to `100dvh`, which tracks the actual current viewport.",
      "The nav (The Attempt / The Athlete / Splits / Join) originally pointed at dead `#` links. Built each one out as a full-screen content panel — course facts, a fictional athlete profile, a real 10-row pacing-split table, and ways to get involved — that opens with a blurred scale-up transition over the hero rather than routing to a separate page, keeping the 'one screen' premise intact even once you're a layer deep.",
    ],
    result: "Single-viewport broadcast hero, zero scroll",
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
