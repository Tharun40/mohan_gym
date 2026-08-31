import { useState } from "react";
import { Search, CalendarCheck, Clock, UserCheck, CheckCircle2, UserX } from "lucide-react";
import { useGymData } from "../../context/GymDataContext";

export default function AdminAttendance() {
  const { attendance, members, recordCheckIn, recordCheckOut } = useGymData();

  const [searchMember, setSearchMember] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [stampSuccess, setStampSuccess] = useState(false);

  const nonAdminMembers = members.filter((m) => m.role !== "admin");

  const handleRecordCheckIn = async (e) => {
    e.preventDefault();
    if (!selectedMemberId) return;
    const target = nonAdminMembers.find((m) => m.id === selectedMemberId);
    if (target) {
      await recordCheckIn(target.id, target.name);
      setStampSuccess(true);
      setTimeout(() => setStampSuccess(false), 3000);
      setSelectedMemberId("");
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const todayRecords = attendance.filter((a) => a.date === todayStr);

  const filteredAttendance = attendance.filter((a) => {
    if (searchMember.trim()) {
      const q = searchMember.toLowerCase();
      return a.userName?.toLowerCase().includes(q) || a.date?.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Front Desk Attendance & Check-In System
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          Record incoming athletes, stamp exit timestamps, and monitor floor density.
        </p>
      </div>

      {/* Desk Stamp Card */}
      <div className="rounded-3xl border border-accent/40 bg-accent/[0.04] p-7 shadow-glow backdrop-blur-xl">
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-accent mb-2">
          Desk Quick Check-In Station
        </h3>
        <p className="text-xs text-white/60 mb-5">
          Select an arriving member to record an instant entry timestamp.
        </p>

        <form onSubmit={handleRecordCheckIn} className="flex flex-wrap items-center gap-4">
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="flex-1 min-w-[260px] rounded-2xl border border-white/20 bg-black/80 px-4 py-3 text-xs text-white focus:border-accent focus:outline-none"
          >
            <option value="">Select athlete entering floor...</option>
            {nonAdminMembers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.phone} ({m.email})
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={!selectedMemberId}
            className="rounded-2xl bg-accent px-8 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-glow transition hover:scale-105 disabled:opacity-40 cursor-pointer"
          >
            Record Entry
          </button>

          {stampSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-accent animate-bounce">
              <CheckCircle2 className="h-4 w-4" /> Check-in stamped successfully!
            </span>
          )}
        </form>
      </div>

      {/* Stats summary */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">TODAY'S CHECK-INS</span>
          <p className="mt-2 font-display text-3xl font-bold text-white">{todayRecords.length} Athletes</p>
          <span className="text-[10px] text-white/50">{todayStr}</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">ACTIVE ON FLOOR</span>
          <p className="mt-2 font-display text-3xl font-bold text-accent">
            {todayRecords.filter((r) => !r.checkOut).length} Training
          </p>
          <span className="text-[10px] text-white/50">Currently active sessions</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">TOTAL ALL-TIME LOGS</span>
          <p className="mt-2 font-display text-3xl font-bold text-white">{attendance.length} Stamped</p>
          <span className="text-[10px] text-white/50">Historic check-in records</span>
        </div>
      </div>

      {/* Attendance History Log */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 border-b border-white/10 pb-4">
          <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
            Daily Attendance Log
          </h3>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search member or date..."
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/60 pl-9 pr-3 py-2 text-xs text-white focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                <th className="pb-3 pl-2">Member</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Check-In</th>
                <th className="pb-3">Check-Out</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 pl-2 font-bold text-white">{rec.userName || "Member"}</td>
                  <td className="py-3.5 text-white/70">{rec.date}</td>
                  <td className="py-3.5 text-accent font-semibold">{rec.checkIn}</td>
                  <td className="py-3.5 text-white/70">
                    {rec.checkOut ? (
                      rec.checkOut
                    ) : (
                      <span className="inline-flex rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        In Progress
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    {!rec.checkOut ? (
                      <button
                        type="button"
                        onClick={() => recordCheckOut(rec.id)}
                        className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white hover:border-accent hover:text-accent transition"
                      >
                        Stamp Exit
                      </button>
                    ) : (
                      <span className="text-[11px] text-white/40">Completed</span>
                    )}
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
