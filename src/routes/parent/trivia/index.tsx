import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { generateParentTrivia, type AiTriviaQuestion } from "@/lib/anthropic";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/trivia/")({
  component: ParentTriviaPage,
});

const TIMER_SECONDS = 20;

function ParentTriviaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [phase, setPhase] = useState<"loading" | "playing" | "done">("loading");
  const [questions, setQuestions] = useState<AiTriviaQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateParentTrivia(10)
      .then((qs) => {
        if (qs.length === 0) {
          setError("Impossible de charger les questions. Vérifiez votre connexion.");
          return;
        }
        setQuestions(qs);
        setPhase("playing");
      })
      .catch(() => setError("Erreur lors du chargement des questions."));
  }, []);

  const advance = useCallback(
    (selectedIdx: number | null) => {
      const q = questions[idx];
      const correct = selectedIdx === q.correctIndex;
      const newScore = score + (correct ? 1 : 0);

      if (idx + 1 >= questions.length) {
        setScore(newScore);
        setPhase("done");
        if (user) {
          supabase.from("parent_trivia_sessions" as any).insert({
            parent_id: user.id,
            score: newScore,
            total: questions.length,
            played_at: new Date().toISOString(),
          } as any).then(() => {});
        }
      } else {
        setScore(newScore);
        setIdx((i) => i + 1);
        setAnswered(false);
        setSelected(null);
        setTimeLeft(TIMER_SECONDS);
      }
    },
    [idx, questions, score, user]
  );

  // Countdown timer
  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timeLeft <= 0) {
      setAnswered(true);
      setSelected(null);
      setTimeout(() => advance(null), 1200);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, answered, timeLeft, advance]);

  function handle(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    setTimeout(() => advance(i), 1200);
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-parent-bg px-6">
        <p className="text-red-500">{error}</p>
        <button onClick={() => navigate({ to: "/parent/dashboard" })}
          className="rounded-lg bg-parent-accent px-5 py-2 text-sm font-semibold text-white">
          Retour
        </button>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-parent-bg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-parent-accent border-t-transparent" />
        <p className="text-sm text-slate-500">Génération des questions par l'IA…</p>
      </div>
    );
  }

  if (phase === "done") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-parent-bg px-6">
        <div className="text-7xl">🏆</div>
        <h1 className="text-2xl font-bold text-parent-primary">Trivia terminé !</h1>
        <div className="rounded-2xl bg-white p-8 shadow text-center">
          <p className="text-5xl font-extrabold text-parent-accent">
            {score}<span className="text-xl text-slate-400">/{questions.length}</span>
          </p>
          <p className="mt-2 text-slate-500">{pct}% de bonnes réponses</p>
          {pct >= 80 && <p className="mt-3 font-bold text-green-600">Excellent ! 🎉</p>}
          {pct >= 50 && pct < 80 && <p className="mt-3 font-bold text-amber-600">Bien joué ! 👏</p>}
          {pct < 50 && <p className="mt-3 font-bold text-slate-500">Continue de t'entraîner ! 💪</p>}
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setPhase("loading"); setIdx(0); setScore(0); setAnswered(false); setSelected(null); setTimeLeft(TIMER_SECONDS);
            generateParentTrivia(10).then((qs) => { setQuestions(qs); setPhase("playing"); }); }}
            className="rounded-lg bg-parent-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
            Rejouer
          </button>
          <button onClick={() => navigate({ to: "/parent/dashboard" })}
            className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Dashboard
          </button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-parent-bg px-4 py-6">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => navigate({ to: "/parent/dashboard" })}
            className="text-sm text-slate-400 hover:text-slate-600">← Quitter</button>
          <span className="text-sm font-semibold text-slate-600">{idx + 1}/{questions.length}</span>
          <div className={cn(
            "rounded-full px-3 py-1 text-sm font-bold tabular-nums",
            timeLeft <= 5 ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"
          )}>
            ⏱ {timeLeft}s
          </div>
        </div>

        {/* Timer bar */}
        <div className="mb-4 h-2 rounded-full bg-slate-200">
          <div className={cn("h-2 rounded-full transition-all",
            timeLeft <= 5 ? "bg-red-400" : "bg-parent-accent")}
            style={{ width: `${timerPct}%` }} />
        </div>

        {/* Category */}
        <div className="mb-3 flex justify-center">
          <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">{q.category}</span>
        </div>

        {/* Question */}
        <div className="mb-5 rounded-2xl bg-white p-6 shadow">
          <p className="text-lg font-bold text-slate-800">{q.question}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = i === selected;
            return (
              <button key={i} onClick={() => handle(i)} disabled={answered}
                className={cn(
                  "rounded-xl border-2 px-5 py-3 text-left font-semibold transition",
                  answered
                    ? isCorrect ? "border-green-500 bg-green-50 text-green-800"
                      : isSelected ? "border-red-400 bg-red-50 text-red-700"
                      : "border-slate-200 text-slate-400"
                    : "border-parent-accent bg-white text-slate-800 hover:bg-indigo-50"
                )}>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Fun fact */}
        {answered && (
          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100">
            <p className="text-xs font-bold text-indigo-600 mb-1">💡 Le saviez-vous ?</p>
            <p className="text-sm text-slate-600">{q.fun}</p>
          </div>
        )}
      </div>
    </div>
  );
}
