import { useState } from "react";
import { Search, Filter, User, Phone, Mail, ShieldCheck, ShieldAlert, Edit2, CheckCircle2, X } from "lucide-react";
import { useGymData } from "../../context/GymDataContext";
import { db } from "../../services/db";

export default function AdminMembers() {
  const { members, memberships, payments, toggleMemberStatus, refreshData } = useGymData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [editingMember, setEditingMember] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "", fitnessGoals: "" });

  const nonAdminMembers = members.filter((m) => m.role !== "admin");

  const filteredMembers = nonAdminMembers.filter((m) => {
    const activeMem = memberships.find((mem) => mem.userId === m.id && mem.status === "active");
    const isMemberActive = Boolean(activeMem);

    if (statusFilter === "active" && !isMemberActive) return false;
    if (statusFilter === "expired" && isMemberActive) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name?.toLowerCase().includes(q);
      const matchEmail = m.email?.toLowerCase().includes(q);
      const matchPhone = m.phone?.toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone;
    }
    return true;
  });

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setEditForm({
      name: m.name || "",
      phone: m.phone || "",
      fitnessGoals: m.fitnessGoals || ""
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingMember) return;
    await db.updateUser({
      ...editingMember,
      name: editForm.name,
      phone: editForm.phone,
      fitnessGoals: editForm.fitnessGoals
    });
    await refreshData();
    setEditingMember(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Member Directory & Management
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          Inspect athlete records, membership statuses, contact info, and activate/deactivate passes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-xs text-white placeholder-white/30 focus:border-accent focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {["all", "active", "expired"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
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

      {/* Members Grid / Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((m) => {
          const userMem =
            memberships.find((mem) => mem.userId === m.id && mem.status === "active") ||
            memberships.find((mem) => mem.userId === m.id);

          const isActive = userMem?.status === "active";
          const userPayCount = payments.filter((p) => p.userId === m.id).length;

          return (
            <div
              key={m.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-sm font-bold text-accent border border-white/10">
                      {m.name ? m.name.charAt(0).toUpperCase() : "M"}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">{m.name}</h3>
                      <span className="text-[11px] text-white/50">{m.email}</span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isActive
                        ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {isActive ? "Active" : "Expired"}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-xs border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Phone:</span>
                    <span className="font-medium text-white">{m.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Current Plan:</span>
                    <span className="font-bold text-accent">{userMem?.planName || "None"}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Expiry Date:</span>
                    <span className="text-white">{userMem?.endDate || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Payments:</span>
                    <span className="text-white">{userPayCount} recorded</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 border-t border-white/10 pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => toggleMemberStatus(m.id)}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold tracking-wider uppercase transition ${
                    isActive
                      ? "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      : "border border-accent/40 bg-accent/15 text-accent hover:bg-accent hover:text-black"
                  }`}
                >
                  {isActive ? "Deactivate" : "Activate Pass"}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(m)}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 hover:text-white hover:border-white/30 transition"
                  title="Edit member"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Member Modal */}
      {editingMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setEditingMember(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/20 bg-[#0E0E0E] p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">Edit Member Details</h3>
              <button onClick={() => setEditingMember(null)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Member Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Fitness Goals / Notes
                </label>
                <textarea
                  rows={3}
                  value={editForm.fitnessGoals}
                  onChange={(e) => setEditForm({ ...editForm, fitnessGoals: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-5 py-2 text-xs font-bold text-black shadow-glow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
