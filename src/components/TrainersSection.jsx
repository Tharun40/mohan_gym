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
          eyebrow="OUR TEAM"
          title="Meet The Team At Mohan Gym"
          description="Dedicated to supporting you as you work towards your fitness and confidence goals in a welcoming environment."
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
              {/* Trainer Photo / Clean Initial Avatar Treatment */}
              <div className="relative h-80 w-full overflow-hidden bg-gradient-to-b from-white/[0.06] via-[#121212] to-[#0A0A0A] flex flex-col items-center justify-center">
                {trainer.image ? (
                  <>
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                  </>
                ) : (
                  <>
                    {/* Atmospheric glow behind avatar */}
                    <div className="absolute h-36 w-36 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
                    
                    {/* Initial Circle */}
                    <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-accent/40 bg-black/60 shadow-[0_0_35px_rgba(214,255,62,0.15)] transition-all duration-500 group-hover:scale-105 group-hover:border-accent group-hover:shadow-[0_0_45px_rgba(214,255,62,0.3)]">
                      <span className="font-display text-4xl font-extrabold text-accent">
                        {trainer.name.charAt(0)}
                      </span>
                    </div>

                    <span className="relative z-10 mt-4 text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
                      Mohan Gym Team
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  </>
                )}
              </div>

              {/* Trainer Details */}
              <div className="p-7">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                    {trainer.name}
                  </h3>
                </div>

                <p className="mt-1 text-xs font-semibold tracking-wider text-accent uppercase">
                  {trainer.role || trainer.specialization}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-white/70 min-h-[4.5rem]">
                  {trainer.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
