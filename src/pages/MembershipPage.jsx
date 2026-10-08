import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  Plus,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  Dumbbell
} from "lucide-react";
import { useGymData } from "../context/GymDataContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MembershipPage() {
  const [searchParams] = useSearchParams();
  const { plans, addons } = useGymData();
  const navigate = useNavigate();

  const activePlans = plans.filter((p) => p.active !== false);

  const planParam = searchParams.get("plan");
  const addonsParam = searchParams.get("addons");

  const [selectedPlanId, setSelectedPlanId] = useState(
    planParam || activePlans.find((p) => p.popular)?.id || activePlans[0]?.id || "plan-premium"
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState(
    addonsParam ? addonsParam.split(",").filter(Boolean) : []
  );
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (planParam) {
      setSelectedPlanId(planParam);
    }
    if (addonsParam !== null && addonsParam !== undefined) {
      setSelectedAddonIds(addonsParam ? addonsParam.split(",").filter(Boolean) : []);
    }
  }, [planParam, addonsParam]);

  const currentPlan = activePlans.find((p) => p.id === selectedPlanId) || null;

  const toggleAddon = (addonId) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const selectedAddonsList = addons.filter((a) => selectedAddonIds.includes(a.id));
  const addonsTotal = selectedAddonsList.reduce((sum, a) => sum + Number(a.price), 0);
  const planPrice = Number(currentPlan?.price || 0);
  const grandTotal = planPrice + addonsTotal;

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
    setValidationError("");
  };

  const handleContinue = () => {
    if (!currentPlan) {
      setValidationError("Please select a membership plan to proceed.");
      return;
    }

    const params = new URLSearchParams();
    params.set("plan", currentPlan.id);
    if (selectedAddonIds.length > 0) {
      params.set("addons", selectedAddonIds.join(","));
    }
    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-canvas font-body text-white antialiased selection:bg-accent selection:text-black">
      {/* Ambient background glow */}
      <div className="fixed inset-0 -z-10 bg-hero-radial" />
      <div className="fixed inset-x-0 top-1/4 -z-10 mx-auto h-[32rem] max-w-6xl rounded-full bg-accent/[0.05] blur-[180px]" />

      <Navbar />

      <main className="pt-36 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] text-accent uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              MEMBERSHIP SELECTION
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Choose Plan & <span className="text-accent">Add-ons</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/60">
              Select your membership tier, add optional charts or admission, and review your live dynamic total.
            </p>
          </div>

          {/* Validation Error Alert */}
          {validationError && (
            <div className="mt-8 max-w-md mx-auto flex items-center gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="mt-14 grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Col: Plan Cards & Add-ons (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Step 1: Membership Plan Cards */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    1
                  </span>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                    Select Your Plan
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {activePlans.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    const isPopular = plan.popular;

                    return (
                      <div
                        key={plan.id}
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`relative cursor-pointer rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 ${
                          isSelected
                            ? "border-accent bg-accent/[0.08] shadow-glow ring-2 ring-accent"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                        }`}
                      >
                        {isPopular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-0.5 text-[9px] font-bold tracking-wider text-black shadow-glow">
                            POPULAR
                          </div>
                        )}

                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
                            <span className="text-xs text-white/50">{plan.duration}</span>
                          </div>
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-accent bg-accent text-black"
                                : "border-white/30 bg-black/40"
                            }`}
                          >
                            {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <p className="mt-4 font-display text-3xl font-bold text-white">
                          ₹{plan.price}
                        </p>

                        <ul className="mt-5 space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
                          {plan.features?.map((f, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-3 w-3 text-accent shrink-0" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Add-on Checkboxes */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    2
                  </span>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                    Select Optional Add-ons
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {addons.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all ${
                          isSelected
                            ? "border-accent/80 bg-accent/[0.08] shadow-glow"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display text-sm font-bold text-white">{addon.name}</h4>
                            <p className="mt-1 text-xs text-white/50">{addon.description}</p>
                          </div>
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border ${
                              isSelected
                                ? "border-accent bg-accent text-black"
                                : "border-white/30 bg-black/40"
                            }`}
                          >
                            {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="text-xs text-white/40">Fee</span>
                          <span className="font-display text-sm font-bold text-accent">+₹{addon.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Col: Live Order Summary Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 rounded-3xl border border-white/15 bg-white/[0.04] p-7 shadow-panel backdrop-blur-2xl">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white border-b border-white/10 pb-4">
                  Order Summary
                </h3>

                {/* Plan Row */}
                <div className="mt-6 space-y-4 text-xs">
                  {currentPlan ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white text-sm">{currentPlan.name} — {currentPlan.duration}</p>
                        <p className="text-white/50">Base Membership</p>
                      </div>
                      <p className="font-display text-base font-bold text-white">₹{planPrice}</p>
                    </div>
                  ) : (
                    <div className="text-amber-400 text-xs italic">
                      Please select a membership plan above
                    </div>
                  )}

                  {/* Addons List */}
                  {selectedAddonsList.length > 0 && (
                    <div className="space-y-2.5 border-t border-white/10 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                        Selected Add-ons
                      </p>
                      {selectedAddonsList.map((addon) => (
                        <div key={addon.id} className="flex justify-between text-white/80">
                          <span>{addon.name}</span>
                          <span className="font-semibold text-white">₹{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subtotal & Add-ons Subtotal Breakdown if applicable */}
                  <div className="border-t border-white/10 pt-3 space-y-1.5 text-white/60">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">₹{planPrice}</span>
                    </div>
                    {selectedAddonsList.length > 0 && (
                      <div className="flex justify-between">
                        <span>Add-ons Total</span>
                        <span className="text-white">₹{addonsTotal}</span>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Total */}
                  <div className="border-t border-white/15 pt-5 flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-bold text-white/70 uppercase tracking-wider">
                        Total
                      </p>
                      <p className="text-[10px] text-white/40">All inclusive</p>
                    </div>
                    <p className="font-display text-3xl font-bold text-accent">
                      ₹{grandTotal}
                    </p>
                  </div>
                </div>

                {/* Continue CTA */}
                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(214,255,62,0.45)] cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-white/50">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span>Instant Membership Activation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
