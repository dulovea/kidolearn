import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCachedChildProfiles } from "@/lib/offline";
import { getProgress } from "@/lib/progress";
import { MATH_LEVELS } from "@/data/math-levels";
import { GEOGRAPHY_LEVELS } from "@/data/geography-levels";
import { HISTORY_LEVELS } from "@/data/history-levels";
import type { ChildProfile } from "@/types";
import type { ModuleId } from "@/types/exercise";
import { z } from "zod";
import { primeVoices } from "@/lib/speech";
import { resumeAudio } from "@/lib/audio";

const searchSchema = z.object({ childId: z.string() });

export const Route = createFileRoute("/child/home")({
  validateSearch: searchSchema,
  component: ChildHome,
});

interface ModuleCard {
  id: ModuleId;
  emoji: string;
  title: string;
  subtitle: string;
  bg: string;
  levelsCount: number;
}

const MODULES: ModuleCard[] = [
  { id:"math",      emoji:"🔢", title:"Maths & Intelligence", subtitle:"10 niveaux — CI au CM2", bg:"from-indigo-100 to-purple-100", levelsCount:10 },
  { id:"geography", emoji:"🌍", title:"Géographie",           subtitle:"3 niveaux — CEDEAO au monde", bg:"from-sky-100 to-cyan-100", levelsCount:3 },
  { id:"history",   emoji:"📜", title:"Histoire & Culture",   subtitle:"3 niveaux — Bénin & Afrique", bg:"from-amber-100 to-orange-100", levelsCount:3 },
  { id:"trivia",    emoji:"🧠", title:"Trivia du Jour",       subtitle:"10 questions chaque matin", bg:"from-violet-100 to-pink-100", levelsCount:1 },
];

function getUnlockedCount(childId: string, moduleId: ModuleId) {
  const p = getProgress(childId);
  const levels = moduleId === "math" ? MATH_LEVELS : moduleId === "geography" ? GEOGRAPHY_LEVELS : HISTORY_LEVELS;
  return levels.filter((l) => p.levels[`${moduleId}-${l.id}`]?.completed).length;
}

export function ChildHome() {
  const navigate = useNavigate();
  const { childId } = Route.useSearch();
  const [child, setChild] = useState<ChildProfile | null>(null);

  useEffect(() => {
    const profiles = getCachedChildProfiles() as ChildProfile[];
    setChild(profiles.find((p) => p.id === childId) ?? null);
    primeVoices();
    resumeAudio();
  }, [childId]);

  if (!child) return (
    <div className="child-space flex min-h-screen items-center justify-center bg-child-bg">
      <p className="text-xl text-slate-400">Profil introuvable</p>
    </div>
  );

  return (
    <div className="child-space min-h-screen bg-gradient-to-b from-child-bg to-indigo-50 px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <button onClick={() => navigate({ to: "/parent/dashboard" })}
          className="rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur hover:bg-white">
          ← Papa / Maman
        </button>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{child.avatarEmoji}</span>
          <span className="text-xl font-extrabold text-child-primary">{child.name}</span>
        </div>
      </header>

      <h1 className="text-center text-3xl font-extrabold text-child-primary mb-8">
        Bonjour {child.name} ! 👋
      </h1>

      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        {MODULES.map((mod) => {
          const completed = mod.id !== "trivia" ? getUnlockedCount(childId, mod.id) : null;
          return (
            <button key={mod.id}
              onClick={() => {
                if (mod.id === "trivia") navigate({ to: "/child/trivia", search: { childId } });
                else navigate({ to: "/child/module/$moduleId/levels", params: { moduleId: mod.id }, search: { childId } });
              }}
              className={cn(
                "bg-gradient-to-r rounded-3xl p-5 flex items-center gap-4 shadow-sm active:scale-95 transition",
                mod.bg
              )}>
              <span className="text-5xl">{mod.emoji}</span>
              <div className="flex-1 text-left">
                <p className="text-lg font-extrabold text-slate-800">{mod.title}</p>
                <p className="text-sm text-slate-500">{mod.subtitle}</p>
                {completed !== null && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-white/60 rounded-full h-2">
                      <div className="bg-child-primary h-2 rounded-full"
                        style={{ width: `${(completed / mod.levelsCount) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{completed}/{mod.levelsCount}</span>
                  </div>
                )}
              </div>
              <span className="text-2xl">→</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function cn(...c: (string | boolean | undefined)[]) {
  return c.filter(Boolean).join(" ");
}
