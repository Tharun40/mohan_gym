import { motion } from "framer-motion";

export default function FeatureItem({ icon: Icon, title, text, delay = 0 }) {
  return (
    <motion.div
      className="group flex items-start gap-5 rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-6 shadow-panel shadow-edge backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-accent/25 hover:bg-white/[0.06]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent shadow-glow">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em] text-white">{title}</h3>
        <p className="mt-2.5 text-[15px] leading-8 text-white/58">{text}</p>
      </div>
    </motion.div>
  );
}
