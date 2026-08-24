import { motion, useScroll, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Header from "./Header";
import { NumberTicker } from "./NumberTicker";
import { ScatterItem, ScatterText } from "./ScatterText";

// Lazy-loaded: three.js + @react-three/fiber + drei add ~1MB to the
// bundle, and desktop visitors never run this component at all. Code
// splitting it into its own chunk means only mobile devices — the ones
// that actually render <RotatingSculpture> — pay that download cost.
const RotatingSculpture = lazy(() =>
  import("./RotatingSculpture").then((m) => ({ default: m.RotatingSculpture }))
);

// Gates the actual conditional render, not just CSS visibility — a
// `hidden md:block` wrapper still mounts a WebGL canvas underneath it
// and burns a real GPU context on mobile. Checked via matchMedia so
// each device only ever mounts the asset it's actually meant to use:
// video on desktop, the draggable 3D sculpture on mobile.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

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
  { value: 300, label: "CRAFTED\nBRANDS" },
  { value: 200, label: "DIGITAL\nPRODUCTS" },
  { value: 100, label: "VENTURES\nFUNDED" },
];

const HEADING_WORDS = ["Fearless", "Vision", "Delivered"];

// Self-hosted, re-encoded from the original CloudFront asset: 3828x2164 /
// 17.5 Mbps / 22MB was heavy enough that playback could outrun buffering
// and visibly stall right at the loop point. Re-encoded to 2560px wide /
// libx264 crf 18 / ~8MB (visually equivalent, ~2.75x smaller) — buffers
// fully in under 2s and loops cleanly.
const VIDEO_URL = "/verazio/video/hero-loop.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Drives the headline break-up: 0 while the hero is parked at the top of the
  // viewport, 1 once it has scrolled fully past it.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // The intro reveal slides each word up from behind a clipping mask. That same
  // mask would guillotine the letters the moment they start flying, so it is
  // dropped once the last word has finished arriving.
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;

    // autoPlay is not a guarantee. Muted autoplay is normally allowed
    // everywhere, but it can still get declined — a data-saver mode, an
    // in-app browser webview (Telegram/Instagram/etc. ship their own
    // stricter media policies), a stalled first fetch — and the video is
    // left sitting on frame 1 with the native paused/play-triangle state.
    // Event-based retries (pause/canplay/visibilitychange) only fire again
    // if something changes; if the very first play() is declined and
    // nothing else happens, there's no event left to catch it. So on top of
    // those, poll on an interval and — the case that actually unlocks a
    // hard policy block — retry on the page's very first user interaction,
    // since a real tap/click/scroll satisfies even the strictest gesture
    // requirement.
    const tryPlay = () => {
      video.play().catch(() => {
        // Expected when still buffering or genuinely blocked — the poll
        // and interaction listeners below keep retrying.
      });
    };

    const onPause = () => {
      if (!document.hidden) tryPlay();
    };
    const onVisible = () => {
      if (!document.hidden && video.paused) tryPlay();
    };
    const onInteraction = () => {
      if (video.paused) tryPlay();
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", onVisible);

    const interactionEvents = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, onInteraction, { passive: true })
    );

    const pollId = window.setInterval(() => {
      if (video.paused && !document.hidden) tryPlay();
    }, 1500);

    tryPlay();

    return () => {
      video.removeEventListener("pause", onPause);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      interactionEvents.forEach((evt) => window.removeEventListener(evt, onInteraction));
      window.clearInterval(pollId);
    };
  }, []);

  return (
    // svh, not dvh: dvh tracks Safari's toolbar live, so as the toolbar
    // auto-collapses mid-scroll this container would grow taller in real
    // time — since the sculpture's clip band and the stats/headline
    // spacing are all sized off this container, that read as the
    // sculpture suddenly enlarging and the text dropping mid-scroll. svh
    // is fixed at the smallest-toolbars-visible height, so the hero never
    // resizes after paint — trades a little empty space once the toolbar
    // hides for a layout that never jumps.
    <div
      ref={heroRef}
      className="relative min-h-svh w-full font-sans uppercase tracking-widest font-semibold text-black overflow-hidden"
    >
      {/* BACKGROUND — desktop keeps the original hero video (the sculpture
          sits left-of-center in the source frame; object-cover's centered
          crop would push it out of frame on a narrow phone, hence the
          mobile-biased crop below). Mobile instead gets a real, draggable
          3D sculpture built from scratch — swipe to spin it — rather than
          a passive video loop. Gated by JS (useIsMobile), not just a CSS
          `hidden` wrapper: a hidden video still buffers, and a hidden
          canvas still burns a WebGL context. */}
      {isMobile ? (
        <Suspense fallback={null}>
          <RotatingSculpture />
        </Suspense>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      )}

      <div className="relative z-10 flex flex-col min-h-svh">
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
                  <NumberTicker value={stat.value} />
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
              aria-label="Work With Us"
              className="flex items-center gap-1.5 text-base sm:text-xl md:text-2xl font-semibold text-accent whitespace-nowrap"
            >
              <ScatterText
                text="Work With Us"
                progress={scrollYProgress}
                seed={410}
                spread={12}
              />
              <ScatterItem progress={scrollYProgress} seed={947} spread={12}>
                <ArrowUpRight className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" />
              </ScatterItem>
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
              aria-label={HEADING_WORDS.join(" ")}
              className="font-semibold uppercase text-black text-right"
              style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88 }}
            >
              {HEADING_WORDS.map((word, i) => (
                <span
                  key={word}
                  className={`block ${introDone ? "" : "overflow-hidden"}`}
                >
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.14,
                      duration: 0.7,
                      ease: EASE,
                    }}
                    onAnimationComplete={
                      i === HEADING_WORDS.length - 1
                        ? () => setIntroDone(true)
                        : undefined
                    }
                  >
                    <ScatterText
                      text={word}
                      progress={scrollYProgress}
                      seed={i * 97 + 3}
                      spread={17}
                    />
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
