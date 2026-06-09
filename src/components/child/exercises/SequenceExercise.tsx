import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SequenceData, OrderData, PatternData } from "@/types/exercise";

// ── Sequence (fill the blank) ─────────────────────────────────────────────────

interface SeqProps {
  data: SequenceData;
  fontSize: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: string | null;
  onSelect: (s: string) => void;
}

export function SequenceExercise({ data, fontSize, onAnswer, answered, selected, onSelect }: SeqProps) {
  function handle(opt: string) {
    if (answered) return;
    onSelect(opt);
    onAnswer(opt === data.answer);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {data.items.map((item, i) => (
          <span key={i} className={cn(
            "rounded-xl border-2 px-3 py-2 text-xl font-bold",
            item === null
              ? "border-dashed border-child-accent text-child-accent min-w-[50px] text-center"
              : "border-child-primary bg-white text-child-primary"
          )}>
            {item ?? (selected ?? "?")}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {data.options.map((opt) => {
          const isCorrect = opt === data.answer;
          const isSelected = opt === selected;
          return (
            <button key={opt} onClick={() => handle(opt)} disabled={answered}
              className={cn(
                "rounded-2xl border-2 px-5 py-3 font-bold transition active:scale-95",
                fontSize,
                answered
                  ? isCorrect ? "border-green-500 bg-green-100 text-green-800"
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

// ── Order (click ordering) ────────────────────────────────────────────────────

interface OrderProps {
  data: OrderData;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function OrderExercise({ data, onAnswer, answered }: OrderProps) {
  const [order, setOrder] = useState<string[]>([]);
  const [shuffled] = useState<string[]>(() => [...data.items].sort(() => Math.random() - 0.5));
  const remaining = shuffled.filter((x) => !order.includes(x));

  function pick(item: string) {
    if (answered) return;
    const next = [...order, item];
    setOrder(next);
    if (next.length === data.items.length) {
      const sorted = [...data.items].sort((a, b) => {
        const va = data.values[data.items.indexOf(a)];
        const vb = data.values[data.items.indexOf(b)];
        return data.direction === "asc" ? va - vb : vb - va;
      });
      setTimeout(() => onAnswer(next.join(",") === sorted.join(",")), 300);
    }
  }

  function remove(item: string) {
    if (answered) return;
    setOrder(order.filter((x) => x !== item));
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className="text-lg font-bold text-slate-700">
        Ordre {data.direction === "asc" ? "croissant ↑" : "décroissant ↓"} ({data.label})
      </p>
      <div className="flex gap-2 flex-wrap justify-center min-h-[52px] border-2 border-dashed border-child-accent rounded-xl px-3 py-2 w-full max-w-sm">
        {order.map((item) => (
          <button key={item} onClick={() => remove(item)} disabled={answered}
            className="rounded-lg bg-child-accent text-white px-3 py-1 font-bold text-lg transition active:scale-95">
            {item}
          </button>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {remaining.map((item) => (
          <button key={item} onClick={() => pick(item)} disabled={answered}
            className="rounded-xl border-2 border-child-primary bg-white text-child-primary px-4 py-2 font-bold text-lg hover:bg-child-primary hover:text-white transition active:scale-95">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Pattern ───────────────────────────────────────────────────────────────────

interface PatProps {
  data: PatternData;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  selected: string | null;
  onSelect: (s: string) => void;
}

export function PatternExercise({ data, onAnswer, answered, selected, onSelect }: PatProps) {
  function handle(opt: string) {
    if (answered) return;
    onSelect(opt);
    onAnswer(opt === data.answer);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {data.sequence.map((item, i) => (
          <span key={i} className={cn(
            "text-3xl rounded-xl border-2 w-14 h-14 flex items-center justify-center",
            item === null ? "border-dashed border-child-accent" : "border-transparent"
          )}>
            {item ?? (selected ?? "?")}
          </span>
        ))}
      </div>
      <div className="flex gap-4 justify-center">
        {data.options.map((opt) => {
          const isCorrect = opt === data.answer;
          const isSelected = opt === selected;
          return (
            <button key={opt} onClick={() => handle(opt)} disabled={answered}
              className={cn(
                "text-3xl rounded-2xl border-2 w-16 h-16 transition active:scale-95",
                answered ? isCorrect ? "border-green-500 bg-green-100"
                  : isSelected ? "border-red-400 bg-red-100"
                  : "border-slate-200 text-slate-400"
                : "border-child-primary bg-white hover:bg-child-primary/10"
              )}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
}
