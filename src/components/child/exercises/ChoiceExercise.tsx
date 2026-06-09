import { cn } from "@/lib/utils";
import type { ChoiceData } from "@/types/exercise";

interface Props {
  data: ChoiceData;
  fontSize: string;
  btnSize: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
}

export function ChoiceExercise({ data, fontSize, btnSize, onAnswer, answered, selectedIndex, onSelect }: Props) {
  function handle(i: number) {
    if (answered) return;
    onSelect(i);
    onAnswer(i === data.correctIndex);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {data.visual && (
        <div className="text-7xl select-none animate-pop">{data.visual}</div>
      )}
      <p className={cn("font-bold text-center text-slate-800", fontSize)}>{data.question}</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {data.options.map((opt, i) => {
          const isCorrect = i === data.correctIndex;
          const isSelected = i === selectedIndex;
          return (
            <button
              key={i}
              onClick={() => handle(i)}
              disabled={answered}
              className={cn(
                "rounded-2xl font-bold transition active:scale-95 border-2",
                btnSize,
                "text-center px-3",
                fontSize,
                answered
                  ? isCorrect
                    ? "bg-green-100 border-green-500 text-green-800"
                    : isSelected
                    ? "bg-red-100 border-red-400 text-red-700"
                    : "bg-slate-100 border-slate-200 text-slate-400"
                  : "bg-white border-child-primary text-child-primary hover:bg-child-primary hover:text-white"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
