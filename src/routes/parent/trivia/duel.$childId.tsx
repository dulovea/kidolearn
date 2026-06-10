import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { getDailyQuestions, type TriviaQuestion } from "@/data/trivia-questions";
import { generateParentTrivia, type AiTriviaQuestion } from "@/lib/anthropic";
import { cn } from "@/lib/utils";
import { launchConfetti } from "@/lib/confetti";

export const Route = createFileRoute("/parent/trivia/duel/$childId")({
  component: DuelPage,
});

type CombinedQuestion = TriviaQuestion | (AiTriviaQuestion & { id: string });

function DuelPage() {
  const navigate = useNavigate();
  const { childId } = Route.useParams();
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  const [phase, setPhase] = useState<"loading" | "parent-turn" | "child-turn" | "results">("loading");
  const [parentQuestions, setParentQuestions] = useState<CombinedQuestion[]>([]);
  const [childQuestions, setChildQuestions] = useState<TriviaQuestion[]>([]);
  const [parentScore, setParentScore] = useState(0);
  const [childScore, setChildScore] = useState(0);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [childName, setChildName] = useState("l'enfant");

  useEffect(() => {
    async function init() {
      // Fetch child name
      const { data } = await (supabase.from("child_profiles" as any).select("name").eq("id", childId).single() as any);
      if (data) setChildName((data as any).name);

      const aiQs = await generateParentTrivia(5);
      const fallback = getDailyQuestions(today, childId).slice(0, 5);
      const pQs: CombinedQuestion[] = aiQs.length >= 5
        ? aiQs.slice(0, 5).map((q, i) => ({ ...q, id: `ai-${i}` }))
        : fallback;

      const cQs = getDailyQuestions(today, childId + "-duel").slice(0, 5);
      setParentQuestions(pQs);
      setChildQuestions(cQs);
      setPhase("parent-turn");
    }
    init();
  }, [childId, today]);

  function getQuestion(): CombinedQuestion {
    return phase === "parent-turn" ? parentQuestions[idx] : childQuestions[idx];
  }

  function handle(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const q = getQuestion();
    if (i === q.correctIndex) {
      if (phase === "parent-turn") setParentScore((s) => s + 1);
      else setChildScore((s) => s + 1);
    }
  }

  function next() {
    const q = getQuestion();
    const correct = selected === q.correctIndex;
    const newScore = (phase === "parent-turn" ? parentScore : childScore) + (correct ? 0 : 0);

    if (idx + 1 >= 5) {
      if (phase === "parent-turn") {
        setPhase("child-turn");
        setIdx(0);
        setAnswered(false);
        setSelected(null);
      } else {
        setPhase("results");
        if (user) {
          supabase.from("duel_sessions" as any).insert({
            parent_id: user.id,
            child_id: childId,
            parent_score: parentScore,
            child_score: childScore + (selected === q.correctIndex ? 1 : 0),
            played_at: new Date().toISOString(),
          } as any).then(() => {});
        }
        const finalChild = childScore + (selected === q.correctIndex ? 1 : 0);
        if (finalChild >= parentScore) launchConfetti();
      }
    } else {
      setIdx((i) => i + 1);
      setAnswered(false);
      setSelected(null);
    }
    // sync score for correct answer counted in handle
    void newScore;
  }

  if (phase === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-parent-bg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-parent-accent border-t-transparent" />
        <p className="text-sm text-slate-500">Préparation du duel…</p>
      </div>
    );
  }

  if (phase === "results") {
    const finalChild = childScore;
    const parentWins = parentScore > finalChild;
    const tie = parentScore === finalChild;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-parent-bg px-6">
        <div className="text-7xl">{tie ? "🤝" : parentWins ? "🏆" : "🌟"}</div>
        <h1 className="text-2xl font-bold text-parent-primary">
          {tie ? "Match nul !" : parentWins ? "Parent gagne !" : `${childName} gagne !`}
        </h1>
        <div className="flex gap-6">
          <div className="rounded-2xl bg-white p-6 shadow text-center min-w-[120px]">
            <p className="text-3xl font-extrabold text-parent-accent">{parentScore}/5</p>
            <p className="mt-1 text-sm text-slate-500">Vous</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow text-center min-w-[120px]">
            <p className="text-3xl font-extrabold text-violet-500">{finalChild}/5</p>
            <p className="mt-1 text-sm text-slate-500">{childName}</p>
          </div>
        </div>
        {!parentWins && !tie && (
          <div className="rounded-xl bg-violet-50 border border-violet-200 px-6 py-3 text-center">
            <p className="text-sm font-bold text-violet-700">🎖️ Badge Famille — {childName} remporte le duel !</p>
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={() => navigate({ to: "/parent/dashboard" })}
            className="rounded-lg bg-parent-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
            Dashboard
          </button>
        </div>
      </div>
    );
  }

  const q = getQuestion();
  const isParentTurn = phase === "parent-turn";

  return (
    <div className="min-h-screen bg-parent-bg px-4 py-6">
      <div className="mx-auto max-w-md">
        {/* Turn banner */}
        <div className={cn(
          "mb-4 rounded-xl py-2 text-center text-sm font-bold",
          isParentTurn ? "bg-indigo-100 text-indigo-700" : "bg-violet-100 text-violet-700"
        )}>
          {isParentTurn ? "🧑 Votre tour" : `👦 Tour de ${childName}`} — {idx + 1}/5
        </div>

        {/* Score bar */}
        <div className="mb-5 flex justify-between text-sm font-semibold">
          <span className="text-indigo-600">Vous : {parentScore}</span>
          <span className="text-violet-600">{childName} : {childScore}</span>
        </div>

        {/* Question */}
        <div className="mb-4 rounded-2xl bg-white p-6 shadow">
          {q.category && (
            <span className="mb-2 inline-block rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-600">{q.category}</span>
          )}
          <p className="mt-2 text-lg font-bold text-slate-800">{q.question}</p>
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
                    : isParentTurn
                    ? "border-indigo-400 bg-white text-slate-800 hover:bg-indigo-50"
                    : "border-violet-400 bg-white text-slate-800 hover:bg-violet-50"
                )}>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 flex justify-end">
            <button onClick={next} className={cn(
              "rounded-xl px-6 py-2 font-bold text-white hover:opacity-90",
              isParentTurn ? "bg-indigo-500" : "bg-violet-500"
            )}>
              {idx + 1 >= 5 && phase === "child-turn" ? "Voir résultats" : "Suivant →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
