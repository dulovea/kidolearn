import { cn } from "@/lib/utils";
import type { MazeData } from "@/types/exercise";

interface Props {
  data: MazeData;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: number | null;
  onSelect: (i: number) => void;
}

export function MazeExercise({ data, onAnswer, answered, selected, onSelect }: Props) {
  function handle(i: number) {
    if (answered) return;
    onSelect(i);
    onAnswer(i === data.correctIndex);
  }

  const ARROW_MAP: Record<string, string> = { "→": "→ ", "←": "← ", "↑": "↑ ", "↓": "↓ " };
  function prettify(path: string) {
    return path.split("").map((c) => ARROW_MAP[c] ?? c).join("").trim();
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-lg font-bold text-slate-700 text-center">{data.description}</p>
      <div className="flex gap-4 text-5xl items-center">
        <span>{data.emoji.start}</span>
        <span className="text-3xl text-slate-400">→→→</span>
        <span>{data.emoji.end}</span>
      </div>
      <p className="text-sm text-slate-500 font-medium">Quel chemin est le bon ?</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {data.paths.map((path, i) => {
          const isCorrect = i === data.correctIndex;
          const isSelected = i === selected;
          return (
            <button key={i} onClick={() => handle(i)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 py-3 px-4 font-mono text-lg font-bold transition active:scale-95",
                answered ? isCorrect ? "border-green-500 bg-green-100 text-green-800"
                  : isSelected ? "border-red-400 bg-red-100 text-red-700"
                  : "border-slate-200 text-slate-400"
                : "border-child-primary bg-white text-child-primary hover:bg-child-primary hover:text-white"
              )}>{prettify(path)}</button>
          );
        })}
      </div>
    </div>
  );
}
