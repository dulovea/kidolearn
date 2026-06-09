import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MatchData } from "@/types/exercise";

interface Props {
  data: MatchData;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function MatchExercise({ data, onAnswer, answered }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [connections, setConnections] = useState<Record<number, number>>({});
  const total = data.pairs.length;

  const shuffledRight = useState(() =>
    [...data.pairs.map((_, i) => i)].sort(() => Math.random() - 0.5)
  )[0];

  function pickLeft(i: number) {
    if (answered) return;
    setSelectedLeft(i === selectedLeft ? null : i);
  }

  function pickRight(j: number) {
    if (answered || selectedLeft === null) return;
    const next = { ...connections, [selectedLeft]: j };
    setConnections(next);
    setSelectedLeft(null);
    if (Object.keys(next).length === total) {
      // Each left index i must map to the shuffledRight position whose original index is also i
      const isAllCorrect = Object.entries(next).every(
        ([l, r]) => shuffledRight[Number(r)] === Number(l)
      );
      setTimeout(() => onAnswer(isAllCorrect), 300);
    }
  }

  const rightMatched = new Set(Object.values(connections));
  const leftMatched = new Set(Object.keys(connections).map(Number));

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-lg font-bold text-slate-700">Relie chaque élément à sa paire</p>
      <div className="flex gap-8 w-full max-w-sm justify-center">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          {data.pairs.map((p, i) => (
            <button key={i} onClick={() => pickLeft(i)} disabled={answered || leftMatched.has(i)}
              className={cn(
                "rounded-xl border-2 px-4 py-2 text-sm font-semibold transition min-w-[100px] text-center",
                selectedLeft === i ? "border-child-secondary bg-child-secondary text-white" :
                leftMatched.has(i) ? "border-green-400 bg-green-50 text-green-700" :
                "border-child-primary bg-white text-child-primary hover:bg-child-primary/10"
              )}>{p.left}</button>
          ))}
        </div>
        {/* Right column (shuffled) */}
        <div className="flex flex-col gap-3">
          {shuffledRight.map((origIdx, j) => (
            <button key={j} onClick={() => pickRight(j)} disabled={answered || rightMatched.has(j)}
              className={cn(
                "rounded-xl border-2 px-4 py-2 text-sm font-semibold transition min-w-[100px] text-center",
                rightMatched.has(j) ? "border-green-400 bg-green-50 text-green-700" :
                selectedLeft !== null ? "border-child-accent bg-amber-50 text-amber-800 hover:bg-amber-100" :
                "border-slate-300 bg-white text-slate-600"
              )}>{data.pairs[origIdx].right}</button>
          ))}
        </div>
      </div>
      {selectedLeft !== null && (
        <p className="text-sm text-child-secondary font-semibold animate-bounce-slow">
          ← Sélectionné : {data.pairs[selectedLeft].left} → clique sur sa paire !
        </p>
      )}
    </div>
  );
}
