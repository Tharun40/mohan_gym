import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import SectionIntro from "./ui/SectionIntro";

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
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
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
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">
                    Mohan Gym Performance Club, 24 Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu 641012
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase">CALL US</p>
                    <a href="tel:+919876543210" className="text-xs font-semibold text-white hover:text-accent">
                      +91 98765 43210
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
                    <a href="mailto:info@mohangym.com" className="text-xs font-semibold text-white hover:text-accent">
                      info@mohangym.com
                    </a>
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

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Monday – Friday</span>
                  <span className="font-bold text-white">05:30 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Saturday</span>
                  <span className="font-bold text-white">05:30 AM – 09:30 PM</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-white/70">Sunday</span>
                  <span className="font-bold text-accent">06:00 AM – 01:00 PM</span>
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
              Leave a message below or call us directly at +91 98765 43210 to schedule a visit and discuss training options.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-accent mb-3" />
                <h4 className="font-display text-lg font-bold text-white">Inquiry Received</h4>
                <p className="mt-2 text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                  Thank you! For immediate assistance or direct spot confirmation, you can reach our front desk directly at{" "}
                  <a href="tel:+919876543210" className="text-accent underline font-semibold">+91 98765 43210</a> or visit our Gandhipuram facility during operating hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-accent hover:underline"
                >
                  Send another inquiry
                </button>
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
                      placeholder="e.g. +91 98765 43210"
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

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>SEND INQUIRY</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
