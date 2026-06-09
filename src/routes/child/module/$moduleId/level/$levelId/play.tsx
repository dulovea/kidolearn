import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { MATH_LEVELS } from "@/data/math-levels";
import { GEOGRAPHY_LEVELS } from "@/data/geography-levels";
import { HISTORY_LEVELS } from "@/data/history-levels";
import { ExercisePlayer } from "@/components/child/ExercisePlayer";
import type { Level, ModuleId } from "@/types/exercise";

const searchSchema = z.object({ childId: z.string() });

export const Route = createFileRoute("/child/module/$moduleId/level/$levelId/play")({
  validateSearch: searchSchema,
  component: PlayPage,
});

function getLevel(moduleId: string, levelId: number): Level | undefined {
  const map: Record<string, Level[]> = {
    math: MATH_LEVELS,
    geography: GEOGRAPHY_LEVELS,
    history: HISTORY_LEVELS,
  };
  return map[moduleId]?.find((l) => l.id === levelId);
}

function PlayPage() {
  const navigate = useNavigate();
  const { moduleId, levelId } = Route.useParams();
  const { childId } = Route.useSearch();
  const level = getLevel(moduleId, parseInt(levelId));

  if (!level) return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-red-500">Niveau introuvable</p>
    </div>
  );

  function handleFinish(score: number, passed: boolean) {
    navigate({
      to: "/child/module/$moduleId/level/$levelId/result",
      params: { moduleId, levelId },
      search: { childId, score: String(score), passed: String(passed), total: String(level!.exercises.length) },
    });
  }

  function handleQuit() {
    navigate({ to: "/child/module/$moduleId/levels", params: { moduleId }, search: { childId } });
  }

  return (
    <ExercisePlayer
      level={level}
      moduleId={moduleId as ModuleId}
      childId={childId}
      onFinish={handleFinish}
      onQuit={handleQuit}
    />
  );
}
