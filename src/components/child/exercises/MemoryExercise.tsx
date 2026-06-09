import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { playTick } from "@/lib/audio";
import type { MemoryData } from "@/types/exercise";

interface Props {
  data: MemoryData;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

interface Card { id: string; emoji: string; index: number; }

export function MemoryExercise({ data, onAnswer, answered }: Props) {
  const cards: Card[] = [
    ...data.pairs.map((p, i) => ({ id: p.id + "-a", emoji: p.emoji, index: i })),
    ...data.pairs.map((p, i) => ({ id: p.id + "-b", emoji: p.emoji, index: i })),
  ].sort(() => Math.random() - 0.5);

  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (matched.length === cards.length && !answered) {
      setTimeout(() => onAnswer(true), 500);
    }
  }, [matched, cards.length, answered, onAnswer]);

  function flip(card: Card) {
    if (lock || answered || flipped.includes(card.id) || matched.includes(card.id)) return;
    playTick();
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length === 2) {
      setLock(true);
      const [a, b] = next.map((id) => cards.find((c) => c.id === id)!);
      if (a.index === b.index) {
        setTimeout(() => {
          setMatched((m) => [...m, a.id, b.id]);
          setFlipped([]);
          setLock(false);
        }, 400);
      } else {
        setTimeout(() => { setFlipped([]); setLock(false); }, 900);
      }
    }
  }

  const cols = data.pairs.length <= 4 ? "grid-cols-4" : "grid-cols-4";

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-lg font-bold text-slate-700">
        Trouve toutes les paires ! ({matched.length / 2}/{data.pairs.length})
      </p>
      <div className={cn("grid gap-2", cols, "max-w-xs")}>
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          const isMatched = matched.includes(card.id);
          return (
            <button key={card.id} onClick={() => flip(card)}
              className={cn(
                "w-16 h-16 rounded-xl border-2 text-3xl transition-all duration-200 active:scale-95",
                isMatched ? "border-green-400 bg-green-100" :
                isFlipped ? "border-child-primary bg-white" :
                "border-slate-300 bg-child-primary/20 hover:bg-child-primary/30"
              )}>
              {isFlipped || isMatched ? card.emoji : "❓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
