import { useState } from "react";
import type { Exercise } from "@/types/exercise";
import { ChoiceExercise } from "./exercises/ChoiceExercise";
import { NumpadExercise } from "./exercises/NumpadExercise";
import { CountExercise } from "./exercises/CountExercise";
import { CompareExercise, CompareSignExercise } from "./exercises/CompareExercise";
import { MatchExercise } from "./exercises/MatchExercise";
import { SequenceExercise, OrderExercise, PatternExercise } from "./exercises/SequenceExercise";
import { MemoryExercise } from "./exercises/MemoryExercise";
import { GridFindExercise } from "./exercises/GridFindExercise";
import { CategorizeExercise } from "./exercises/CategorizeExercise";
import { ClockExercise } from "./exercises/ClockExercise";
import { FractionExercise } from "./exercises/FractionExercise";
import { BarChartExercise } from "./exercises/BarChartExercise";
import { SymmetryExercise } from "./exercises/SymmetryExercise";
import { MazeExercise } from "./exercises/MazeExercise";

// font/button sizing by level
function getSizing(levelId: number) {
  if (levelId <= 3) return { fontSize: "text-2xl", btnSize: "min-h-[80px] text-xl" };
  if (levelId <= 7) return { fontSize: "text-lg", btnSize: "min-h-[60px] text-base" };
  return { fontSize: "text-base", btnSize: "min-h-[48px] text-sm" };
}

interface Props {
  exercise: Exercise;
  levelId: number;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function ExerciseRenderer({ exercise, levelId, onAnswer, answered }: Props) {
  const { fontSize, btnSize } = getSizing(levelId);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedStr, setSelectedStr] = useState<string | null>(null);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  const d = exercise.data as never;

  switch (exercise.type) {
    case "choice":
      return <ChoiceExercise data={d} fontSize={fontSize} btnSize={btnSize}
        onAnswer={onAnswer} answered={answered} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />;
    case "numpad":
      return <NumpadExercise data={d} fontSize={fontSize} onAnswer={onAnswer} answered={answered} />;
    case "count":
      return <CountExercise data={d} onAnswer={onAnswer} answered={answered} />;
    case "compare":
      return <CompareExercise data={d} fontSize={fontSize} onAnswer={onAnswer}
        answered={answered} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />;
    case "compare-sign":
      return <CompareSignExercise data={d} onAnswer={onAnswer}
        answered={answered} selected={selectedStr} onSelect={setSelectedStr} />;
    case "match":
      return <MatchExercise data={d} onAnswer={onAnswer} answered={answered} />;
    case "sequence":
      return <SequenceExercise data={d} fontSize={fontSize} onAnswer={onAnswer}
        answered={answered} selected={selectedStr} onSelect={setSelectedStr} />;
    case "order":
      return <OrderExercise data={d} onAnswer={onAnswer} answered={answered} />;
    case "pattern":
      return <PatternExercise data={d} onAnswer={onAnswer}
        answered={answered} selected={selectedStr} onSelect={setSelectedStr} />;
    case "memory":
      return <MemoryExercise data={d} onAnswer={onAnswer} answered={answered} />;
    case "grid-find":
      return <GridFindExercise data={d} onAnswer={onAnswer} answered={answered} />;
    case "categorize":
      return <CategorizeExercise data={d} onAnswer={onAnswer} answered={answered} />;
    case "clock":
      return <ClockExercise data={d} fontSize={fontSize} onAnswer={onAnswer}
        answered={answered} selected={selectedStr} onSelect={setSelectedStr} />;
    case "fraction":
      return <FractionExercise data={d} fontSize={fontSize} onAnswer={onAnswer}
        answered={answered} selected={selectedStr} onSelect={setSelectedStr} />;
    case "bar-chart":
      return <BarChartExercise data={d} fontSize={fontSize} onAnswer={onAnswer}
        answered={answered} selected={selectedStr} onSelect={setSelectedStr} />;
    case "symmetry":
      return <SymmetryExercise data={d} onAnswer={onAnswer}
        answered={answered} selected={selectedNum} onSelect={setSelectedNum} />;
    case "maze":
      return <MazeExercise data={d} onAnswer={onAnswer}
        answered={answered} selected={selectedNum} onSelect={setSelectedNum} />;
    default:
      return <p className="text-red-500">Type non supporté</p>;
  }
}
