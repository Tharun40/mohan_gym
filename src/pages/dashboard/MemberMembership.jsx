import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plus
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useGymData } from "../../context/GymDataContext";

export default function MemberMembership() {
  const { user } = useAuth();
  const { memberships, plans } = useGymData();

  const userMemberships = memberships.filter((m) => m.userId === user?.id);
  const activeMembership = userMemberships.find((m) => m.status === "active") || userMemberships[0] || {
    id: "mem-1",
    planName: "Premium Plan",
    price: 1499,
    startDate: "2026-02-12",
    endDate: "2026-08-12",
    status: "active",
    addonsSelected: [
      { name: "Admission Fee", price: 300 },
      { name: "Diet Chart", price: 300 }
    ],
    totalPaid: 2099
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Membership Status & Plans
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          Review your current active package, duration dates, included privileges, and upgrade options.
        </p>
      </div>

      {/* Active Membership Card */}
      <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-accent/[0.06] p-8 shadow-panel backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-0.5 text-[10px] font-bold tracking-wider text-accent uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              CURRENT ACTIVE PLAN
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              {activeMembership.planName}
            </h2>
            <p className="text-xs text-white/60 mt-0.5">
              Total Package Value: <span className="text-white font-bold">₹{activeMembership.totalPaid || activeMembership.price}</span>
            </p>
          </div>

          <Link
            to="/membership"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-glow transition hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            <span>UPGRADE / RENEW PLAN</span>
          </Link>
        </div>

        {/* Details Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Start Date</span>
            <p className="mt-1 font-display text-base font-bold text-white">{activeMembership.startDate}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Expiry Date</span>
            <p className="mt-1 font-display text-base font-bold text-accent">{activeMembership.endDate}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Plan Status</span>
            <p className="mt-1 font-display text-base font-bold text-emerald-400 capitalize">
              {activeMembership.status || "Active"}
            </p>
          </div>
        </div>

        {/* Selected Addons */}
        {activeMembership.addonsSelected && activeMembership.addonsSelected.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
              ATTACHED ADD-ONS & CHARTS
            </p>
            <div className="flex flex-wrap gap-2.5">
              {activeMembership.addonsSelected.map((addon, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white"
                >
                  <Check className="h-3.5 w-3.5 text-accent" />
                  <span>{addon.name}</span>
                  <span className="text-accent font-bold">₹{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Available Plans for Upgrade / Comparison */}
      <div>
        <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white mb-6">
          Explore Available Club Tiers
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-display text-lg font-bold text-white">{p.name}</h4>
                  <span className="text-xs text-white/50">{p.duration}</span>
                </div>
                <p className="mt-4 font-display text-3xl font-bold text-white">₹{p.price}</p>
                <ul className="mt-5 space-y-2 text-xs text-white/70 border-t border-white/10 pt-4">
                  {p.features?.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-accent shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/checkout?plan=${p.id}`}
                className="mt-6 w-full text-center rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-bold tracking-wider text-white hover:border-accent hover:text-accent transition"
              >
                Select & Switch
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
