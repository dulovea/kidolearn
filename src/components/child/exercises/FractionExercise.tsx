import { cn } from "@/lib/utils";
import type { FractionData } from "@/types/exercise";

interface Props {
  data: FractionData;
  fontSize: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: string | null;
  onSelect: (s: string) => void;
}

export function FractionExercise({ data, fontSize, onAnswer, answered, selected, onSelect }: Props) {
  function handle(opt: string) {
    if (answered) return;
    onSelect(opt);
    onAnswer(opt === data.answer);
  }

  const parts = Array.from({ length: data.denominator }, (_, i) => i < data.coloredCount);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className={cn("font-bold text-slate-700", fontSize)}>Quelle fraction est coloriée ?</p>
      {/* Visual fraction bar */}
      <div className="flex gap-1 p-3 bg-slate-100 rounded-2xl">
        {parts.map((colored, i) => (
          <div key={i} className={cn(
            "w-10 h-16 rounded-lg border-2 border-white",
            colored ? "bg-child-primary" : "bg-slate-300"
          )} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {data.options.map((opt) => {
          const isCorrect = opt === data.answer;
          const isSelected = opt === selected;
          return (
            <button key={opt} onClick={() => handle(opt)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 py-3 font-bold transition active:scale-95 text-xl",
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
