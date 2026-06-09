import { cn } from "@/lib/utils";
import type { SymmetryData } from "@/types/exercise";

interface Props {
  data: SymmetryData;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: number | null;
  onSelect: (i: number) => void;
}

const CELL = "w-8 h-8 border border-slate-300";

function Grid({ matrix }: { matrix: (0 | 1)[][] }) {
  return (
    <div className="inline-grid gap-0" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 2rem)` }}>
      {matrix.map((row, r) =>
        row.map((cell, c) => (
          <div key={`${r}-${c}`} className={cn(CELL, cell ? "bg-child-primary" : "bg-white")} />
        ))
      )}
    </div>
  );
}

export function SymmetryExercise({ data, onAnswer, answered, selected, onSelect }: Props) {
  // Full shape = left half + right half
  function buildFull(right: (0 | 1)[][]) {
    return data.shape.map((row, r) => [...row, ...right[r]]);
  }

  function handle(i: number) {
    if (answered) return;
    onSelect(i);
    onAnswer(i === data.correctIndex);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-lg font-bold text-slate-700">Complète la figure symétrique</p>
      <div className="flex items-center gap-3">
        <Grid matrix={data.shape.map((row) => [...row, ...Array(data.shape[0].length).fill(0)])} />
        <span className="text-2xl font-bold text-child-accent">↔</span>
        <span className="text-3xl">?</span>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {data.options.map((opt, i) => {
          const isCorrect = i === data.correctIndex;
          const isSelected = i === selected;
          return (
            <button key={i} onClick={() => handle(i)} disabled={answered}
              className={cn(
                "rounded-2xl border-4 p-2 transition active:scale-95",
                answered ? isCorrect ? "border-green-500 bg-green-50"
                  : isSelected ? "border-red-400 bg-red-50"
                  : "border-slate-200"
                : isSelected ? "border-child-primary" : "border-slate-200 hover:border-child-primary"
              )}>
              <Grid matrix={buildFull(opt)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
