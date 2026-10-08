import { motion } from "framer-motion";
import { Dumbbell, Flame, Target, UserCheck, Activity, Check, ArrowRight } from "lucide-react";
import SectionIntro from "./ui/SectionIntro";

const programs = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    badge: "Compound Power",
    description:
      "Master essential barbell lifts—squat, bench press, deadlift, and overhead press—with strict focus on progressive overload and biomechanical efficiency.",
    benefits: ["Barbell compound mechanics", "Progressive overload protocols", "Form inspection & injury prevention"],
  },
  {
    icon: Target,
    title: "Muscle Building",
    badge: "Hypertrophy Focus",
    description:
      "Targeted volume routines engineered to build dense, balanced muscle mass using a mix of heavy compound sets and precision isolation movements.",
    benefits: ["Strategic muscle split design", "Time-under-tension control", "Symmetry & aesthetic development"],
  },
  {
    icon: Flame,
    title: "Weight Loss / Fat Loss",
    badge: "Metabolic Conditioning",
    description:
      "High-density training sessions combining resistance circuits, conditioning, and sustainable metabolic stimulus to burn fat while preserving muscle.",
    benefits: ["Metabolic resistance circuits", "Cardiovascular stamina", "Lean muscle preservation"],
  },
  {
    icon: UserCheck,
    title: "Personal Training",
    badge: "1-on-1 Coaching",
    description:
      "Dedicated one-on-one attention from experienced coaches. Get fully tailored programming, immediate form correction, and accountable guidance.",
    benefits: ["Individualized workout blueprint", "Real-time technique adjustments", "Consistent coach accountability"],
  },
  {
    icon: Activity,
    title: "General Fitness",
    badge: "Mobility & Health",
    description:
      "Balanced functional training for all fitness levels, focusing on cardiovascular health, joint mobility, core strength, and everyday stamina.",
    benefits: ["Functional movement patterns", "Joint mobility & posture health", "Sustainable long-term conditioning"],
  },
];

export default function ProgramSection() {
  return (
    <section id="programs" className="relative bg-[#0A0A0A] px-4 py-28 sm:px-6 lg:px-8">
      {/* Background glow flow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D6FF3E]/4 blur-[160px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="TRAINING PROGRAMS"
          title="Structured Regimens For Real Results"
          description="Whatever your objective, our structured programs are engineered for focused progression, safe execution, and lasting physical transformation."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const isSpan = index === 4; // Center the 5th item on large screens if desired or let it fit naturally

            return (
              <motion.article
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-glass backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.05] ${
                  isSpan ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent shadow-glow">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wider text-accent uppercase">
                      {program.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-white tracking-wide">
                    {program.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-white/60">
                    {program.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {program.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2.5 text-xs text-white/80">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold tracking-wider text-white transition hover:border-accent hover:bg-accent hover:text-black"
                  >
                    <span>INQUIRE ABOUT PROGRAM</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
