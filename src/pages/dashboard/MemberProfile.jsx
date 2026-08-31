import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Heart, Shield, CheckCircle2, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function MemberProfile() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "Tharun",
    email: user?.email || "member@mohangym.com",
    phone: user?.phone || "+91 98401 23456",
    fitnessGoals: user?.fitnessGoals || "Hypertrophy, Strength & Lean Muscle Mass",
    emergencyContact: user?.emergencyContact || "+91 94440 98765"
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Athlete Profile & Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          Manage your personal details, emergency contact, and training goals.
        </p>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-xs font-semibold text-accent"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Profile information updated successfully.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-glass backdrop-blur-xl space-y-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
            Personal Information
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full rounded-xl border border-white/10 bg-black/30 pl-11 pr-4 py-3 text-xs text-white/50 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
                Emergency Contact Number
              </label>
              <div className="relative">
                <Heart className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="tel"
                  placeholder="+91 98000 00000"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-11 pr-4 py-3 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Goals & Preferences */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-glass backdrop-blur-xl space-y-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
            Training Goals & Specialization
          </h3>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
              Primary Fitness Ambition
            </label>
            <textarea
              rows={3}
              value={formData.fitnessGoals}
              onChange={(e) => setFormData({ ...formData, fitnessGoals: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/60 p-4 text-xs text-white focus:border-accent focus:outline-none resize-none"
              placeholder="e.g. Muscle gain, fat loss, athletic conditioning, contest prep..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-105 hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] disabled:opacity-50 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "SAVING CHANGES..." : "SAVE PROFILE UPDATES"}</span>
        </button>
      </form>
    </div>
  );
}
