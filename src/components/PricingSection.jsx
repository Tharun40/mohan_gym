import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles, Plus, CheckCircle2 } from "lucide-react";
import { useGymData } from "../context/GymDataContext";
import SectionIntro from "./ui/SectionIntro";

export default function PricingSection() {
  const { plans, addons } = useGymData();
  const navigate = useNavigate();
  const [selectedAddonIds, setSelectedAddonIds] = useState(["addon-admission"]);

  const activePlans = plans.filter((p) => p.active !== false);

  const toggleAddon = (addonId) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const getAddonsTotal = () => {
    return addons
      .filter((a) => selectedAddonIds.includes(a.id))
      .reduce((sum, a) => sum + Number(a.price), 0);
  };

  const handleSelectPlan = (plan) => {
    const queryParams = new URLSearchParams();
    queryParams.set("plan", plan.id);
    if (selectedAddonIds.length > 0) {
      queryParams.set("addons", selectedAddonIds.join(","));
    }
    navigate(`/membership?${queryParams.toString()}`);
  };

  return (
    <section id="membership" className="relative bg-[#0A0A0A] px-4 py-28 sm:px-6 lg:px-8">
      <span id="pricing" className="absolute -top-24" />
      {/* Background glow flow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D6FF3E]/5 blur-[180px] -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="MEMBERSHIP TIERS"
          title="Engineered For Every Fitness Ambition"
          description="Transparent, value-packed plans tailored to your duration with customizable coaching add-ons."
        />

        {/* Global Add-ons Selector Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                CUSTOMIZE YOUR ADD-ONS
              </p>
              <p className="text-sm text-white/70 mt-0.5">
                Toggle optional charts & onboarding fees to preview total pricing in real-time
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {addons.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all ${
                      isSelected
                        ? "border-accent bg-accent/15 text-white shadow-glow"
                        : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    ) : (
                      <Plus className="h-4 w-4 text-white/40" />
                    )}
                    <span>{addon.name}</span>
                    <span className="text-accent font-bold">+₹{addon.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 items-stretch">
          {activePlans.map((plan, index) => {
            const isPopular = plan.popular;
            const planPrice = Number(plan.price);
            const addonsSum = getAddonsTotal();
            const grandTotal = planPrice + addonsSum;

            return (
              <motion.div
                key={plan.id || plan.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 backdrop-blur-2xl transition-all duration-300 ${
                  isPopular
                    ? "border-accent/60 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-accent/[0.05] shadow-[0_20px_50px_rgba(214,255,62,0.15)] ring-1 ring-accent/30"
                    : "border-white/10 bg-white/[0.03] shadow-glass hover:border-white/20"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent px-4 py-1 text-[10px] font-bold tracking-[0.2em] text-black shadow-glow">
                    <Sparkles className="h-3 w-3" />
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                      {plan.duration}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-white/60">
                    {plan.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white font-display">₹{planPrice}</span>
                      <span className="text-xs text-white/50">/ {plan.duration}</span>
                    </div>

                    {selectedAddonIds.length > 0 && (
                      <div className="mt-2.5 border-t border-white/10 pt-2 flex items-center justify-between text-xs">
                        <span className="text-white/60">With Selected Add-ons:</span>
                        <span className="font-bold text-accent font-display text-sm">₹{grandTotal}</span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="mt-8 space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                      WHAT'S INCLUDED
                    </p>
                    {plan.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-white/80">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-10 pt-4">
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full rounded-2xl py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                      isPopular
                        ? "bg-accent text-black shadow-glow hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(214,255,62,0.5)]"
                        : "border border-white/20 bg-white/5 text-white hover:border-accent hover:text-accent hover:bg-white/10"
                    }`}
                  >
                    Choose Plan
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 text-center">
          <p className="text-xs text-white/50">
            Admission Fee: ₹300 (one-time) <span className="mx-2 text-white/20">•</span> No hidden lock-in contracts <span className="mx-2 text-white/20">•</span> Instant Activation
          </p>
        </div>
      </div>
    </section>
  );
}
