import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  Receipt,
  CalendarCheck,
  Award,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Clock,
  Plus
} from "lucide-react";
import { useGymData } from "../../context/GymDataContext";

export default function AdminOverview() {
  const { members, memberships, payments, attendance, plans, recordCheckIn } = useGymData();

  const totalMembers = members.filter((m) => m.role !== "admin").length;
  const activeMembershipsCount = memberships.filter((m) => m.status === "active").length;
  const expiredMembershipsCount = memberships.filter((m) => m.status === "expired").length;

  const totalRevenue = payments
    .filter((p) => p.status === "Successful")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayAttendance = attendance.filter((a) => a.date === todayStr);

  const recentPayments = payments.slice(0, 5);

  // Quick check in form
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [checkInDone, setCheckInDone] = useState(false);

  const handleQuickCheckIn = async (e) => {
    e.preventDefault();
    if (!selectedMemberId) return;
    const targetMember = members.find((m) => m.id === selectedMemberId);
    if (targetMember) {
      await recordCheckIn(targetMember.id, targetMember.name);
      setCheckInDone(true);
      setTimeout(() => setCheckInDone(false), 3000);
      setSelectedMemberId("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Club Performance & Operations
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Real-time membership analytics, attendance logs, and revenue metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/memberships"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:border-accent hover:text-accent transition"
          >
            <Plus className="h-4 w-4" />
            <span>New Plan</span>
          </Link>
          <Link
            to="/admin/trainers"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-black shadow-glow transition hover:scale-105"
          >
            <Award className="h-4 w-4" />
            <span>Add Trainer</span>
          </Link>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>TOTAL MEMBERS</span>
            <Users className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">{totalMembers}</p>
          <p className="mt-1 text-[11px] text-white/50">Registered athletes</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>ACTIVE PASSES</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-emerald-400">{activeMembershipsCount}</p>
          <p className="mt-1 text-[11px] text-white/50">Valid memberships</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>EXPIRED PASSES</span>
            <CreditCard className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-amber-400">{expiredMembershipsCount}</p>
          <p className="mt-1 text-[11px] text-white/50">Due for renewal</p>
        </div>

        <div className="rounded-3xl border border-accent/40 bg-accent/[0.05] p-5 shadow-glow backdrop-blur-xl">
          <div className="flex items-center justify-between text-accent text-[10px] font-bold uppercase tracking-wider">
            <span>TOTAL REVENUE</span>
            <Receipt className="h-4 w-4" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">₹{totalRevenue}</p>
          <p className="mt-1 text-[11px] text-white/60">Subscription collections</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>TODAY'S CHECK-INS</span>
            <CalendarCheck className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">{todayAttendance.length}</p>
          <p className="mt-1 text-[11px] text-white/50">Floor entries today</p>
        </div>
      </div>

      {/* Quick Desk Check-in Box */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
              Desk Quick Check-In Tool
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              Select a member arriving at the front desk to immediately stamp their attendance log.
            </p>
          </div>

          <form onSubmit={handleQuickCheckIn} className="flex flex-wrap items-center gap-3">
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="rounded-xl border border-white/15 bg-black/80 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
            >
              <option value="">Select Member...</option>
              {members
                .filter((m) => m.role !== "admin")
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.phone})
                  </option>
                ))}
            </select>

            <button
              type="submit"
              disabled={!selectedMemberId}
              className="rounded-xl bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-glow transition hover:scale-105 disabled:opacity-40 cursor-pointer"
            >
              Stamp Entry
            </button>

            {checkInDone && (
              <span className="text-xs font-bold text-accent animate-pulse">
                ✓ Check-in Logged!
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
          <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
            Recent Subscription Payments
          </h3>
          <Link to="/admin/payments" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
            <span>View All Payments</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                <th className="pb-3 pl-2">Payment ID</th>
                <th className="pb-3">Member</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentPayments.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 pl-2 font-mono font-bold text-white">{p.id}</td>
                  <td className="py-3.5 font-semibold text-white">{p.userName}</td>
                  <td className="py-3.5 text-white/70">{p.planName}</td>
                  <td className="py-3.5 font-display font-bold text-accent text-sm">₹{p.amount}</td>
                  <td className="py-3.5 text-white/50">{p.date}</td>
                  <td className="py-3.5">
                    <span className="inline-flex rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
