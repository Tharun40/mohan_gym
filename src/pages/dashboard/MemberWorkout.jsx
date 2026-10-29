import { useState } from "react";
import { Dumbbell, Flame, Clock, CheckCircle, ChevronRight, Zap } from "lucide-react";
import { WORKOUT_ROUTINE } from "../../services/seedData";

export default function MemberWorkout() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const currentWorkout = WORKOUT_ROUTINE[activeDayIndex];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider mb-2">
            <Zap className="h-3 w-3" />
            PROGRAMMED COACHING CHART
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Weekly Hypertrophy & Strength Split
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Structured 6-day resistance block engineered for progressive overload and muscle symmetry.
          </p>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
        {WORKOUT_ROUTINE.map((item, index) => {
          const isSelected = activeDayIndex === index;
          return (
            <button
              key={item.day}
              type="button"
              onClick={() => setActiveDayIndex(index)}
              className={`flex shrink-0 flex-col items-start rounded-2xl border px-5 py-3 text-left transition-all ${
                isSelected
                  ? "border-accent bg-accent text-black shadow-glow"
                  : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white"
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-black/60" : "text-white/40"}`}>
                {item.day}
              </span>
              <span className="font-display text-sm font-bold mt-0.5">
                {item.muscleGroup.split("&")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Workout Details */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 shadow-glass backdrop-blur-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {currentWorkout.day} FOCUS
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              {currentWorkout.muscleGroup}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>Intensity: <strong className="text-white">{currentWorkout.intensity}</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
              <Clock className="h-4 w-4 text-accent" />
              <span>60–75 Mins</span>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="mt-6 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
            EXERCISE MOVEMENTS & PROTOCOL
          </p>

          <div className="grid gap-3">
            {currentWorkout.exercises.map((ex, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xs font-bold text-accent">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">{ex.name}</h4>
                    <span className="text-[11px] text-white/50">Rest between sets: {ex.rest}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white">
                    <strong className="text-accent">{ex.sets}</strong>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white">
                    <strong className="text-white">{ex.reps}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
