import { motion } from "framer-motion";

const programs = [
  {
    name: "Basic Plan",
    price: "₹799",
    duration: "3 Months",
    features: ["Workout Chart"],
    popular: false,
  },
  {
    name: "Premium Plan",
    price: "₹1499",
    duration: "6 Months",
    features: ["Diet Chart"],
    popular: true,
  },
  {
    name: "Platinum Plan",
    price: "₹2799",
    duration: "1 Year",
    features: ["Workout Chart + Diet Chart"],
    popular: false,
  },
];

const extras = ["Workout Chart - ₹200", "Diet Chart - ₹300"];

export default function ProgramSection() {
  return (
    <motion.section
      className="relative bg-[#0A0A0A] px-4 py-32 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Smooth transition gradient from hero */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      
      {/* Continue light flow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D6FF3E]/5 blur-[160px] -z-10" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center relative z-10">
          <motion.h2
            className="text-3xl font-bold text-white sm:text-4xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Choose Your Program
          </motion.h2>
        </div>

        <div className="mb-10 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/80">
          Admission Fee ₹300 <span className="mx-2 text-white/30">|</span> Monthly Fee ₹300
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8 relative z-10">
          {programs.map((program, index) => (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02, rotateX: 4, rotateY: -4, transition: { type: "spring", stiffness: 120, damping: 18 } }}
              key={program.name}
              style={{ transformStyle: "preserve-3d" }}
              className={[
                "rounded-2xl border border-white/10 bg-white/5 p-6",
                program.popular ? "scale-[1.01] border-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" : "",
                "will-change-transform transform-gpu",
              ].join(" ")}
            >
              <h3 className="text-xl font-semibold text-white">{program.name}</h3>
              <p className="mt-3 text-3xl font-bold text-white">{program.price}</p>
              <p className="mt-2 text-sm text-white/70">Duration: {program.duration}</p>

              <ul className="mt-6 space-y-2 text-sm text-white/80">
                {program.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-8 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Get Started
              </button>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 relative z-10">
          <h3 className="text-lg font-semibold text-white">Extras</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {extras.map((extra) => (
              <li key={extra}>{extra}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
