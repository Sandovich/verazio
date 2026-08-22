import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "./Header";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.6, ease: EASE },
  }),
};

const STATS = [
  { value: "300", label: "CRAFTED\nBRANDS" },
  { value: "200", label: "DIGITAL\nPRODUCTS" },
  { value: "100", label: "VENTURES\nFUNDED" },
];

const HEADING_WORDS = ["Fearless", "Vision", "Delivered"];

// Self-hosted, re-encoded from the original CloudFront asset: 3828x2164 /
// 17.5 Mbps / 22MB was heavy enough that playback could outrun buffering
// and visibly stall right at the loop point. Re-encoded to 1920px wide /
// ~1.8 Mbps / ~2.2MB (libx264, crf 26) — same look, ~10x smaller, loops
// cleanly once buffered.
const VIDEO_URL = "/verazio/video/hero-loop.mp4";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full font-sans uppercase tracking-widest font-semibold text-black overflow-hidden">
      {/* BACKGROUND VIDEO — the sculpture sits left-of-center in the source
          frame; on a phone's narrow aspect, object-cover's default centered
          crop pushes it almost entirely out of frame, leaving what reads as
          an empty white panel. Bias the crop left on mobile so it's actually
          visible; the wide desktop frame already shows nearly the whole shot
          at center. */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-[28%_center] md:object-center"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* STATS ROW — pinned to the top on mobile, since the sculpture fills
            most of the mid-screen there and would otherwise cut through the
            numbers; vertically centered at md+ where there's clear space
            beside it. */}
        <div className="flex-1 flex items-start md:items-center justify-end px-5 sm:px-8 md:px-12 py-8 md:py-0">
          <div className="flex gap-5 sm:gap-8 md:gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.value}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 2}
                className="text-right"
              >
                <div
                  style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", fontWeight: 600 }}
                  className="text-black leading-none"
                >
                  <span className="text-accent" style={{ fontSize: "0.5em" }}>
                    +
                  </span>
                  {stat.value}
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-black whitespace-pre-line leading-tight mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col gap-6 md:gap-12 px-5 sm:px-8 md:px-12 pb-8 md:pb-12">
          {/* Row A */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase max-w-[130px] sm:max-w-[160px] md:max-w-xs text-black"
            >
              Shaping Bold
              <br />
              Visions Into Power
              <br />
              For Your Tribe
            </motion.p>

            <motion.a
              href="#contact"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="flex items-center gap-1.5 text-base sm:text-xl md:text-2xl font-semibold text-accent whitespace-nowrap"
            >
              Work With Us
              <ArrowUpRight className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" />
            </motion.a>
          </div>

          {/* Row B */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7}
              className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0"
            >
              <p className="text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-left md:text-right text-black">
                Creative Studios Built Around Elevating Your Vision Into
                Striking Reality
              </p>
            </motion.div>

            <h1
              className="font-semibold uppercase text-black text-right"
              style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88 }}
            >
              {HEADING_WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.14,
                      duration: 0.7,
                      ease: EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
