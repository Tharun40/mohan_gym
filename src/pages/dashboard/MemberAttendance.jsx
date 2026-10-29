import { useState } from "react";
import { Calendar, CheckCircle2, Clock, QrCode, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useGymData } from "../../context/GymDataContext";

export default function MemberAttendance() {
  const { user } = useAuth();
  const { attendance, recordCheckIn } = useGymData();

  const userAttendance = attendance.filter((a) => a.userId === user?.id);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = async () => {
    if (checkedIn) return;
    await recordCheckIn(user?.id, user?.name || "Tharun");
    setCheckedIn(true);
  };

  const totalCheckIns = userAttendance.length || 18;
  const targetDays = 24;
  const percentage = Math.min(100, Math.round((totalCheckIns / targetDays) * 100));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Club Attendance & Check-ins
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Track your daily workout consistency, entry timestamps, and monthly training streak.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckIn}
          disabled={checkedIn}
          className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all shadow-glow ${
            checkedIn
              ? "bg-white/10 text-white/60 border border-white/10"
              : "bg-accent text-black hover:scale-105 cursor-pointer"
          }`}
        >
          <QrCode className="h-4 w-4" />
          <span>{checkedIn ? "Logged Today" : "Log Check-in Now"}</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>TOTAL CHECK-INS</span>
            <CheckCircle2 className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">{totalCheckIns} Days</p>
          <p className="mt-1 text-xs text-white/50">Recorded across active term</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>MONTHLY CONSISTENCY</span>
            <TrendingUp className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-accent">{percentage}%</p>
          <p className="mt-1 text-xs text-white/50">{totalCheckIns} out of {targetDays} target days</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-wider">
            <span>AVERAGE TIME</span>
            <Clock className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">75 Mins</p>
          <p className="mt-1 text-xs text-white/50">Per workout session</p>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
          Recent Check-in Timestamps
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Check-In Time</th>
                <th className="pb-3">Check-Out Time</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {userAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 pl-2 font-bold text-white">{rec.date}</td>
                  <td className="py-3.5 text-accent font-semibold">{rec.checkIn}</td>
                  <td className="py-3.5 text-white/70">{rec.checkOut || "Active Workout"}</td>
                  <td className="py-3.5">
                    <span className="inline-flex rounded-md bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent border border-accent/30">
                      Verified
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
