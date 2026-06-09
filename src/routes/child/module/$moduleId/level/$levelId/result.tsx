import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  childId: z.string(),
  score: z.string(),
  passed: z.string(),
  total: z.string(),
});

export const Route = createFileRoute("/child/module/$moduleId/level/$levelId/result")({
  validateSearch: searchSchema,
  component: ResultPage,
});

function ResultPage() {
  const navigate = useNavigate();
  const { moduleId, levelId } = Route.useParams();
  const { childId, score, passed, total } = Route.useSearch();

  const scoreNum = parseInt(score);
  const totalNum = parseInt(total);
  const isPassed = passed === "true";
  const pct = Math.round((scoreNum / totalNum) * 100);
  const stars: 0|1|2|3 = scoreNum >= totalNum ? 3 : scoreNum >= 18 ? 3 : scoreNum >= 16 ? 2 : scoreNum >= 12 ? 1 : 0;

  return (
    <div className="child-space min-h-screen bg-gradient-to-b from-child-bg to-indigo-50 flex flex-col items-center justify-center px-6 gap-8">
      <div className="text-center">
        <div className="text-7xl mb-4 animate-pop">{isPassed ? "🎉" : "💪"}</div>
        <h1 className={cn("text-3xl font-extrabold", isPassed ? "text-green-600" : "text-orange-500")}>
          {isPassed ? "Bravo, niveau réussi !" : "Continue comme ça !"}
        </h1>
        <p className="text-slate-500 mt-2">
          {isPassed ? "Tu peux passer au niveau suivant !" : `Il te faut ${16} bonnes réponses pour réussir.`}
        </p>
      </div>

      {/* Score */}
      <div className="bg-white rounded-3xl shadow-md px-10 py-6 text-center">
        <p className="text-5xl font-extrabold text-child-primary">{scoreNum}<span className="text-2xl text-slate-400">/{totalNum}</span></p>
        <p className="text-slate-500 mt-1">{pct}% de bonnes réponses</p>
        <div className="flex gap-2 justify-center mt-3">
          {[1,2,3].map((s) => (
            <span key={s} className={cn("text-3xl", s <= stars ? "text-yellow-400" : "text-slate-200")}>⭐</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={() => navigate({ to: "/child/module/$moduleId/level/$levelId/play", params: { moduleId, levelId }, search: { childId } })}
          className="rounded-2xl bg-child-primary text-white py-3 font-bold text-lg hover:opacity-90 active:scale-95">
          🔄 Rejouer ce niveau
        </button>
        <button onClick={() => navigate({ to: "/child/module/$moduleId/levels", params: { moduleId }, search: { childId } })}
          className="rounded-2xl border-2 border-child-primary text-child-primary py-3 font-bold text-lg hover:bg-child-primary/10 active:scale-95">
          📋 Voir les niveaux
        </button>
        <button onClick={() => navigate({ to: "/child/home", search: { childId } })}
          className="rounded-2xl bg-slate-100 text-slate-600 py-3 font-bold text-base hover:bg-slate-200 active:scale-95">
          🏠 Accueil
        </button>
      </div>
    </div>
  );
}
