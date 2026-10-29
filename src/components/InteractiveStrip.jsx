import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];
const springConfig = { stiffness: 68, damping: 22, mass: 1.1 };
const opacitySpring = { stiffness: 60, damping: 20, mass: 1.05 };

export default function InteractiveStrip() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const targetOpacity = useMotionValue(0);

  const glowX = useSpring(pointerX, springConfig);
  const glowY = useSpring(pointerY, springConfig);
  const glowOpacity = useSpring(targetOpacity, opacitySpring);

  const glowOffsetX = useTransform(glowX, (value) => value - 210);
  const glowOffsetY = useTransform(glowY, (value) => value - 210);
  const coreOffsetX = useTransform(glowX, (value) => value - 120);
  const coreOffsetY = useTransform(glowY, (value) => value - 120);

  const spotlight = useMotionTemplate`
    radial-gradient(520px circle at ${glowX}px ${glowY}px, rgba(214,255,62,0.075), transparent 64%),
    radial-gradient(260px circle at ${glowX}px ${glowY}px, rgba(255,255,255,0.05), transparent 58%)
  `;

  const sheen = useMotionTemplate`
    radial-gradient(680px circle at ${glowX}px ${glowY}px, rgba(255,255,255,0.045), transparent 72%)
  `;

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
    targetOpacity.set(0.72);
  };

  const handlePointerEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
    targetOpacity.set(0.52);
  };

  const handlePointerLeave = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(rect.width * 0.5);
    pointerY.set(rect.height * 0.45);
    targetOpacity.set(0);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0A0A0A] px-4 py-28 sm:px-6 lg:px-8"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.012)_35%,rgba(10,10,10,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.035),transparent_44%)] opacity-70" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        animate={{ x: ["-1.5%", "1.5%", "-1.5%"], y: ["0%", "-0.8%", "0%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: spotlight }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-50"
        animate={{ x: ["1%", "-1%", "1%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: sheen }}
      />
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full bg-accent/[0.10] blur-[150px]"
        style={{ x: glowOffsetX, y: glowOffsetY, opacity: glowOpacity }}
      />
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-60 w-60 rounded-full bg-white/[0.07] blur-[90px]"
        style={{ x: coreOffsetX, y: coreOffsetY, opacity: glowOpacity }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[radial-gradient(rgba(255,255,255,0.95)_0.7px,transparent_0.7px)] [background-size:13px_13px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.66)_0%,rgba(10,10,10,0.14)_18%,rgba(10,10,10,0.14)_82%,rgba(10,10,10,0.66)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        className="relative mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1, ease: easeOut }}
      >
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.018)_48%,rgba(255,255,255,0.03)_100%)] px-6 py-16 shadow-panel shadow-edge backdrop-blur-2xl sm:px-10 sm:py-20 lg:px-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_70%)] opacity-45" />
          <div className="pointer-events-none absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] border border-white/[0.03]" />

          <motion.div
            className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.08 }}
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[11px] font-semibold tracking-[0.3em] text-white/54 backdrop-blur-xl">
              IMMERSIVE TRAINING ENVIRONMENT
            </div>

            <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.9rem]">
              Experience Fitness Like Never Before
            </h2>

            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/56 sm:text-lg sm:leading-9">
              Discover a quieter kind of performance luxury, where coaching, atmosphere, and
              precision design come together in one seamless training experience.
            </p>

            <motion.a
              href="#exercise"
              whileHover={{ scale: 1.035, y: -1, boxShadow: "0 18px 48px rgba(214,255,62,0.14)" }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="mt-10 inline-flex items-center justify-center rounded-xl border border-accent/70 bg-accent px-6 py-3.5 text-[12px] font-semibold tracking-[0.22em] text-black shadow-[0_10px_30px_rgba(214,255,62,0.16)] transition-colors duration-300 hover:bg-accent"
            >
              Explore Experience
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
