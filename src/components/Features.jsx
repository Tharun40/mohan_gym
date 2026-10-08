import { Dumbbell, HeartPulse, Medal, ShieldCheck, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import FeatureItem from "./ui/FeatureItem";
import SectionIntro from "./ui/SectionIntro";

const featureList = [
  {
    icon: Medal,
    title: "Experienced Trainers",
    text: "Certified coaches focused on movement mechanics, progressive overload, and injury-free strength building.",
  },
  {
    icon: Dumbbell,
    title: "Quality Equipment",
    text: "Heavy-duty free weights, olympic barbells, calibrated plates, and precision resistance machines.",
  },
  {
    icon: ShieldCheck,
    title: "Clean Training Environment",
    text: "Sanitized gym floor, disciplined equipment care, and a spotless, well-ventilated training space.",
  },
  {
    icon: HeartPulse,
    title: "Personal Guidance",
    text: "Structured workout plans, form correction, and tailored nutrition recommendations for your goals.",
  },
  {
    icon: Users,
    title: "Supportive Community",
    text: "A motivating, ego-free atmosphere where beginners and seasoned lifters push each other forward.",
  },
  {
    icon: Sparkles,
    title: "Flexible Training Options",
    text: "Extended morning and evening workout slots designed to fit students and working professionals.",
  },
];

const imageUrl =
  "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1200&q=80";

export default function Features() {
  return (
    <section id="features" className="relative px-4 py-28 sm:px-6 lg:px-8">
      <span id="about" className="absolute -top-24" />
      <span id="facilities" className="absolute -top-24" />
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="WHY MOHAN GYM"
          title="Built For Serious, Lasting Progress"
          description="Every detail is focused on real physical progress: authentic coaching, quality iron, and an atmosphere where you stay focused on your training."
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            className="grid gap-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {featureList.map((feature, index) => (
              <FeatureItem key={feature.title} {...feature} delay={index * 0.06} />
            ))}
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-accent/18 blur-[90px]" />
            <div className="absolute bottom-8 right-0 h-40 w-40 rounded-full bg-white/10 blur-[120px]" />
            <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-panel-gradient p-5 shadow-panel shadow-edge backdrop-blur-2xl">
              <div className="absolute inset-x-20 top-6 h-24 rounded-full bg-white/15 blur-3xl" />
              <div className="absolute inset-x-[22%] top-14 h-32 rounded-full bg-accent/[0.10] blur-[70px]" />
              <img
                src={imageUrl}
                alt="Bodybuilder with dramatic studio lighting"
                className="relative z-10 h-[46rem] w-full rounded-[2.2rem] object-cover grayscale contrast-[1.22] brightness-[0.84] shadow-[0_36px_100px_rgba(0,0,0,0.5)]"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
