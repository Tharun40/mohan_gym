import { motion } from "framer-motion";
import { Star, Quote, TrendingUp } from "lucide-react";
import { TESTIMONIALS } from "../services/seedData";
import SectionIntro from "./ui/SectionIntro";

export default function TestimonialsSection() {
  return (
    <section className="relative bg-[#0A0A0A] px-4 py-28 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.02] blur-[160px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="PROVEN TRANSFORMATIONS"
          title="Real Results From Committed Members"
          description="Hear from athletes and members who elevated their strength, discipline, and physical composition with our tailored coaching."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-glass backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-white/20" />
                </div>

                {/* Transformation tag */}
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent">
                  <TrendingUp className="h-3 w-3" />
                  {item.transformation}
                </div>

                {/* Quote Text */}
                <p className="mt-5 text-sm leading-relaxed text-white/80 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 border-t border-white/10 pt-6 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-12 w-12 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <h4 className="font-display text-base font-bold text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/50">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
