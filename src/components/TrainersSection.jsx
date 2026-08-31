import { motion } from "framer-motion";
import { Award, Instagram, Dumbbell } from "lucide-react";
import { useGymData } from "../context/GymDataContext";
import SectionIntro from "./ui/SectionIntro";

export default function TrainersSection() {
  const { trainers } = useGymData();
  const activeTrainers = trainers.filter((t) => t.active !== false);

  return (
    <section id="trainers" className="relative bg-[#0A0A0A] px-4 py-28 sm:px-6 lg:px-8">
      {/* Glow accent */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-96 h-96 bg-accent/[0.04] blur-[160px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="ELITE COACHING STAFF"
          title="Guided By Master Practitioners"
          description="Every trainer at Mohan Gym brings certified expertise, contest experience, and uncompromising dedication to your personal progression."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activeTrainers.map((trainer, index) => (
            <motion.div
              key={trainer.id || trainer.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-2xl transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.05]"
            >
              {/* Trainer Photo */}
              <div className="relative h-80 w-full overflow-hidden bg-black/40">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                {/* Experience Badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold text-accent backdrop-blur-md">
                  <Award className="h-3.5 w-3.5" />
                  {trainer.experience || "5+ Years"}
                </div>
              </div>

              {/* Trainer Details */}
              <div className="p-7">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                    {trainer.name}
                  </h3>
                  {trainer.instagram && (
                    <span className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-accent">
                      <Instagram className="h-3.5 w-3.5" />
                      {trainer.instagram}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs font-semibold tracking-wider text-accent uppercase">
                  {trainer.specialization}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-white/60 line-clamp-3">
                  {trainer.bio}
                </p>

                {/* Programs Tag */}
                {trainer.programs && trainer.programs.length > 0 && (
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                      LEADS PROGRAMS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trainer.programs.map((prog, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/80"
                        >
                          <Dumbbell className="h-3 w-3 text-accent" />
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
