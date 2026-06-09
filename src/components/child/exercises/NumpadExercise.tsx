import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NumpadData } from "@/types/exercise";

interface Props {
  data: NumpadData;
  fontSize: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function NumpadExercise({ data, fontSize, onAnswer, answered }: Props) {
  const [input, setInput] = useState("");

  function press(v: string) {
    if (answered) return;
    if (v === "⌫") setInput((p) => p.slice(0, -1));
    else if (v === "✓") validate();
    else if (input.length < 8) setInput((p) => p + v);
  }

  function validate() {
    if (!input || answered) return;
    onAnswer(parseInt(input) === data.answer);
  }

  const isCorrect = parseInt(input) === data.answer;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className={cn("font-bold text-center text-slate-800 max-w-sm", fontSize)}>{data.question}</p>
      {data.hint && !answered && (
        <p className="text-xs text-slate-400 italic">{data.hint}</p>
      )}

      <div className={cn(
        "rounded-2xl border-2 px-6 py-3 text-3xl font-bold text-center min-w-[140px] min-h-[60px]",
        answered
          ? isCorrect ? "border-green-500 bg-green-50 text-green-800" : "border-red-400 bg-red-50 text-red-700"
          : "border-child-primary bg-white text-child-primary"
      )}>
        {input || <span className="text-slate-300">?</span>}
        {data.unit && <span className="text-base font-normal ml-1 text-slate-500">{data.unit}</span>}
      </div>

      {answered && !isCorrect && (
        <p className="text-green-700 font-bold text-lg">Réponse : {data.answer} {data.unit}</p>
      )}

      <div className="grid grid-cols-3 gap-2 w-full max-w-[240px]">
        {["7","8","9","4","5","6","1","2","3","⌫","0","✓"].map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            disabled={answered}
            className={cn(
              "rounded-xl h-14 text-xl font-bold transition active:scale-95",
              k === "✓" ? "bg-green-500 text-white hover:bg-green-600" :
              k === "⌫" ? "bg-slate-200 text-slate-700 hover:bg-slate-300" :
              "bg-white border-2 border-child-primary text-child-primary hover:bg-child-primary hover:text-white",
              answered && "opacity-50 cursor-not-allowed"
            )}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
