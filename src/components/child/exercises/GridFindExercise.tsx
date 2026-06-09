import { useState } from "react";
import { cn } from "@/lib/utils";
import type { GridFindData } from "@/types/exercise";

interface Props { data: GridFindData; onAnswer: (correct: boolean) => void; answered: boolean; }

export function GridFindExercise({ data, onAnswer, answered }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(r: number, c: number) {
    if (answered) return;
    const key = `${r}-${c}`;
    const next = new Set(selected);
    if (next.has(key)) next.delete(key); else next.add(key);
    setSelected(next);
  }

  function validate() {
    const correctKeys = new Set<string>();
    data.grid.forEach((row, r) =>
      row.forEach((cell, c) => { if (cell === data.target) correctKeys.add(`${r}-${c}`); })
    );
    const userCorrect = [...selected].filter((k) => correctKeys.has(k)).length;
    const noMiss = selected.size === data.correctCount && userCorrect === data.correctCount;
    onAnswer(noMiss);
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className="text-lg font-bold text-slate-700">
        Trouve tous les <span className="text-3xl">{data.target}</span> ({selected.size}/{data.correctCount})
      </p>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${data.grid[0].length}, 1fr)` }}>
        {data.grid.map((row, r) =>
          row.map((cell, c) => {
            const key = `${r}-${c}`;
            return (
              <button key={key} onClick={() => toggle(r, c)} disabled={answered}
                className={cn(
                  "w-14 h-14 rounded-xl text-2xl border-2 transition active:scale-95",
                  selected.has(key) ? "border-child-accent bg-amber-100 scale-95" : "border-slate-200 bg-white hover:bg-slate-50"
                )}>
                {cell}
              </button>
            );
          })
        )}
      </div>
      {!answered && (
        <button onClick={validate} disabled={selected.size === 0}
          className="rounded-2xl bg-green-500 text-white px-8 py-3 font-bold text-lg hover:bg-green-600 disabled:opacity-50">
          Valider ✓
        </button>
      )}
    </div>
  );
}
