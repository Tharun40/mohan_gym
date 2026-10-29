import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  CreditCard,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Utensils,
  Receipt,
  ArrowRight,
  TrendingUp,
  Clock,
  QrCode
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useGymData } from "../../context/GymDataContext";

export default function MemberOverview() {
  const { user } = useAuth();
  const { memberships, payments, attendance, recordCheckIn } = useGymData();

  const userMembership =
    memberships.find((m) => m.userId === user?.id && m.status === "active") ||
    memberships.find((m) => m.userId === user?.id) || {
      planName: "Premium Membership",
      status: "active",
      startDate: "2026-02-12",
      endDate: "2027-02-12",
      price: 1499
    };

  const userPayments = payments.filter((p) => p.userId === user?.id);
  const recentPayment = userPayments[0] || {
    id: "PAY-2026-8901",
    amount: 2099,
    date: "2026-02-12",
    status: "Successful"
  };

  const userAttendance = attendance.filter((a) => a.userId === user?.id);
  const checkInCount = userAttendance.length || 18;
  const targetDays = 24;

  const [checkedInToday, setCheckedInToday] = useState(false);

  const handleQuickCheckIn = async () => {
    if (checkedInToday) return;
    await recordCheckIn(user?.id, user?.name || "Tharun");
    setCheckedInToday(true);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
            <Sparkles className="h-3 w-3" />
            ATHLETE DASHBOARD
          </div>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Welcome back, <span className="text-accent">{user?.name || "Tharun"}</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Here is your daily training overview, active membership status, and attendance log.
          </p>
        </div>

        <button
          type="button"
          onClick={handleQuickCheckIn}
          disabled={checkedInToday}
          className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all shadow-glow ${
            checkedInToday
              ? "bg-white/10 text-white/60 border border-white/10 cursor-default"
              : "bg-accent text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] cursor-pointer"
          }`}
        >
          {checkedInToday ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Checked-In Today</span>
            </>
          ) : (
            <>
              <QrCode className="h-4 w-4" />
              <span>Record Daily Check-in</span>
            </>
          )}
        </button>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1. Membership Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              MEMBERSHIP
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              {userMembership.status?.toUpperCase() || "ACTIVE"}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold text-white">
            {userMembership.planName || "Premium Membership"}
          </h3>

          <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between text-xs">
            <div>
              <p className="text-white/40 text-[10px] uppercase">Expires</p>
              <p className="font-bold text-white mt-0.5">{userMembership.endDate || "12 Feb 2027"}</p>
            </div>
            <Link
              to="/membership"
              className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
            >
              Renew <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>

        {/* 2. Attendance Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              THIS MONTH'S ATTENDANCE
            </span>
            <Calendar className="h-4 w-4 text-accent" />
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <h3 className="font-display text-3xl font-bold text-white">
              {checkInCount}
            </h3>
            <span className="text-sm font-semibold text-white/50">/ {targetDays} days</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full shadow-glow"
                style={{ width: `${Math.min(100, (checkInCount / targetDays) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-white/50 text-right">
              {Math.round((checkInCount / targetDays) * 100)}% Monthly consistency
            </p>
          </div>
        </motion.div>

        {/* 3. Recent Payment Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              LATEST PAYMENT
            </span>
            <Receipt className="h-4 w-4 text-accent" />
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <h3 className="font-display text-3xl font-bold text-white">
                ₹{recentPayment.amount}
              </h3>
              <p className="text-xs text-white/50 mt-0.5">{recentPayment.date}</p>
            </div>
            <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
              {recentPayment.status}
            </span>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] text-white/40">{recentPayment.id}</span>
            <Link to="/dashboard/payments" className="font-bold text-accent hover:underline">
              View History
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div>
        <h2 className="font-display text-base font-bold uppercase tracking-wider text-white mb-4">
          Quick Access Hub
        </h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/dashboard/workout"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition">
              <Dumbbell className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-white">Workout Plan</h4>
            <p className="mt-1 text-xs text-white/60">
              6-day targeted muscle split with exercise routines.
            </p>
          </Link>

          <Link
            to="/dashboard/diet"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition">
              <Utensils className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-white">Diet Blueprint</h4>
            <p className="mt-1 text-xs text-white/60">
              Daily macro breakdown and nutrition meal schedule.
            </p>
          </Link>

          <Link
            to="/dashboard/attendance"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition">
              <Calendar className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-white">Attendance Log</h4>
            <p className="mt-1 text-xs text-white/60">
              View historical check-in timings and monthly streaks.
            </p>
          </Link>

          <Link
            to="/dashboard/profile"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-white">Athlete Profile</h4>
            <p className="mt-1 text-xs text-white/60">
              Update phone, goals, and emergency contact details.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
