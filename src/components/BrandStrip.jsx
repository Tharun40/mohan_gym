import { motion } from "framer-motion";

const brands = ["NIKE", "PUMA", "ADIDAS", "UNDER ARMOUR", "REEBOK", "GYMSHARK"];

export default function BrandStrip() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 rounded-[2rem] border border-white/8 bg-white/[0.03] px-6 py-6 backdrop-blur-xl sm:gap-6"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {brands.map((brand) => (
          <div
            key={brand}
            className="rounded-full border border-white/8 bg-white/[0.02] px-5 py-3 text-sm font-medium tracking-[0.38em] text-white/35 sm:text-base"
          >
            {brand}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
