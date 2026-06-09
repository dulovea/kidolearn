import { cn } from "@/lib/utils";
import type { BarChartData } from "@/types/exercise";

interface Props {
  data: BarChartData;
  fontSize: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: string | null;
  onSelect: (s: string) => void;
}

export function BarChartExercise({ data, fontSize, onAnswer, answered, selected, onSelect }: Props) {
  const max = Math.max(...data.bars.map((b) => b.value));

  function handle(opt: string) {
    if (answered) return;
    onSelect(opt);
    onAnswer(opt === data.answer);
  }

  const COLORS = ["#6366f1","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444"];

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className={cn("font-bold text-slate-700 text-center max-w-sm", fontSize)}>{data.question}</p>
      {/* Bar chart */}
      <div className="flex items-end gap-3 h-36 px-4">
        {data.bars.map((bar, i) => (
          <div key={bar.label} className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-slate-600">{bar.value}</span>
            <div className="rounded-t-lg w-10 transition-all"
              style={{ height: `${(bar.value / max) * 100}px`, backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-xs text-slate-500 text-center w-10 leading-tight">{bar.label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {data.options.map((opt) => {
          const isCorrect = opt === data.answer;
          const isSelected = opt === selected;
          return (
            <button key={opt} onClick={() => handle(opt)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 py-2 px-3 font-bold transition active:scale-95 text-sm",
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
