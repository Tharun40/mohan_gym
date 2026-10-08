import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, User, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e, customEmail = null, customPass = null) => {
    if (e) e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const loginEmail = customEmail || email;
    const loginPass = customPass || password;

    if (!loginEmail) {
      setError("Please enter your email address.");
      setIsSubmitting(false);
      return;
    }

    const res = await login(loginEmail, loginPass);
    setIsSubmitting(false);

    if (res.success) {
      const fromPath = location.state?.from?.pathname;
      if (fromPath) {
        navigate(fromPath);
      } else if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(res.error || "Invalid credentials.");
    }
  };

  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setEmail("admin@mohangym.com");
      setPassword("admin123");
      handleLogin(null, "admin@mohangym.com", "admin123");
    } else {
      setEmail("member@mohangym.com");
      setPassword("member123");
      handleLogin(null, "member@mohangym.com", "member123");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotModalOpen(false);
      setForgotEmail("");
    }, 2500);
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
            Welcome Back
          </h1>
          <p className="mt-1 text-xs text-white/60">
            Log in to manage your workouts, membership & attendance
          </p>
        </div>

        {/* Login Card */}
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="e.g. member@mohangym.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] text-accent hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>SIGN IN</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 text-center mb-3">
              ONE-CLICK DEMO ACCESS
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("member")}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-xs font-semibold text-white/90 hover:border-accent hover:text-accent transition"
              >
                <User className="h-3.5 w-3.5 text-accent" />
                <span>Member Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 py-2.5 px-3 text-xs font-semibold text-accent hover:bg-accent hover:text-black transition"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          {/* Bottom link to register */}
          <div className="mt-6 text-center text-xs text-white/60">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-accent hover:underline">
              Create an Account
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setForgotModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-white/20 bg-[#0E0E0E] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Reset Password
              </h3>
              <button onClick={() => setForgotModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {forgotSuccess ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-accent mb-2" />
                <p className="text-xs font-bold text-white">Reset Link Sent!</p>
                <p className="text-[11px] text-white/60 mt-1">Check your inbox for password recovery instructions.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="mt-4 space-y-3 text-xs">
                <p className="text-white/60">Enter your registered email address to receive password reset instructions.</p>
                <input
                  type="email"
                  required
                  placeholder="e.g. member@mohangym.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-glow"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
