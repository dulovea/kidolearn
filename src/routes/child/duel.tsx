import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { getDailyQuestions, type TriviaQuestion } from "@/data/trivia-questions";
import { speak } from "@/lib/speech";
import { playCorrect, playTick, resumeAudio } from "@/lib/audio";
import { launchConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";
import { getCachedChildProfiles } from "@/lib/offline";
import type { ChildProfile } from "@/types";

const searchSchema = z.object({ childId: z.string(), siblingId: z.string() });

export const Route = createFileRoute("/child/duel")({
  validateSearch: searchSchema,
  component: ChildDuelPage,
});

const duelKey = (childId: string, date: string) => `kidolearn:duel:${date}:${childId}`;

function ChildDuelPage() {
  const navigate = useNavigate();
  const { childId, siblingId } = Route.useSearch();
  const today = new Date().toISOString().split("T")[0];
  const questions = getDailyQuestions(today, "family-duel");

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [sibling, setSibling] = useState<ChildProfile | null>(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [siblingScore, setSiblingScore] = useState<number | null>(null);

  useEffect(() => {
    resumeAudio();
    const profiles = getCachedChildProfiles() as ChildProfile[];
    setChild(profiles.find((p) => p.id === childId) ?? null);
    setSibling(profiles.find((p) => p.id === siblingId) ?? null);
    const raw = localStorage.getItem(duelKey(siblingId, today));
    if (raw) setSiblingScore(JSON.parse(raw).score as number);
  }, [childId, siblingId, today]);

  useEffect(() => {
    if (!questions[idx]) return;
    const t = setTimeout(() => speak("choice", questions[idx].question), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function handle(i: number) {
    if (answered) return;
    setSelectedIndex(i);
    setAnswered(true);
    if (i === questions[idx].correctIndex) { playCorrect(); launchConfetti(); setScore((s) => s + 1); }
    else playTick();
  }

  function next() {
    const q = questions[idx];
    const isLast = idx + 1 >= questions.length;
    if (isLast) {
      const fs = score + (selectedIndex === q.correctIndex ? 1 : 0);
      localStorage.setItem(duelKey(childId, today), JSON.stringify({ score: fs }));
      setFinalScore(fs);
      const raw = localStorage.getItem(duelKey(siblingId, today));
      if (raw) setSiblingScore(JSON.parse(raw).score as number);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setAnswered(false);
      setSelectedIndex(null);
    }
  }

  if (!child || !sibling) return null;

  const q: TriviaQuestion = questions[idx];

  if (done) {
    const sibScore = siblingScore;
    const iWon = sibScore !== null ? finalScore > sibScore : null;
    const tie = sibScore !== null ? finalScore === sibScore : null;
    return (
      <div className="child-space min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-7xl">{iWon ? "🏆" : tie ? "🤝" : sibScore !== null ? "⭐" : "⚔️"}</div>
        <h1 className="text-2xl font-extrabold text-slate-800 text-center">
          {sibScore !== null
            ? iWon ? `${child.name} gagne ! 🎉`
              : tie ? "Match nul !"
              : `${sibling.name} gagne !`
            : "Tu as joué ! En attente de " + sibling.name}
        </h1>

        <div className="flex gap-4">
          <div className="rounded-2xl bg-white shadow p-5 text-center min-w-[120px]">
            <p className="text-4xl font-extrabold text-amber-600">{finalScore}/10</p>
            <p className="mt-1 text-sm text-slate-500">{child.name} {iWon === true ? "🏆" : ""}</p>
          </div>
          {sibScore !== null ? (
            <div className="rounded-2xl bg-white shadow p-5 text-center min-w-[120px]">
              <p className="text-4xl font-extrabold text-violet-600">{sibScore}/10</p>
              <p className="mt-1 text-sm text-slate-500">{sibling.name} {iWon === false && !tie ? "🏆" : ""}</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-100 shadow p-5 text-center min-w-[120px]">
              <p className="text-2xl font-extrabold text-slate-400">?/10</p>
              <p className="mt-1 text-xs text-slate-400">{sibling.name}</p>
              <p className="text-xs text-slate-400">Pas encore joué</p>
            </div>
          )}
        </div>

        {iWon === true && (
          <div className="rounded-xl bg-amber-100 border border-amber-300 px-5 py-2 text-center">
            <p className="text-sm font-bold text-amber-700">🏅 Badge Duel gagné ⚔️</p>
          </div>
        )}

        <button onClick={() => navigate({ to: "/child/home", search: { childId } })}
          className="rounded-2xl bg-amber-500 text-white px-8 py-3 font-bold text-lg hover:opacity-90 active:scale-95">
          🏠 Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="child-space min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col px-4 py-6">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate({ to: "/child/home", search: { childId } })}
          className="rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600">← Retour</button>
        <div className="flex-1 bg-white/60 rounded-full h-3">
          <div className="bg-amber-500 h-3 rounded-full transition-all"
            style={{ width: `${((idx + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-bold text-amber-700">⚔️ {idx + 1}/10</span>
      </div>

      <div className="text-center mb-4">
        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          Duel {child.avatarEmoji} vs {sibling.avatarEmoji} {sibling.name}
        </span>
      </div>

      <div className="flex justify-center mb-3">
        <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">{q.category}</span>
      </div>

      <div className="bg-white rounded-3xl shadow p-6 mb-5 mx-auto w-full max-w-md">
        <button onClick={() => speak("choice", q.question)} className="mb-3 text-xs text-amber-500 flex items-center gap-1">🔊 Répéter</button>
        <p className="text-xl font-bold text-slate-800 text-center">{q.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto w-full">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = i === selectedIndex;
          return (
            <button key={i} onClick={() => handle(i)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 py-3 px-5 font-bold text-left transition active:scale-95 text-base",
                answered
                  ? isCorrect ? "border-green-500 bg-green-100 text-green-800"
                    : isSelected ? "border-red-400 bg-red-100 text-red-700"
                    : "border-slate-200 text-slate-400"
                  : "border-amber-400 bg-white text-amber-800 hover:bg-amber-50"
              )}>{opt}</button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-5 mx-auto w-full max-w-md bg-white rounded-2xl p-4 border-2 border-amber-200">
          <p className="text-sm font-bold text-amber-700 mb-1">💡 Le saviez-vous ?</p>
          <p className="text-sm text-slate-600">{q.fun}</p>
          <div className="flex justify-end mt-3">
            <button onClick={next}
              className="rounded-2xl bg-amber-500 text-white px-6 py-2 font-bold hover:opacity-90">
              {idx + 1 >= questions.length ? "Voir résultat" : "Suivant →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
