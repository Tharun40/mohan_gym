import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[^0-9]/g, "");
    return cleaned.length >= 10;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password
    });
    setIsSubmitting(false);

    if (res.success) {
      const plan = searchParams.get("plan");
      const addons = searchParams.get("addons");
      if (plan) {
        navigate(`/checkout?plan=${plan}${addons ? `&addons=${addons}` : ""}`);
      } else {
        navigate("/membership");
      }
    } else {
      setError(res.error || "Failed to create account.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-canvas px-4 py-12 text-white antialiased font-body selection:bg-accent selection:text-black">
      {/* Background glow flow */}
      <div className="fixed inset-0 -z-10 bg-hero-radial" />
      <div className="fixed inset-x-0 top-1/4 -z-10 mx-auto h-[28rem] max-w-5xl rounded-full bg-accent/[0.06] blur-[160px]" />

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img
              src={logo}
              alt="Mohan Gym logo"
              className="h-12 w-12 rounded-full border border-white/20 object-cover transition-transform group-hover:scale-105"
            />
            <div className="text-left">
              <p className="font-display text-lg font-bold tracking-[0.2em] text-white">
                MOHAN GYM
              </p>
              <p className="text-[10px] font-medium tracking-[0.28em] text-accent">
                PERFORMANCE CLUB
              </p>
            </div>
          </Link>
          <h1 className="mt-6 font-display text-2xl font-bold text-white tracking-wide">
            Start Your Membership
          </h1>
          <p className="mt-1 text-xs text-white/60">
            Create an athlete profile to access workouts, diet & check-ins
          </p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-panel backdrop-blur-2xl"
        >
          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tharun"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="e.g. tharun@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9840123456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                  Confirm *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                  <input
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>CREATING ACCOUNT...</span>
              ) : (
                <>
                  <span>CREATE ACCOUNT & PROCEED</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom link to login */}
          <div className="mt-6 text-center text-xs text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-accent hover:underline">
              Log In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
