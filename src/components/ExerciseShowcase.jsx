import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTAButton from "./ui/CTAButton";
import SectionIntro from "./ui/SectionIntro";

const workouts = [
  { title: "Strength Sculpt", duration: "45 MIN", tag: "Upper Body Power" },
  { title: "Athletic Burn", duration: "30 MIN", tag: "Conditioning Flow" },
];

export default function ExerciseShowcase() {
  return (
    <section id="exercise" className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.02] p-6 shadow-glass backdrop-blur-2xl sm:p-10">
        <SectionIntro
          eyebrow="EXERCISE"
          title="Curated Sessions That Feel Cinematic"
          description="High-impact programs that blend expert guidance, strong visual atmosphere, and disciplined progression."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            className="rounded-[2rem] border border-white/10 bg-[#0F0F0F] p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm tracking-[0.3em] text-accent">MEMBERSHIP ACCESS</p>
            <h3 className="mt-4 font-display text-5xl uppercase leading-none text-white">
              Premium
              <span className="block text-accent">Fitness Club</span>
            </h3>
            <p className="mt-6 max-w-md text-base leading-8 text-white/66">
              Step into an environment where every zone, coach, and session is shaped to keep
              your training intentional and visually elevated.
            </p>
            <div className="mt-10">
              <Link
                to="/membership"
                className="inline-flex items-center justify-center rounded-full border border-accent/90 bg-accent px-8 py-3.5 text-[12px] font-bold tracking-[0.22em] text-black shadow-glow transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(214,255,62,0.4)]"
              >
                Get Started
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {workouts.map((workout, index) => (
              <motion.div
                key={workout.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] p-7"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-x-8 top-0 h-24 rounded-full bg-accent/12 blur-3xl transition duration-500 group-hover:bg-accent/20" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-[0.2em] text-white/60">
                      {workout.duration}
                    </span>
                    <h4 className="mt-16 text-3xl font-semibold text-white">{workout.title}</h4>
                    <p className="mt-3 text-white/58">{workout.tag}</p>
                  </div>
                  <div className="mt-16 text-sm tracking-[0.28em] text-accent">TRAIN WITH INTENT</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
