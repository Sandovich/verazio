import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
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

export default function JournalPost() {
  const { slug } = useParams();
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/journal" replace />;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header animate={false} />

      <section className="px-5 sm:px-8 md:px-12 pt-16 pb-10 md:pt-24 md:pb-14">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest uppercase text-black/50 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Journal
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-xs md:text-sm font-semibold tracking-widest uppercase text-accent mb-3"
        >
          {post.category} · {post.date} · {post.readTime}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-semibold uppercase leading-[0.98] max-w-4xl"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
        >
          {post.title}
        </motion.h1>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32 border-t border-black/10 pt-16 md:pt-20">
        <div className="max-w-2xl space-y-6">
          {post.body.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="text-base md:text-lg normal-case tracking-normal font-medium leading-relaxed text-black/80"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10 bg-black text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2
            className="font-semibold uppercase leading-[0.95]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Have a brief in mind?
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
