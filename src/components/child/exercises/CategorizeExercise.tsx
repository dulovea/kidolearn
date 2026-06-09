import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CategorizeData } from "@/types/exercise";

interface Props { data: CategorizeData; onAnswer: (correct: boolean) => void; answered: boolean; }

export function CategorizeExercise({ data, onAnswer, answered }: Props) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const remaining = data.items.filter((it) => !(it.label in placed));

  function pickItem(label: string) {
    if (answered) return;
    setSelected(selected === label ? null : label);
  }

  function dropInto(cat: string) {
    if (!selected || answered) return;
    const next = { ...placed, [selected]: cat };
    setPlaced(next);
    setSelected(null);
    if (Object.keys(next).length === data.items.length) {
      const correct = data.items.every((it) => next[it.label] === it.category);
      setTimeout(() => onAnswer(correct), 300);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className="text-lg font-bold text-slate-700">Range chaque élément dans la bonne catégorie</p>
      {/* Items to place */}
      <div className="flex flex-wrap gap-2 justify-center min-h-[50px]">
        {remaining.map((it) => (
          <button key={it.label} onClick={() => pickItem(it.label)}
            className={cn(
              "rounded-xl border-2 px-3 py-2 text-base font-bold transition active:scale-95",
              selected === it.label ? "border-child-accent bg-amber-100 text-amber-800 scale-95" :
              "border-child-primary bg-white text-child-primary hover:bg-child-primary/10"
            )}>{it.label}</button>
        ))}
      </div>
      {/* Category buckets */}
      <div className="flex gap-4 w-full max-w-md">
        {data.categories.map((cat) => {
          const catItems = data.items.filter((it) => placed[it.label] === cat);
          return (
            <button key={cat} onClick={() => dropInto(cat)} disabled={!selected || answered}
              className={cn(
                "flex-1 rounded-2xl border-2 p-3 min-h-[100px] flex flex-col gap-1 transition",
                selected ? "border-child-accent bg-amber-50 hover:bg-amber-100" : "border-slate-200 bg-slate-50"
              )}>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{cat}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {catItems.map((it) => (
                  <span key={it.label} className={cn(
                    "rounded-lg px-2 py-0.5 text-sm font-semibold",
                    answered
                      ? it.category === cat ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
                      : "bg-white border border-slate-200 text-slate-700"
                  )}>{it.label}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
