import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { getDailyQuestions, type TriviaQuestion } from "@/data/trivia-questions";
import { recordTriviaScore, getProgress } from "@/lib/progress";
import { speak } from "@/lib/speech";
import { playCorrect, playTick, resumeAudio } from "@/lib/audio";
import { launchConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ childId: z.string() });

export const Route = createFileRoute("/child/trivia")({
  validateSearch: searchSchema,
  component: TriviaPage,
});

function TriviaPage() {
  const navigate = useNavigate();
  const { childId } = Route.useSearch();
  const today = new Date().toISOString().split("T")[0];
  const questions = getDailyQuestions(today, childId);

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const progress = getProgress(childId);

  const q: TriviaQuestion = questions[idx];

  useEffect(() => {
    resumeAudio();
    const t = setTimeout(() => speak("choice", q.question), 400);
    return () => clearTimeout(t);
  }, [idx, q.question]);

  function handle(i: number) {
    if (answered) return;
    setSelectedIndex(i);
    setAnswered(true);
    const correct = i === q.correctIndex;
    if (correct) { playCorrect(); launchConfetti(); setScore((s) => s + 1); }
    else playTick();
  }

  function next() {
    if (idx + 1 >= questions.length) {
      const finalScore = score + (selectedIndex === q.correctIndex ? 1 : 0);
      recordTriviaScore(childId, finalScore);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setAnswered(false);
      setSelectedIndex(null);
    }
  }

  if (done) {
    const finalScore = score;
    return (
      <div className="child-space min-h-screen bg-gradient-to-b from-violet-50 to-pink-50 flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-7xl animate-pop">🧠</div>
        <h1 className="text-3xl font-extrabold text-violet-700">Trivia terminé !</h1>
        <div className="bg-white rounded-3xl shadow px-10 py-6 text-center">
          <p className="text-5xl font-extrabold text-violet-600">{finalScore}<span className="text-2xl text-slate-400">/10</span></p>
          <p className="text-slate-500 mt-2">Série : {progress.triviaStreak} jour{progress.triviaStreak > 1 ? "s" : ""} 🔥</p>
        </div>
        {finalScore >= 7 && <p className="text-green-600 font-bold text-lg">Excellent ! 🎉</p>}
        <button onClick={() => navigate({ to: "/child/home", search: { childId } })}
          className="rounded-2xl bg-violet-600 text-white px-8 py-3 font-bold text-lg hover:opacity-90">
          🏠 Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="child-space min-h-screen bg-gradient-to-b from-violet-50 to-pink-50 flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate({ to: "/child/home", search: { childId } })}
          className="rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600">← Retour</button>
        <div className="flex-1 bg-white/60 rounded-full h-3">
          <div className="bg-violet-500 h-3 rounded-full transition-all"
            style={{ width: `${((idx + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-bold text-slate-600">{idx + 1}/10</span>
      </div>

      {/* Category badge */}
      <div className="flex justify-center mb-3">
        <span className="rounded-full bg-violet-100 px-4 py-1 text-sm font-semibold text-violet-700">{q.category}</span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl shadow p-6 mb-5 mx-auto w-full max-w-md">
        <button onClick={() => speak("choice", q.question)} className="mb-3 text-xs text-violet-500 flex items-center gap-1">🔊 Répéter</button>
        <p className="text-xl font-bold text-slate-800 text-center">{q.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = i === selectedIndex;
          return (
            <button key={i} onClick={() => handle(i)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 py-3 px-5 font-bold text-left transition active:scale-95 text-base",
                answered ? isCorrect ? "border-green-500 bg-green-100 text-green-800"
                  : isSelected ? "border-red-400 bg-red-100 text-red-700"
                  : "border-slate-200 text-slate-400"
                : "border-violet-400 bg-white text-violet-800 hover:bg-violet-50"
              )}>{opt}</button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div className="mt-5 mx-auto w-full max-w-md bg-white rounded-2xl p-4 border-2 border-violet-200">
          <p className="text-sm font-bold text-violet-700 mb-1">💡 Le saviez-vous ?</p>
          <p className="text-sm text-slate-600">{q.fun}</p>
          <div className="flex justify-end mt-3">
            <button onClick={next} className="rounded-2xl bg-violet-600 text-white px-6 py-2 font-bold hover:opacity-90">
              {idx + 1 >= questions.length ? "Voir résultat" : "Suivant →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
