import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import SectionIntro from "./ui/SectionIntro";
import {
  getWhatsAppUrl,
  WHATSAPP_DISPLAY,
  CONTACT_ENQUIRY_MESSAGE,
  GYM_EMAIL
} from "../utils/whatsapp";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const msg = `Hi Mohan Gym! My name is ${formData.name}. Phone: ${formData.phone}.${formData.email ? ` Email: ${formData.email}.` : ""} Enquiry: ${formData.message || "I'd like to schedule a visit and discuss membership."}`;
    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <section id="contact" className="relative bg-[#0A0A0A] px-4 py-28 sm:px-6 lg:px-8">
      {/* Subtle background glow */}
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-[#D6FF3E]/4 blur-[180px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="GET IN TOUCH"
          title="Visit The Club & Start Your Journey"
          description="Have questions regarding training slots, admission, or personalized diet protocols? Reach out to our front desk team."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Contact Details & Timings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-5"
          >
            {/* Address Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">Club Location</h4>
                  <p className="mt-1 text-sm font-semibold text-white/90">
                    Mohan Gym
                  </p>
                  <p className="mt-0.5 text-sm text-white/70 leading-relaxed">
                    Ingur–Chennimalai Road, near Bajaj Showroom, Chennimalai, Tamil Nadu
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mohan+Gym+Ingur+Chennimalai+Road+near+Bajaj+Showroom+Chennimalai+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    View location on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Connect */}
            <div className="space-y-4">
              <a
                href={getWhatsAppUrl(CONTACT_ENQUIRY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-accent/40 bg-accent/[0.08] p-5 backdrop-blur-xl transition hover:border-accent hover:bg-accent/15 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-black font-bold shadow-glow">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-accent uppercase">
                      OFFICIAL WHATSAPP ENQUIRY
                    </p>
                    <p className="text-sm font-bold text-white group-hover:text-accent transition">
                      {WHATSAPP_DISPLAY}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform">
                  Chat Now →
                </span>
              </a>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase">CALL US</p>
                      <a href="tel:+919486882451" className="text-xs font-semibold text-white hover:text-accent">
                        {WHATSAPP_DISPLAY}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase">EMAIL US</p>
                      <a href={`mailto:${GYM_EMAIL}`} className="text-xs font-semibold text-white hover:text-accent">
                        {GYM_EMAIL}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="rounded-3xl border border-accent/20 bg-accent/[0.03] p-7 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-accent" />
                <h4 className="font-display text-base font-bold text-white uppercase tracking-wider">
                  Club Operating Hours
                </h4>
              </div>

              <div className="space-y-4 text-xs">
                {/* Monday - Saturday */}
                <div className="border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Monday – Saturday</span>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                      Two Sessions
                    </span>
                  </div>
                  <div className="space-y-1.5 pl-3 border-l-2 border-accent/30 text-white/80">
                    <div className="flex justify-between">
                      <span className="text-white/60">Morning session:</span>
                      <span className="font-medium text-white">5:00 AM – 9:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Evening session:</span>
                      <span className="font-medium text-white">5:00 PM – 9:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Sunday */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Sunday</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/60">
                      Morning Only
                    </span>
                  </div>
                  <div className="space-y-1.5 pl-3 border-l-2 border-white/20 text-white/80">
                    <div className="flex justify-between">
                      <span className="text-white/60">Morning session:</span>
                      <span className="font-medium text-accent">5:00 AM – 9:00 AM</span>
                    </div>
                    <div className="flex justify-between text-white/40">
                      <span>Evening session:</span>
                      <span className="font-semibold text-white/40">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-glass backdrop-blur-2xl lg:col-span-7"
          >
            <h3 className="font-display text-2xl font-bold text-white tracking-wide">
              Request a Gym Tour & Consultation
            </h3>
            <p className="mt-2 text-xs text-white/60">
              Leave a message below or chat directly on WhatsApp at {WHATSAPP_DISPLAY} to schedule a visit and discuss training options.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-accent mb-3" />
                <h4 className="font-display text-lg font-bold text-white">Inquiry Forwarded</h4>
                <p className="mt-2 text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                  Thank you! Your inquiry was prepared for WhatsApp. For immediate confirmation, you can also reach our front desk directly at{" "}
                  <a href={`tel:+919486882451`} className="text-accent underline font-semibold">{WHATSAPP_DISPLAY}</a> or chat with us on WhatsApp.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a
                    href={getWhatsAppUrl(CONTACT_ENQUIRY_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-glow"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Open WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white/80 hover:text-white"
                  >
                    Send another inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 94868 82451"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. arun@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                    Your Goals / Inquiries
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what fitness goals you wish to achieve (e.g. strength, fat loss, contest prep)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] disabled:opacity-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {submitting ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>SEND INQUIRY VIA WHATSAPP</span>
                      </>
                    )}
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-3 text-[10px] uppercase font-bold tracking-widest text-white/30">OR</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <a
                    href={getWhatsAppUrl(CONTACT_ENQUIRY_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition hover:border-accent hover:text-accent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <MessageSquare className="h-4 w-4 text-accent" />
                    <span>Quick Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
