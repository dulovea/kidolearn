import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CountData } from "@/types/exercise";

interface Props { data: CountData; onAnswer: (correct: boolean) => void; answered: boolean; }

export function CountExercise({ data, onAnswer, answered }: Props) {
  const [input, setInput] = useState("");

  function press(v: string) {
    if (answered) return;
    if (v === "⌫") setInput((p) => p.slice(0, -1));
    else if (v === "✓") { if (input) onAnswer(parseInt(input) === data.answer); }
    else if (input.length < 3) setInput((p) => p + v);
  }

  const isCorrect = parseInt(input) === data.answer;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className="text-xl font-bold text-slate-700">Combien y a-t-il de {data.label} ?</p>
      <div className="flex flex-wrap justify-center gap-2 max-w-xs text-4xl leading-tight select-none">
        {data.items.map((item, i) => <span key={i}>{item}</span>)}
      </div>
      <div className={cn(
        "rounded-2xl border-2 px-8 py-3 text-3xl font-bold min-w-[100px] text-center",
        answered ? isCorrect ? "border-green-500 bg-green-50 text-green-800" : "border-red-400 bg-red-50 text-red-700"
          : "border-child-primary bg-white text-child-primary"
      )}>
        {input || <span className="text-slate-300">?</span>}
      </div>
      {answered && !isCorrect && <p className="text-green-700 font-bold">Réponse : {data.answer}</p>}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
        {["7","8","9","4","5","6","1","2","3","⌫","0","✓"].map((k) => (
          <button key={k} onClick={() => press(k)} disabled={answered}
            className={cn("rounded-xl h-12 text-lg font-bold transition active:scale-95",
              k==="✓"?"bg-green-500 text-white":k==="⌫"?"bg-slate-200 text-slate-700":"bg-white border-2 border-child-primary text-child-primary hover:bg-child-primary hover:text-white",
              answered&&"opacity-50"
            )}>{k}</button>
        ))}
      </div>
    </div>
  );
}
