import { Utensils, Flame, Sparkles, Clock, Check } from "lucide-react";
import { DIET_PLAN } from "../../services/seedData";

export default function MemberDiet() {
  const { dailyTarget, meals } = DIET_PLAN;

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider mb-2">
          <Sparkles className="h-3 w-3" />
          NUTRITION ARCHITECTURE
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Customized Athlete Diet Blueprint
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          Precision daily calorie and macronutrient split synchronized with your resistance training windows.
        </p>
      </div>

      {/* Macro Target Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-accent/40 bg-accent/[0.05] p-5 shadow-glow">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">DAILY CALORIES</span>
          <p className="mt-2 font-display text-3xl font-bold text-white">{dailyTarget.calories}</p>
          <span className="text-[10px] text-white/50">Maintenance & lean gain</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">PROTEIN TARGET</span>
          <p className="mt-2 font-display text-3xl font-bold text-white">{dailyTarget.protein}</p>
          <span className="text-[10px] text-white/50">2.0g per kg bodyweight</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">CARBOHYDRATES</span>
          <p className="mt-2 font-display text-3xl font-bold text-white">{dailyTarget.carbs}</p>
          <span className="text-[10px] text-white/50">Sustained glycogen refill</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">HEALTHY FATS</span>
          <p className="mt-2 font-display text-3xl font-bold text-white">{dailyTarget.fats}</p>
          <span className="text-[10px] text-white/50">Hormonal balance</span>
        </div>
      </div>

      {/* Meals Timeline List */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white">
          Daily Meal Schedule
        </h2>

        <div className="grid gap-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl transition hover:border-white/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent font-bold text-xs">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{meal.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-white/50">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-lg bg-white/5 px-2.5 py-1 text-white/80">
                    <strong className="text-white">{meal.calories}</strong> kcal
                  </span>
                  <span className="rounded-lg bg-accent/15 px-2.5 py-1 font-bold text-accent">
                    {meal.protein} Protein
                  </span>
                </div>
              </div>

              {/* Items in meal */}
              <ul className="mt-4 space-y-2 text-xs text-white/80">
                {meal.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
