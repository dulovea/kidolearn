import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { MATH_LEVELS } from "@/data/math-levels";
import { GEOGRAPHY_LEVELS } from "@/data/geography-levels";
import { HISTORY_LEVELS } from "@/data/history-levels";
import { getProgress, isLevelUnlocked } from "@/lib/progress";
import type { ModuleId, Level } from "@/types/exercise";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ childId: z.string() });

export const Route = createFileRoute("/child/module/$moduleId/levels")({
  validateSearch: searchSchema,
  component: LevelsPage,
});

const MODULE_META: Record<string, { emoji: string; title: string; bg: string }> = {
  math:      { emoji:"🔢", title:"Maths & Intelligence", bg:"bg-indigo-500" },
  geography: { emoji:"🌍", title:"Géographie",           bg:"bg-sky-500" },
  history:   { emoji:"📜", title:"Histoire & Culture",   bg:"bg-amber-600" },
};

function getLevels(moduleId: string): Level[] {
  if (moduleId === "math")      return MATH_LEVELS;
  if (moduleId === "geography") return GEOGRAPHY_LEVELS;
  if (moduleId === "history")   return HISTORY_LEVELS;
  return [];
}

function LevelsPage() {
  const navigate = useNavigate();
  const { moduleId } = Route.useParams();
  const { childId } = Route.useSearch();
  const levels = getLevels(moduleId);
  const meta = MODULE_META[moduleId] ?? { emoji:"📚", title:"Module", bg:"bg-slate-500" };
  const progress = getProgress(childId);

  return (
    <div className="child-space min-h-screen bg-gradient-to-b from-child-bg to-indigo-50 px-4 py-6">
      <header className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate({ to: "/child/home", search: { childId } })}
          className="rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-white">
          ← Retour
        </button>
        <span className="text-2xl">{meta.emoji}</span>
        <h1 className="text-xl font-extrabold text-child-primary">{meta.title}</h1>
      </header>

      <div className="flex flex-col gap-3 max-w-md mx-auto">
        {levels.map((level) => {
          const unlocked = isLevelUnlocked(childId, moduleId as ModuleId, level.id);
          const lp = progress.levels[`${moduleId}-${level.id}`];
          const completed = lp?.completed ?? false;
          const stars = lp?.stars ?? 0;
          const isCurrent = unlocked && !completed;

          return (
            <button key={level.id}
              onClick={() => {
                if (!unlocked) return;
                navigate({
                  to: "/child/module/$moduleId/level/$levelId/play",
                  params: { moduleId, levelId: String(level.id) },
                  search: { childId },
                });
              }}
              className={cn(
                "rounded-2xl p-4 flex items-center gap-4 transition border-2 active:scale-95",
                unlocked
                  ? isCurrent
                    ? "bg-yellow-50 border-yellow-400 shadow-md"
                    : completed
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-child-primary"
                  : "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
              )}>
              {/* Number badge */}
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg shrink-0",
                isCurrent ? "bg-yellow-400 text-white" :
                completed ? "bg-blue-500 text-white" :
                unlocked ? "bg-child-primary text-white" : "bg-slate-300 text-slate-500"
              )}>
                {unlocked ? level.id : "🔒"}
              </div>
              {/* Info */}
              <div className="flex-1 text-left">
                <p className="font-bold text-slate-800 text-sm">{level.label}</p>
                {level.schoolYear && <p className="text-xs text-slate-500">{level.schoolYear}</p>}
                {completed && lp && (
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">
                    Meilleur score : {lp.bestScore}/{level.exercises.length}
                  </p>
                )}
              </div>
              {/* Stars */}
              {completed && (
                <div className="flex gap-0.5">
                  {[1,2,3].map((s) => (
                    <span key={s} className={cn("text-xl", s <= stars ? "text-yellow-400" : "text-slate-200")}>⭐</span>
                  ))}
                </div>
              )}
              {isCurrent && <span className="text-yellow-500 text-xl animate-bounce-slow">▶</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
