export type ExerciseType =
  | "choice" | "numpad" | "count" | "compare" | "compare-sign"
  | "match" | "sequence" | "order" | "pattern" | "memory"
  | "grid-find" | "categorize" | "clock" | "fraction"
  | "bar-chart" | "symmetry" | "maze";

export type ModuleId = "math" | "geography" | "history" | "trivia";

// ── Per-type data payloads ────────────────────────────────────────────────────

export interface ChoiceData {
  question: string;
  visual?: string;          // emoji or image description shown large
  options: string[];
  correctIndex: number;
}

export interface NumpadData {
  question: string;
  answer: number;
  unit?: string;
  hint?: string;
}

export interface CountData {
  items: string[];          // emojis to display in grid
  answer: number;
  label: string;            // "mangues", "étoiles"...
}

export interface CompareData {
  a: { label: string; value: number };
  b: { label: string; value: number };
  question: "bigger" | "smaller";
  options: string[];        // [a.label, b.label]
  correctIndex: number;
}

export interface CompareSignData {
  a: number;
  b: number;
  answer: "<" | ">" | "=";
}

export interface MatchData {
  pairs: { left: string; right: string }[];
}

export interface SequenceData {
  items: (string | null)[];
  missingIndex: number;
  answer: string;
  options: string[];
}

export interface OrderData {
  items: string[];
  values: number[];         // used to sort
  direction: "asc" | "desc";
  label: string;
}

export interface PatternData {
  sequence: (string | null)[];
  answer: string;
  options: string[];
}

export interface MemoryData {
  pairs: { id: string; emoji: string }[];
}

export interface GridFindData {
  grid: string[][];
  target: string;
  correctCount: number;
}

export interface CategorizeData {
  categories: string[];
  items: { label: string; category: string }[];
}

export interface ClockData {
  hours: number;
  minutes: number;
  options: string[];
  answer: string;
}

export interface FractionData {
  numerator: number;
  denominator: number;
  coloredCount: number;
  options: string[];
  answer: string;
}

export interface BarChartData {
  bars: { label: string; value: number }[];
  question: string;
  options: string[];
  answer: string;
}

export interface SymmetryData {
  shape: (0 | 1)[][];       // 0=empty 1=filled, left half
  options: (0 | 1)[][][];   // possible right halves
  correctIndex: number;
}

export interface MazeData {
  description: string;       // "Le lapin veut atteindre la carotte"
  paths: string[];           // 4 path options as arrow sequences "→→↑"
  correctIndex: number;
  emoji: { start: string; end: string };
}

export type ExerciseData =
  | ChoiceData | NumpadData | CountData | CompareData | CompareSignData
  | MatchData | SequenceData | OrderData | PatternData | MemoryData
  | GridFindData | CategorizeData | ClockData | FractionData
  | BarChartData | SymmetryData | MazeData;

// ── Master exercise interface ─────────────────────────────────────────────────

export interface Exercise {
  id: string;
  type: ExerciseType;
  ttsText: string;           // STRICT: never reveals the answer
  data: ExerciseData;
}

export interface Level {
  id: number;
  label: string;             // "Niveau 1 — CI"
  schoolYear: string;
  exercises: Exercise[];
  passingScore: number;      // 16 out of 20
}

export interface Module {
  id: ModuleId;
  title: string;
  emoji: string;
  bgColor: string;
  levels: Level[];
}

// ── Progress ──────────────────────────────────────────────────────────────────

export interface LevelProgress {
  moduleId: ModuleId;
  levelId: number;
  bestScore: number;
  completed: boolean;
  stars: 0 | 1 | 2 | 3;
  lastPlayedAt: string;
}

export interface ChildProgress {
  childId: string;
  levels: Record<string, LevelProgress>; // key: `${moduleId}-${levelId}`
  triviaStreak: number;
  lastTriviaDate: string | null;
  triviaScores: { date: string; score: number }[];
}
