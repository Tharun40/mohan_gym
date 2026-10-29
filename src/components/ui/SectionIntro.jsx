import { motion } from "framer-motion";

export default function SectionIntro({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[46rem]"
    >
      <p className="text-[11px] font-semibold tracking-[0.34em] text-accent">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/60 sm:text-lg sm:leading-9">
        {description}
      </p>
    </motion.div>
  );
}
