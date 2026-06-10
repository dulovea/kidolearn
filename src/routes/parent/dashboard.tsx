import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useChildProfiles } from "@/hooks/useChildProfile";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { supabase } from "@/lib/supabase";
import { getProgress } from "@/lib/progress";
import { MATH_LEVELS } from "@/data/math-levels";
import type { ChildProfile } from "@/types";

export const Route = createFileRoute("/parent/dashboard")({
  component: ParentDashboard,
});

function ParentDashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { profiles, loading: profilesLoading } = useChildProfiles(user?.id);
  const { pendingCount, syncing } = useOfflineSync();

  if (loading) return <LoadingScreen />;
  if (!user) { navigate({ to: "/auth/login" }); return null; }

  return (
    <div className="parent-space min-h-screen bg-parent-bg">
      <header className="border-b border-slate-200 bg-white px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-parent-primary">KidoLearn</h1>
            <p className="text-xs text-parent-secondary">Tableau de bord parent</p>
          </div>
          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                {syncing ? "Sync…" : `${pendingCount} en attente`}
              </span>
            )}
            <button onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/auth/login" }))}
              className="text-xs text-slate-400 hover:text-slate-700">Déconnexion</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Parent quick actions */}
        <section className="mb-6">
          <h2 className="mb-3 text-base font-semibold text-parent-primary">Espace parent</h2>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => navigate({ to: "/parent/trivia" })}
              className="flex flex-col items-center gap-1 rounded-xl bg-white border border-slate-200 p-3 shadow-sm hover:border-parent-accent transition">
              <span className="text-2xl">🧠</span>
              <span className="text-xs font-medium text-slate-600 text-center">Trivia solo</span>
            </button>
            <button onClick={() => navigate({ to: "/parent/trivia/challenge" })}
              className="flex flex-col items-center gap-1 rounded-xl bg-white border border-slate-200 p-3 shadow-sm hover:border-parent-accent transition">
              <span className="text-2xl">📤</span>
              <span className="text-xs font-medium text-slate-600 text-center">Créer un défi</span>
            </button>
            <button onClick={() => navigate({ to: "/parent/leaderboard" })}
              className="flex flex-col items-center gap-1 rounded-xl bg-white border border-slate-200 p-3 shadow-sm hover:border-parent-accent transition">
              <span className="text-2xl">🏆</span>
              <span className="text-xs font-medium text-slate-600 text-center">Classement</span>
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-base font-semibold text-parent-primary">Mes enfants</h2>

          {profilesLoading ? (
            <p className="text-sm text-slate-400">Chargement…</p>
          ) : profiles.length === 0 ? (
            <EmptyChildren onAdd={() => navigate({ to: "/parent/children/new" })} />
          ) : (
            <div className="flex flex-col gap-6">
              {profiles.map((child) => (
                <ChildCard key={child.id} child={child}
                  onPlay={() => navigate({ to: "/child/home", search: { childId: child.id } })}
                  onStats={() => navigate({ to: "/parent/children/$childId/stats", params: { childId: child.id } })}
                  onTrivia={() => navigate({ to: "/parent/trivia" })}
                  onDuel={() => navigate({ to: "/parent/trivia/duel/$childId", params: { childId: child.id } })}
                />
              ))}
              <button onClick={() => navigate({ to: "/parent/children/new" })}
                className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-4 text-slate-400 hover:border-parent-accent hover:text-parent-accent">
                <span className="text-2xl">+</span><span className="text-sm font-medium">Ajouter un enfant</span>
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ChildCard({
  child,
  onPlay,
  onStats,
  onTrivia,
  onDuel,
}: {
  child: ChildProfile;
  onPlay: () => void;
  onStats: () => void;
  onTrivia: () => void;
  onDuel: () => void;
}) {
  const p = getProgress(child.id);
  const mathCompleted = MATH_LEVELS.filter((l) => p.levels[`math-${l.id}`]?.completed).length;
  const totalMath = MATH_LEVELS.length;

  const lastKeys = Object.values(p.levels).sort((a, b) => b.lastPlayedAt.localeCompare(a.lastPlayedAt));
  const lastPlayed = lastKeys[0]?.lastPlayedAt;
  const daysSince = lastPlayed
    ? Math.floor((Date.now() - new Date(lastPlayed).getTime()) / 86400000)
    : null;
  const alert = daysSince !== null && daysSince >= 3;

  const triviaStreak = p.triviaStreak;
  const lastTriviaDate = (p as any).lastTriviaDate as string | undefined;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl">{child.avatarEmoji}</span>
        <div>
          <p className="font-bold text-parent-primary text-lg">{child.name}</p>
          {alert && (
            <p className="text-xs text-amber-600 font-medium">⚠️ N'a pas joué depuis {daysSince} jours</p>
          )}
          {lastTriviaDate && (
            <p className="text-xs text-slate-400">Dernier trivia : {new Date(lastTriviaDate).toLocaleDateString("fr-FR")}</p>
          )}
        </div>
      </div>

      {/* Progress bars */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>🔢 Maths</span><span>{mathCompleted}/{totalMath}</span>
          </div>
          <div className="bg-slate-100 rounded-full h-2">
            <div className="bg-parent-accent h-2 rounded-full" style={{ width: `${(mathCompleted/totalMath)*100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>🧠 Trivia streak</span><span>{triviaStreak} 🔥</span>
          </div>
          <div className="bg-slate-100 rounded-full h-2">
            <div className="bg-violet-400 h-2 rounded-full" style={{ width: `${Math.min((triviaStreak/7)*100, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onPlay} className="rounded-lg bg-parent-accent px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
          🎮 Jouer
        </button>
        <button onClick={onStats} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
          📊 Stats
        </button>
        <button onClick={onTrivia} className="rounded-lg bg-violet-500 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
          🧠 Jouer au Trivia
        </button>
        <button onClick={onDuel} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
          ⚔️ Défier {child.name}
        </button>
      </div>
    </div>
  );
}

function EmptyChildren({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-10 text-center">
      <span className="text-5xl">👶</span>
      <p className="font-semibold text-parent-primary">Aucun profil enfant</p>
      <p className="text-sm text-slate-400">Créez un profil pour commencer l'aventure</p>
      <button onClick={onAdd} className="rounded-lg bg-parent-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
        Créer un profil
      </button>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-parent-bg">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-parent-accent border-t-transparent" />
    </div>
  );
}
