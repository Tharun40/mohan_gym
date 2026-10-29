import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getWhatsAppUrl, CONTACT_ENQUIRY_MESSAGE } from "../utils/whatsapp";

export default function FinalCTASection() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-accent/[0.08] px-8 py-16 text-center shadow-panel backdrop-blur-2xl sm:px-14 sm:py-20">
          {/* Background glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 mx-auto max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] text-accent uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              JOIN THE ELITE
            </div>

            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready To Build Your <span className="text-accent">Greatest Physique?</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/70 max-w-2xl mx-auto">
              Join Mohan Gym today. Direct WhatsApp support, flexible 3, 6 & 12 month membership options, and master coaches ready to program your progression.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#membership"
                className="inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black shadow-glow transition hover:scale-105 hover:shadow-[0_0_40px_rgba(214,255,62,0.45)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
              >
                <span>CHOOSE YOUR PLAN</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={getWhatsAppUrl("Hi Mohan Gym! I would like to schedule a visit to Mohan Gym. Could you please share the available timings?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur-xl transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
              >
                SCHEDULE A VISIT
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
