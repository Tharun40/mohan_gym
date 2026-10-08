import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import bodyImg from "../assets/body.png";

const stats = [
  { label: "Focus", value: "Strength", className: "top-6 left-6" },
  { label: "Coaching", value: "1-on-1", className: "top-6 right-6" },
  { label: "Training", value: "Heavy Iron", className: "bottom-6 left-6" },
  { label: "Location", value: "Coimbatore", className: "bottom-6 right-6" },
];
export default function Hero() {
  const { isAuthenticated } = useAuth();
  const easeOut = "easeOut";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 18, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 18, mass: 0.8 });
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const smoothParallaxX = useSpring(parallaxX, { stiffness: 80, damping: 20 });
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 80, damping: 20 });
  const cardGlowX = useMotionValue(300);
  const cardGlowY = useMotionValue(260);

  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const spotlightX = useTransform(springX, [-0.5, 0.5], ["34%", "66%"]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], ["18%", "54%"]);
  const imageY = useTransform(springY, [-0.5, 0.5], [16, -16]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(214,255,62,0.12), transparent 32%), radial-gradient(circle at 50% 18%, rgba(255,255,255,0.08), transparent 24%)`;
  const cardGlow = useMotionTemplate`radial-gradient(400px at ${cardGlowX}px ${cardGlowY}px, rgba(214,255,62,0.15), transparent 80%)`;

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleImageMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    parallaxX.set((event.clientX - rect.left - centerX) / 40);
    parallaxY.set((event.clientY - rect.top - centerY) / 40);
    cardGlowX.set(event.clientX - rect.left);
    cardGlowY.set(event.clientY - rect.top);
  };

  const handleImageMouseLeave = () => {
    parallaxX.set(0);
    parallaxY.set(0);
    cardGlowX.set(300);
    cardGlowY.set(260);
  };

  return (
    <motion.section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-24 pt-40 sm:px-6 lg:px-8"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      {/* Global light flow - connects navbar to hero */}
      <div className="absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 bg-[#D6FF3E]/4 blur-[140px]" />
      
      <motion.div className="absolute inset-0 -z-10" style={{ backgroundImage: spotlight }} />
      <div className="absolute left-1/2 top-24 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/9 blur-[150px]" />
      <div className="absolute left-[12%] top-[18%] -z-10 h-52 w-52 rounded-full bg-white/[0.06] blur-[130px]" />
      <div className="absolute right-[10%] top-[14%] -z-10 h-64 w-64 rounded-full bg-accent/[0.06] blur-[150px]" />
      <div className="absolute inset-x-0 bottom-[-8rem] -z-10 mx-auto h-56 max-w-4xl rounded-full bg-accent/[0.06] blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="relative z-10 max-w-[39rem]"
        >
          {/* Premium badge */}
          <motion.div 
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-2 text-[10px] font-semibold tracking-[0.3em] text-white/70 backdrop-blur-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            MOHAN GYM • COIMBATORE
          </motion.div>

          <motion.span
            className="block text-sm tracking-[0.35em] text-white/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: easeOut }}
          >
            REAL COACHING • REAL RESULTS
          </motion.span>

          {/* Hero headline */}
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-white">
            Train Strong.
            <span className="mt-2 block text-[#D6FF3E]">
              Become Stronger.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base lg:text-[15px]">
            Coimbatore’s dedicated training center for authentic strength development, hypertrophy, and disciplined personal coaching. Built for everyone serious about physical progress.
          </p>

          {/* CTA */}
          <motion.div 
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
          >
            <a
              href="#programs"
              className="px-8 py-3 rounded-full bg-[#D6FF3E] text-black font-semibold tracking-wider text-xs uppercase transition shadow-[0_10px_30px_rgba(214,255,62,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(214,255,62,0.5)]"
            >
              Explore Programs
            </a>
            <a
              href="#membership"
              className="rounded-full border border-white/20 bg-white/[0.05] px-6 py-3 text-[11px] font-semibold tracking-[0.2em] text-white/80 backdrop-blur-lg hover:bg-white/10 hover:border-accent/40 hover:text-accent transition-all duration-300"
            >
              EXPLORE PLANS
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto flex w-full max-w-[42rem] items-center justify-center"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.08 }}
        >
          {/* Card glow backdrop - enhanced for dominance */}
          <div className="absolute -inset-10 bg-[#D6FF3E]/20 blur-3xl opacity-30 -z-10" />
          <div className="absolute -inset-16 rounded-full bg-accent/4 blur-[140px] -z-10" />
          
          {/* Card */}
          <motion.div 
            className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.05] backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.9)] will-change-transform transform-gpu"
            whileHover={{ scale: 1.02, rotateX: 4, rotateY: -4 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: cardGlow }} />
            {/* Top edge accent - minimal */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/5 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/5 to-transparent" />
            
            {/* Professional image with color grading */}
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl will-change-transform transform-gpu"
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              style={{ x: smoothParallaxX, y: smoothParallaxY }}
            >
              <motion.img
                src={bodyImg}
                alt="Fitness professional showcase"
                className="w-full h-[420px] object-cover object-top sm:h-[520px]"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.04 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                style={{ x: imageX, y: imageY, filter: "brightness(0.95) contrast(1.1) saturate(1.02)" }}
              />
              
              {/* Subtle overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/12 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/12 z-10" />
              
              {/* Soft vignette */}
              <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black/18 to-transparent z-10" />
              <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black/18 to-transparent z-10" />
              <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/5 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/24 to-transparent z-10" />
            </motion.div>

            {/* Premium floating stat cards */}
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`absolute z-20 hidden sm:block ${stat.className}`}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 8 + index * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="rounded-lg border border-white/14 bg-white/[0.05] backdrop-blur px-3.5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.3)]">
                  <p className="text-[8px] font-semibold tracking-wide text-white/55 uppercase">{stat.label}</p>
                  <p className="mt-1.5 font-display text-xl font-bold text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Mobile stats - premium compact version */}
            <div className="grid grid-cols-2 gap-3 p-5 sm:hidden bg-gradient-to-t from-black/40 to-transparent">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.label} 
                  className="rounded-lg border border-white/15 bg-white/8 backdrop-blur-xl px-3 py-2.5 hover:bg-white/12 transition-colors duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <p className="text-[8px] font-semibold tracking-wider text-white/60 uppercase">{stat.label}</p>
                  <p className="mt-1.5 font-display text-lg font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
