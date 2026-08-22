import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

const PROOF = [
  { value: "€35M / 7%", label: "Max EU AI Act penalty for non-compliant AI workflows" },
  { value: "100%", label: "Rights-clean AI workflows, GDPR-aware by default" },
  { value: "0", label: "Client data used to train external models" },
];

export default function AiEthics() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header animate={false} />

      <section className="px-5 sm:px-8 md:px-12 pt-16 pb-12 md:pt-24 md:pb-20 max-w-3xl">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs md:text-sm font-semibold tracking-widest uppercase text-accent mb-3"
        >
          AI Ethics &amp; Compliance
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-semibold uppercase leading-[0.95]"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
        >
          Speed only counts if it doesn't cost you later.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-sm md:text-base normal-case tracking-normal font-medium text-black/60"
        >
          Most AI vendors treat compliance as an afterthought. We build the
          other way.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-16 md:pb-24">
        <div className="grid sm:grid-cols-3 gap-6 md:gap-8 border-t border-black/10 pt-8">
          {PROOF.map((p, i) => (
            <motion.div
              key={p.value}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div
                style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 600 }}
                className="text-black leading-none"
              >
                {p.value}
              </div>
              <p className="text-xs md:text-sm normal-case tracking-normal font-medium text-black/60 mt-2">
                {p.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-32 max-w-3xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5"
        >
          <p className="text-sm md:text-base normal-case tracking-normal font-medium text-black/70 leading-relaxed">
            Most AI vendors treat compliance as an afterthought — models and
            training data with unclear rights, workflows that wouldn't hold
            up under the EU AI Act's data and anonymization standards, where
            penalties run up to €35M or 7% of global turnover.
          </p>
          <p className="text-sm md:text-base normal-case tracking-normal font-medium text-black/70 leading-relaxed">
            We build the other way. Every asset runs on rights-clean AI
            workflows, and every process is GDPR-aware from the start,
            before any client has to ask for it. Call it what it is: the
            difference between a partner you can put in front of your board
            and a vendor you'll have to explain later.
          </p>
          <p className="text-sm md:text-base normal-case tracking-normal font-medium text-black/70 leading-relaxed">
            For companies entering or scaling in the European market,
            that's the baseline everything else is built on.
          </p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 font-semibold uppercase tracking-widest text-sm text-accent"
        >
          Rights-clean. GDPR-aware. From the start.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-32 border-t border-black/10 bg-black text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2
              className="font-semibold uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              Questions before you brief us?
            </h2>
            <p className="mt-3 text-sm normal-case tracking-normal font-medium text-white/60 max-w-md">
              Ask about the workflow, the rights, the data handling — while
              it's still a conversation and before it becomes a line item.
            </p>
          </div>
          <a
            href="/#contact"
            className="flex items-center gap-2 bg-accent text-white font-semibold uppercase tracking-widest text-sm px-6 py-3 shrink-0"
          >
            Start a brief
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
