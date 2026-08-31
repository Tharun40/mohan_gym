import { useState } from "react";
import { Search, Filter, Receipt, DollarSign, Download, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useGymData } from "../../context/GymDataContext";
import { db } from "../../services/db";

export default function AdminPayments() {
  const { payments, refreshData } = useGymData();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalCollected = payments
    .filter((p) => p.status === "Successful")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingCount = payments.filter((p) => p.status === "Pending").length;

  const filteredPayments = payments.filter((p) => {
    if (statusFilter !== "all" && p.status?.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.id?.toLowerCase().includes(q) ||
        p.userName?.toLowerCase().includes(q) ||
        p.planName?.toLowerCase().includes(q) ||
        p.paymentMethod?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = async (paymentId, newStatus) => {
    await db.updatePaymentStatus(paymentId, newStatus);
    await refreshData();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Payment Transactions & Revenue
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          Monitor all member subscription receipts, transaction methods, and status reconciliations.
        </p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-accent/40 bg-accent/[0.05] p-6 shadow-glow backdrop-blur-xl">
          <div className="flex items-center justify-between text-accent text-[10px] font-bold uppercase tracking-wider">
            <span>TOTAL REVENUE COLLECTED</span>
            <Receipt className="h-4 w-4" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">₹{totalCollected}</p>
          <p className="mt-1 text-xs text-white/60">All successful gym memberships</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>TRANSACTIONS COUNT</span>
            <DollarSign className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">{payments.length}</p>
          <p className="mt-1 text-xs text-white/50">Total transaction records</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>PENDING SETTLEMENTS</span>
            <AlertCircle className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-amber-400">{pendingCount}</p>
          <p className="mt-1 text-xs text-white/50">Requires desk cash verification</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by Payment ID, member name, or plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-xs text-white placeholder-white/30 focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "Successful", "Pending", "Failed", "Refunded"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                statusFilter === st
                  ? "bg-accent text-black shadow-glow"
                  : "border border-white/10 bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                <th className="pb-4 pl-2">Payment ID</th>
                <th className="pb-4">Member</th>
                <th className="pb-4">Plan & Add-ons</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Method</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right pr-2">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayments.map((p) => {
                const isSuccess = p.status === "Successful";
                const isPending = p.status === "Pending";

                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 pl-2 font-mono font-bold text-white">{p.id}</td>
                    <td className="py-4 font-semibold text-white">{p.userName || "Member"}</td>
                    <td className="py-4">
                      <p className="font-bold text-white">{p.planName}</p>
                      <p className="text-[11px] text-white/50">{p.addonsSummary || "None"}</p>
                    </td>
                    <td className="py-4 font-display font-bold text-accent text-sm">₹{p.amount}</td>
                    <td className="py-4 text-white/60">{p.date}</td>
                    <td className="py-4 text-white/70">{p.paymentMethod || "UPI"}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                          isSuccess
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : isPending
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <select
                        value={p.status}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                        className="rounded-lg border border-white/15 bg-black/80 px-2 py-1 text-[11px] text-white/80 focus:border-accent focus:outline-none"
                      >
                        <option value="Successful">Successful</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
