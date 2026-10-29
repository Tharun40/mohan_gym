import { useState } from "react";
import { Plus, Edit2, Trash2, Check, Sparkles, X, Power } from "lucide-react";
import { useGymData } from "../../context/GymDataContext";

export default function AdminMemberships() {
  const { plans, savePlan, deletePlan, togglePlanActive } = useGymData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "3 Months",
    durationMonths: 3,
    description: "",
    features: "Full Gym Floor Access\nLocker Room & Showers\nWorkout Chart Included",
    popular: false,
    active: true
  });

  const handleOpenAdd = () => {
    setEditingPlan(null);
    setForm({
      name: "",
      price: "",
      duration: "3 Months",
      durationMonths: 3,
      description: "",
      features: "Full Gym Floor Access\nLocker Room & Showers\nWorkout Chart Included",
      popular: false,
      active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingPlan(p);
    setForm({
      name: p.name,
      price: p.price,
      duration: p.duration,
      durationMonths: p.durationMonths || 3,
      description: p.description || "",
      features: Array.isArray(p.features) ? p.features.join("\n") : p.features || "",
      popular: Boolean(p.popular),
      active: p.active !== false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const featuresList = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    await savePlan({
      id: editingPlan?.id,
      name: form.name,
      price: Number(form.price),
      duration: form.duration,
      durationMonths: Number(form.durationMonths) || 3,
      description: form.description,
      features: featuresList,
      popular: form.popular,
      active: form.active
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Membership Plans & Pricing
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Centrally manage subscription durations, pricing, and perks visible across the entire app.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-glow transition hover:scale-105 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Plans List Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const isActive = p.active !== false;

          return (
            <div
              key={p.id || p.name}
              className={`relative flex flex-col justify-between rounded-3xl border p-7 backdrop-blur-2xl transition-all ${
                isActive
                  ? "border-white/10 bg-white/[0.03] shadow-glass"
                  : "border-white/5 bg-white/[0.01] opacity-60"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-0.5 text-[9px] font-bold tracking-wider text-black shadow-glow">
                  <Sparkles className="h-3 w-3" />
                  MOST POPULAR
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
                    <span className="text-xs text-white/50">{p.duration}</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {isActive ? "Active" : "Disabled"}
                  </span>
                </div>

                <p className="mt-4 font-display text-3xl font-bold text-white">₹{p.price}</p>
                <p className="mt-2 text-xs text-white/60">{p.description}</p>

                <div className="mt-6 border-t border-white/10 pt-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    Included Features
                  </p>
                  {p.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                      <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => togglePlanActive(p.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "text-white/60 hover:text-amber-400 bg-white/5"
                      : "text-emerald-400 bg-emerald-500/10"
                  }`}
                  title={isActive ? "Disable Plan" : "Enable Plan"}
                >
                  <Power className="h-3.5 w-3.5" />
                  <span>{isActive ? "Disable" : "Enable"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(p)}
                    className="rounded-xl border border-white/15 bg-white/5 p-2 text-white/70 hover:border-accent hover:text-accent transition"
                    title="Edit plan"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => deletePlan(p.id)}
                    className="rounded-xl border border-white/15 bg-white/5 p-2 text-white/40 hover:border-red-500/40 hover:text-red-400 transition"
                    title="Delete plan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Plan Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#0E0E0E] p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">
                {editingPlan ? "Edit Membership Plan" : "Create New Membership Plan"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diamond Plan"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1999"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Duration Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 Months"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Duration in Months
                  </label>
                  <input
                    type="number"
                    required
                    value={form.durationMonths}
                    onChange={(e) => setForm({ ...form, durationMonths: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Plan Description
                </label>
                <input
                  type="text"
                  placeholder="Short tagline explaining this package..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-accent focus:outline-none resize-none font-mono"
                  placeholder="Full Floor Access&#10;Locker & Showers&#10;Diet Chart"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <span className="text-white text-xs">Mark as Most Popular</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <span className="text-white text-xs">Active on Landing Page</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-5 py-2 text-xs font-bold text-black shadow-glow"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
