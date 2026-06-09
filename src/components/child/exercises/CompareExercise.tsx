import { cn } from "@/lib/utils";
import type { CompareData, CompareSignData } from "@/types/exercise";

// ── Compare (bigger/smaller) ──────────────────────────────────────────────────

interface CompareProps {
  data: CompareData;
  fontSize: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
}

export function CompareExercise({ data, fontSize, onAnswer, answered, selectedIndex, onSelect }: CompareProps) {
  function handle(i: number) {
    if (answered) return;
    onSelect(i);
    onAnswer(i === data.correctIndex);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className={cn("font-bold text-slate-700", fontSize)}>
        {data.question === "bigger" ? "Lequel est le plus grand ?" : "Lequel est le plus petit ?"}
      </p>
      <div className="flex gap-6">
        {data.options.map((opt, i) => {
          const isCorrect = i === data.correctIndex;
          const isSelected = i === selectedIndex;
          return (
            <button key={i} onClick={() => handle(i)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 px-6 py-4 text-lg font-bold transition active:scale-95 min-w-[120px]",
                answered ? isCorrect ? "border-green-500 bg-green-100 text-green-800"
                  : isSelected ? "border-red-400 bg-red-100 text-red-700"
                  : "border-slate-200 text-slate-400"
                : "border-child-primary bg-white text-child-primary hover:bg-child-primary hover:text-white"
              )}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
}

// ── Compare-sign (<, >, =) ────────────────────────────────────────────────────

interface SignProps {
  data: CompareSignData;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: string | null;
  onSelect: (s: string) => void;
}

export function CompareSignExercise({ data, onAnswer, answered, selected, onSelect }: SignProps) {
  const signs = ["<", ">", "="];

  function handle(s: string) {
    if (answered) return;
    onSelect(s);
    onAnswer(s === data.answer);
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <p className="text-xl font-bold text-slate-600">Quel signe convient ?</p>
      <div className="flex items-center gap-4 text-5xl font-extrabold">
        <span className="text-child-primary">{data.a}</span>
        <span className={cn(
          "w-14 h-14 rounded-xl border-4 flex items-center justify-center text-3xl transition",
          answered ? data.answer === selected
            ? "border-green-500 bg-green-100 text-green-700"
            : "border-red-400 bg-red-100 text-red-700"
          : "border-dashed border-slate-300 text-slate-400"
        )}>
          {selected ?? "?"}
        </span>
        <span className="text-child-primary">{data.b}</span>
      </div>
      {answered && selected !== data.answer && (
        <p className="text-green-700 font-bold">Réponse : {data.a} {data.answer} {data.b}</p>
      )}
      <div className="flex gap-4">
        {signs.map((s) => (
          <button key={s} onClick={() => handle(s)} disabled={answered}
            className={cn(
              "w-16 h-16 rounded-2xl border-2 text-3xl font-bold transition active:scale-95",
              selected === s && !answered ? "border-child-primary bg-child-primary text-white" :
              "border-child-primary bg-white text-child-primary hover:bg-child-primary hover:text-white",
              answered && "opacity-60"
            )}>{s}</button>
        ))}
      </div>
    </div>
  );
}
