import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { JOURNAL_POSTS } from "./journalData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.08, duration: 0.5, ease: EASE },
  }),
};

export default function Journal() {
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
          Journal
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-semibold uppercase leading-[0.95]"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          Notes on building this way.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-sm md:text-base normal-case tracking-normal font-medium text-black/60 max-w-xl"
        >
          What we actually think about AI-native production, ownership, and
          process — written for people deciding whether to trust us with a
          brief, not for search engines.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32">
        <div className="divide-y divide-black/10 border-t border-black/10">
          {JOURNAL_POSTS.map((p, i) => (
            <motion.div
              key={p.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
            >
              <Link to={`/journal/${p.slug}`} className="group block py-10 md:py-14">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-black/40">
                    {p.readTime}
                  </span>
                  <span className="hidden sm:block text-[10px] md:text-xs font-semibold tracking-widest uppercase text-accent">
                    {p.category}
                  </span>
                </div>
                <h2 className="font-semibold uppercase text-2xl md:text-4xl flex items-center gap-2 max-w-3xl">
                  {p.title}
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </h2>
                <p className="mt-4 text-sm md:text-base normal-case tracking-normal font-medium text-black/70 leading-relaxed max-w-2xl">
                  {p.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
