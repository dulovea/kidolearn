import { useState, useEffect, useCallback } from "react";
import type { Level, ModuleId } from "@/types/exercise";
import { ExerciseRenderer } from "./ExerciseRenderer";
import { speak, primeVoices } from "@/lib/speech";
import { playCorrect, playTick, resumeAudio } from "@/lib/audio";
import { launchConfetti } from "@/lib/confetti";
import { recordLevelResult } from "@/lib/progress";
import { cn } from "@/lib/utils";

interface Props {
  level: Level;
  moduleId: ModuleId;
  childId: string;
  onFinish: (score: number, passed: boolean) => void;
  onQuit: () => void;
}

export function ExercisePlayer({ level, moduleId, childId, onFinish, onQuit }: Props) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const exercise = level.exercises[idx];
  const total = level.exercises.length;

  // Speak when exercise changes
  useEffect(() => {
    resumeAudio();
    primeVoices();
    const t = setTimeout(() => speak(exercise.type, exercise.ttsText), 400);
    return () => clearTimeout(t);
  }, [idx, exercise.type, exercise.ttsText]);

  const handleAnswer = useCallback((correct: boolean) => {
    if (answered) return;
    setAnswered(true);
    setLastCorrect(correct);
    if (correct) {
      playCorrect();
      launchConfetti();
      setScore((s) => s + 1);
    } else {
      playTick();
    }
  }, [answered]);

  function next() {
    if (idx + 1 >= total) {
      // score state already incremented by handleAnswer via setScore
      recordLevelResult(childId, moduleId, level.id, score, total);
      setDone(true);
      setTimeout(() => onFinish(score, score >= level.passingScore), 300);
    } else {
      setIdx((i) => i + 1);
      setAnswered(false);
      setLastCorrect(null);
    }
  }

  if (done) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-child-bg to-indigo-50">
      <div className="text-5xl animate-bounce-slow">⭐</div>
    </div>
  );

  const progress = ((idx + (answered ? 1 : 0)) / total) * 100;

  return (
    <div className="child-space min-h-screen bg-gradient-to-b from-child-bg to-indigo-50 flex flex-col"
      onClick={() => { resumeAudio(); primeVoices(); }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={onQuit} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
        <div className="flex items-center gap-2 flex-1 mx-4">
          <div className="flex-1 bg-slate-200 rounded-full h-3">
            <div className="bg-child-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-bold text-slate-600">{idx + 1}/{total}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-green-600 font-bold text-lg">{score}</span>
          <span className="text-slate-400 text-sm">✓</span>
        </div>
      </div>

      {/* Speak button */}
      <div className="flex justify-center pb-2">
        <button onClick={() => speak(exercise.type, exercise.ttsText)}
          className="flex items-center gap-1 rounded-full bg-child-primary/10 px-4 py-1 text-child-primary text-sm font-medium hover:bg-child-primary/20">
          🔊 Répéter
        </button>
      </div>

      {/* Exercise */}
      <div className="flex-1 flex items-center justify-center px-4 py-2">
        <div className="w-full max-w-lg">
          <ExerciseRenderer
            exercise={exercise}
            levelId={level.id}
            onAnswer={handleAnswer}
            answered={answered}
          />
        </div>
      </div>

      {/* Feedback + Next */}
      {answered && (
        <div className={cn(
          "mx-4 mb-4 rounded-2xl px-5 py-4 flex items-center justify-between",
          lastCorrect ? "bg-green-100 border-2 border-green-400" : "bg-orange-50 border-2 border-orange-300"
        )}>
          <div>
            <p className={cn("font-extrabold text-lg", lastCorrect ? "text-green-700" : "text-orange-600")}>
              {lastCorrect ? "Bravo ! 🎉" : "Essaie encore 💪"}
            </p>
            {!lastCorrect && <p className="text-sm text-orange-500">Continue, tu vas y arriver !</p>}
          </div>
          <button onClick={next}
            className="rounded-2xl bg-child-primary text-white px-6 py-2 font-bold text-lg hover:opacity-90 active:scale-95">
            {idx + 1 >= total ? "Voir résultat" : "Suivant →"}
          </button>
        </div>
      )}
    </div>
  );
}
