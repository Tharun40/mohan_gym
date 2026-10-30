import { motion } from "framer-motion";
import { Target, Dumbbell, Users, Check } from "lucide-react";
import SectionIntro from "./ui/SectionIntro";

const JOURNEY_PILLARS = [
  {
    id: "consistency",
    icon: Target,
    tag: "CONSISTENCY",
    title: "Show Up & Build the Habit",
    description:
      "Real fitness isn't built on shortcuts or overnight promises. Lasting results come from showing up day after day, embracing the routine, and celebrating small, consistent victories.",
    highlights: [
      "Sustainable daily training habits",
      "Realistic personal milestones",
      "Progress that lasts a lifetime"
    ]
  },
  {
    id: "strength",
    icon: Dumbbell,
    tag: "STRENGTH & FORM",
    title: "Guided by Experience",
    description:
      "Master the fundamental lifts and workouts with dedicated coach guidance. We prioritize safe technique and structured progression so you build real strength with confidence.",
    highlights: [
      "Focus on proper movement form",
      "Safe, structured progressive overload",
      "Support for all fitness backgrounds"
    ]
  },
  {
    id: "discipline",
    icon: Users,
    tag: "DISCIPLINE & COMMUNITY",
    title: "Train with Real Purpose",
    description:
      "Step into an honest, motivating environment where everyone is working hard towards their goals. Whatever your starting point, Mohan Gym is a space dedicated to your personal growth.",
    highlights: [
      "Welcoming and respectful floor",
      "Distraction-free workout atmosphere",
      "Culture built on mutual respect"
    ]
  }
];

export default function TestimonialsSection() {
  return (
    <section className="relative bg-[#0A0A0A] px-4 py-28 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.02] blur-[160px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="COMMITTED TO PROGRESS"
          title="Your Fitness Journey Starts Here"
          description="At Mohan Gym, progress is built on everyday discipline, patient guidance, and consistent effort. No gimmicks — just honest training and real personal development."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {JOURNEY_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-glass backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/90">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    {pillar.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <ul className="space-y-2.5 text-xs text-white/60">
                    {pillar.highlights.map((point, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
