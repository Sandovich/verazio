import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail, Clock } from "lucide-react";
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

export default function Contact() {
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
          Contact
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-semibold uppercase leading-[0.95]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          Tell us what
          <br />
          you're building.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-sm md:text-base normal-case tracking-normal font-medium text-black/60 max-w-xl"
        >
          Send a brief and we'll tell you honestly whether 1–3 weeks is
          realistic for it, what it would cost, and what we'd need from you
          to start.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32 border-t border-black/10 pt-16 md:pt-20">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20">
          <div className="space-y-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Email
              </p>
              <a
                href="mailto:hello@verazio.com"
                className="text-lg font-semibold uppercase tracking-wide hover:text-accent transition-colors"
              >
                hello@verazio.com
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
            >
              <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-2 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Response time
              </p>
              <p className="text-sm normal-case tracking-normal font-medium text-black/70 leading-relaxed max-w-xs">
                Within 1 business day, wherever you're writing from. If a
                brief isn't a fit, we'll say so — not leave you waiting.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={2}
            >
              <p className="text-[10px] font-semibold tracking-widest uppercase text-black/40 mb-2">
                Working across
              </p>
              <p className="text-sm normal-case tracking-normal font-medium text-black/70 leading-relaxed max-w-xs">
                Remote-first, European time zones. No office to visit yet —
                every project runs on calls and a shared brief doc.
              </p>
            </motion.div>
          </div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const btn = (e.target as HTMLFormElement).querySelector("button");
              if (btn) btn.textContent = "Brief received";
            }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                required
                placeholder="Name"
                className="bg-transparent border-b border-black/20 focus:border-accent outline-none py-2.5 text-sm normal-case tracking-normal font-medium placeholder:text-black/40"
              />
              <input
                required
                placeholder="Company"
                className="bg-transparent border-b border-black/20 focus:border-accent outline-none py-2.5 text-sm normal-case tracking-normal font-medium placeholder:text-black/40"
              />
            </div>
            <input
              required
              type="email"
              placeholder="Work email"
              className="w-full bg-transparent border-b border-black/20 focus:border-accent outline-none py-2.5 text-sm normal-case tracking-normal font-medium placeholder:text-black/40"
            />
            <input
              placeholder="What you need — website, landing page, sales deck…"
              className="w-full bg-transparent border-b border-black/20 focus:border-accent outline-none py-2.5 text-sm normal-case tracking-normal font-medium placeholder:text-black/40"
            />
            <textarea
              rows={4}
              placeholder="What's the goal, and by when?"
              className="w-full bg-transparent border-b border-black/20 focus:border-accent outline-none py-2.5 text-sm normal-case tracking-normal font-medium placeholder:text-black/40 resize-none"
            />
            <button
              type="submit"
              className="mt-2 bg-black text-white font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-accent transition-colors inline-flex items-center gap-2"
            >
              Send the brief
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
