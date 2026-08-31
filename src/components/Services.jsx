import { motion } from "framer-motion";
import SectionIntro from "./ui/SectionIntro";

const serviceCards = [
  {
    title: "Personalized Coaching",
    copy: "Custom training architecture built from your goals, movement quality, and recovery profile.",
  },
  {
    title: "Recovery Rituals",
    copy: "Infrared heat, mobility sessions, and guided reset protocols for faster adaptation.",
  },
  {
    title: "Performance Lab",
    copy: "Track strength, conditioning, and physique changes inside a data-driven premium environment.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="SERVICE"
          title="Luxury Service, Built for Relentless Progress"
          description="High-touch coaching and recovery support engineered for people who want a sharper edge, not generic fitness."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {serviceCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-glass backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.06]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent shadow-glow">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-4 text-base leading-8 text-white/62">{card.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
