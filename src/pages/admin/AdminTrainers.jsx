import { useState } from "react";
import { Plus, Edit2, Trash2, Award, Dumbbell, Instagram, X, Image as ImageIcon } from "lucide-react";
import { useGymData } from "../../context/GymDataContext";

export default function AdminTrainers() {
  const { trainers, saveTrainer, deleteTrainer } = useGymData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "5+ Years",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
    bio: "",
    programs: "Strength Sculpt, Hypertrophy Mastery",
    instagram: "@coach",
    active: true
  });

  const handleOpenAdd = () => {
    setEditingTrainer(null);
    setForm({
      name: "",
      specialization: "Strength & Conditioning Specialist",
      experience: "6+ Years",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
      bio: "Certified fitness professional dedicated to form mastery and progressive strength protocols.",
      programs: "Strength Sculpt, Athletic Burn",
      instagram: "@coach_fit",
      active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTrainer(t);
    setForm({
      name: t.name,
      specialization: t.specialization,
      experience: t.experience || "5+ Years",
      image: t.image,
      bio: t.bio || "",
      programs: Array.isArray(t.programs) ? t.programs.join(", ") : t.programs || "",
      instagram: t.instagram || "",
      active: t.active !== false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const programsList = form.programs
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    await saveTrainer({
      id: editingTrainer?.id,
      name: form.name,
      specialization: form.specialization,
      experience: form.experience,
      image: form.image,
      bio: form.bio,
      programs: programsList,
      instagram: form.instagram,
      active: form.active
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Trainer & Coach Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Manage your certified coaching roster. Changes synchronize automatically to the public landing page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-glow transition hover:scale-105 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Coach</span>
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((t) => (
          <div
            key={t.id || t.name}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-glass backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              {/* Photo & Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-black/40">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-full w-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent" />

                <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-3 py-0.5 text-[10px] font-bold text-accent backdrop-blur-md">
                  <Award className="h-3 w-3" />
                  {t.experience || "5+ Years"}
                </span>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-white">{t.name}</h3>
                  <span className="text-xs text-white/40">{t.instagram}</span>
                </div>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {t.specialization}
                </p>

                <p className="mt-3 text-xs text-white/60 line-clamp-3 leading-relaxed">
                  {t.bio}
                </p>

                {t.programs && t.programs.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                    {t.programs.map((p, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/80"
                      >
                        <Dumbbell className="h-2.5 w-2.5 text-accent" />
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 border-t border-white/10 mt-4 flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => handleOpenEdit(t)}
                className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:border-accent hover:text-accent transition"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => deleteTrainer(t.id)}
                className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Trainer Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#0E0E0E] p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base font-bold text-white">
                {editingTrainer ? "Edit Coach Profile" : "Add New Coach"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Coach Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8+ Years"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Specialization Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Powerlifting & Hypertrophy Master"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Photo URL
                </label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none font-mono"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Programs (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Strength Sculpt, Power Block"
                    value={form.programs}
                    onChange={(e) => setForm({ ...form, programs: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @coach_mohan"
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                  Coach Bio
                </label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 p-3 text-xs text-white focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-5 py-2 text-xs font-bold text-black shadow-glow"
                >
                  Save Coach
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
