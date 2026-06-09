import { cn } from "@/lib/utils";
import type { ClockData } from "@/types/exercise";

interface Props {
  data: ClockData;
  fontSize: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: string | null;
  onSelect: (s: string) => void;
}

export function ClockExercise({ data, fontSize, onAnswer, answered, selected, onSelect }: Props) {
  const { hours, minutes } = data;
  const hourAngle = ((hours % 12) + minutes / 60) * 30 - 90;
  const minAngle = minutes * 6 - 90;

  function handle(opt: string) {
    if (answered) return;
    onSelect(opt);
    onAnswer(opt === data.answer);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className={cn("font-bold text-slate-700", fontSize)}>Quelle heure est-il ?</p>
      {/* SVG Clock */}
      <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-lg">
        <circle cx="80" cy="80" r="75" fill="white" stroke="#6366f1" strokeWidth="4" />
        {[...Array(12)].map((_, i) => {
          const a = (i * 30 - 90) * (Math.PI / 180);
          return <text key={i} x={80 + 60 * Math.cos(a)} y={80 + 60 * Math.sin(a) + 5}
            textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{i === 0 ? 12 : i}</text>;
        })}
        {/* Hour hand */}
        <line x1="80" y1="80"
          x2={80 + 42 * Math.cos(hourAngle * Math.PI / 180)}
          y2={80 + 42 * Math.sin(hourAngle * Math.PI / 180)}
          stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1="80" y1="80"
          x2={80 + 58 * Math.cos(minAngle * Math.PI / 180)}
          y2={80 + 58 * Math.sin(minAngle * Math.PI / 180)}
          stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="80" r="5" fill="#6366f1" />
      </svg>
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {data.options.map((opt) => {
          const isCorrect = opt === data.answer;
          const isSelected = opt === selected;
          return (
            <button key={opt} onClick={() => handle(opt)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 py-3 font-bold transition active:scale-95 text-lg",
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
