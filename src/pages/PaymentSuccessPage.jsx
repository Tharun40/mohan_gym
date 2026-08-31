import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Download, Calendar, ShieldCheck, Dumbbell } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const paymentState = location.state || {};

  const payment = paymentState.payment || {
    id: `PAY-${new Date().getFullYear()}-9241`,
    amount: 2099,
    date: new Date().toISOString().split("T")[0],
    paymentReference: "UPI-MOHAN-8921734"
  };

  const plan = paymentState.plan || {
    name: "Premium Plan",
    duration: "6 Months"
  };

  const membership = paymentState.membership || {
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "active"
  };

  const memberName = paymentState.memberName || "Tharun";
  const addons = paymentState.addons || [];

  return (
    <div className="min-h-screen bg-canvas font-body text-white antialiased selection:bg-accent selection:text-black">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 bg-hero-radial" />
      <div className="fixed inset-x-0 top-1/4 -z-10 mx-auto h-[32rem] max-w-6xl rounded-full bg-accent/[0.08] blur-[180px]" />

      <Navbar />

      <main className="pt-36 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-accent/40 bg-white/[0.04] p-8 sm:p-12 text-center shadow-panel backdrop-blur-2xl"
          >
            {/* Success Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-accent bg-accent/20 text-accent shadow-glow">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>

            <span className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-[10px] font-bold tracking-[0.25em] text-accent uppercase">
              PAYMENT SUCCESSFUL
            </span>

            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Welcome to Mohan Gym!
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-md mx-auto">
              Your membership is now <span className="font-bold text-accent">Active</span>, {memberName}. Your workout chart and diet blueprint have been unlocked.
            </p>

            {/* Receipt Summary Box */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 p-6 text-left space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/50 uppercase tracking-wider">Transaction ID</span>
                <span className="font-mono font-bold text-white">{payment.id || "PAY-2026-9241"}</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/50 uppercase tracking-wider">Membership Plan</span>
                <span className="font-bold text-accent">{plan.name} ({plan.duration})</span>
              </div>

              {addons.length > 0 && (
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/50 uppercase tracking-wider">Add-ons</span>
                  <span className="text-white text-right">
                    {addons.map((a) => a.name).join(", ")}
                  </span>
                </div>
              )}

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/50 uppercase tracking-wider">Active Period</span>
                <span className="text-white font-medium">
                  {membership.startDate} → {membership.endDate}
                </span>
              </div>

              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-white uppercase tracking-wider">Amount Paid</span>
                <span className="font-display text-lg text-accent">₹{payment.amount || 2099}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/dashboard"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] cursor-pointer"
              >
                <Dumbbell className="h-4 w-4" />
                <span>OPEN MEMBER DASHBOARD</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-white/50">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>A confirmation invoice has been registered to your profile</span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
