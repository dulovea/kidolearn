import type { ChildProgress, LevelProgress, ModuleId } from "@/types/exercise";
import { supabase } from "@/lib/supabase";

const KEY = (childId: string) => `kidolearn:progress:${childId}`;

export function getProgress(childId: string): ChildProgress {
  try {
    const raw = localStorage.getItem(KEY(childId));
    if (raw) return JSON.parse(raw) as ChildProgress;
  } catch { /* ignore */ }
  return {
    childId,
    levels: {},
    triviaStreak: 0,
    lastTriviaDate: null,
    triviaScores: [],
  };
}

function saveProgress(p: ChildProgress) {
  localStorage.setItem(KEY(p.childId), JSON.stringify(p));
}

export function recordLevelResult(
  childId: string,
  moduleId: ModuleId,
  levelId: number,
  score: number,
  totalExercises: number
): LevelProgress {
  const p = getProgress(childId);
  const key = `${moduleId}-${levelId}`;
  const prev = p.levels[key];
  const stars: 0 | 1 | 2 | 3 =
    score >= totalExercises ? 3 : score >= 18 ? 3 : score >= 16 ? 2 : score >= 12 ? 1 : 0;

  const updated: LevelProgress = {
    moduleId,
    levelId,
    bestScore: Math.max(score, prev?.bestScore ?? 0),
    completed: score >= 16 || (prev?.completed ?? false),
    stars: Math.max(stars, prev?.stars ?? 0) as 0 | 1 | 2 | 3,
    lastPlayedAt: new Date().toISOString(),
  };
  p.levels[key] = updated;
  saveProgress(p);

  // Async sync to Supabase (fire-and-forget)
  void syncLevelResult(childId, moduleId, levelId, score, stars);

  return updated;
}

async function syncLevelResult(
  childId: string,
  moduleId: ModuleId,
  levelId: number,
  score: number,
  stars: number
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("exercise_attempts") as any).insert({
      child_id: childId,
      module_id: moduleId,
      level_id: levelId,
      score,
      stars,
      played_at: new Date().toISOString(),
    });
  } catch { /* offline — will sync later */ }
}

export function isLevelUnlocked(
  childId: string,
  moduleId: ModuleId,
  levelId: number
): boolean {
  if (levelId === 1) return true;
  const p = getProgress(childId);
  return p.levels[`${moduleId}-${levelId - 1}`]?.completed ?? false;
}

export function recordTriviaScore(childId: string, score: number) {
  const p = getProgress(childId);
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (p.lastTriviaDate === yesterday) p.triviaStreak += 1;
  else if (p.lastTriviaDate !== today) p.triviaStreak = 1;

  p.lastTriviaDate = today;
  p.triviaScores = [
    ...p.triviaScores.filter((s) => s.date !== today),
    { date: today, score },
  ].slice(-30);

  saveProgress(p);
}
