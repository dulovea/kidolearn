import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ParentOnboarding } from "@/components/ParentOnboarding";
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
  const { profiles: rawProfiles, loading: profilesLoading } = useChildProfiles(user?.id);
  const { pendingCount, syncing } = useOfflineSync();
  const [profiles, setProfiles] = useState<ChildProfile[] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ChildProfile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deletedName, setDeletedName] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem("onboarding_done")
  );
  const [pinSetup, setPinSetup] = useState<"idle" | "enter" | "confirm">("idle");
  const [pinInput, setPinInput] = useState("");
  const [pinFirst, setPinFirst] = useState("");
  const [pinSaved, setPinSaved] = useState(false);

  // Redirect back to child if session still active (child tried to access parent)
  useEffect(() => {
    const childId = sessionStorage.getItem("active_child_id");
    if (childId) navigate({ to: "/child/home", search: { childId } });
  }, [navigate]);

  function finishOnboarding() {
    localStorage.setItem("onboarding_done", "1");
    setShowOnboarding(false);
  }

  async function savePin(pin: string) {
    if (!user) return;
    await (supabase.from("profiles" as any).upsert({ id: user.id, parental_pin: pin } as any) as any);
    setPinSetup("idle");
    setPinInput("");
    setPinFirst("");
    setPinSaved(true);
    setTimeout(() => setPinSaved(false), 3000);
  }

  function handlePinDigit(d: string) {
    if (pinInput.length >= 4) return;
    const next = pinInput + d;
    setPinInput(next);
    if (next.length === 4) {
      if (pinSetup === "enter") { setPinFirst(next); setPinInput(""); setPinSetup("confirm"); }
      else if (pinSetup === "confirm") {
        if (next === pinFirst) savePin(next);
        else { setPinInput(""); setPinFirst(""); setPinSetup("enter"); }
      }
    }
  }

  const displayProfiles = profiles ?? rawProfiles;

  // Child duel history from localStorage (last 7 days)
  const duelHistory = (() => {
    const results: { date: string; childId: string; score: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
      displayProfiles.forEach((child) => {
        const raw = localStorage.getItem(`kidolearn:duel:${d}:${child.id}`);
        if (raw) results.push({ date: d, childId: child.id, score: JSON.parse(raw).score });
      });
    }
    return results;
  })();

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await (supabase.from("child_profiles" as any).delete().eq("id", deleteTarget.id) as any);
    localStorage.removeItem(`kidolearn:progress:${deleteTarget.id}`);
    setProfiles(displayProfiles.filter((p) => p.id !== deleteTarget.id));
    setDeletedName(deleteTarget.name);
    setDeleteTarget(null);
    setDeleting(false);
    setTimeout(() => setDeletedName(null), 3000);
  }

  if (loading) return <LoadingScreen />;
  if (!user) { navigate({ to: "/auth/login" }); return null; }

  return (
    <div className="parent-space min-h-screen bg-parent-bg">
      {showOnboarding && <ParentOnboarding onDone={finishOnboarding} />}
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

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <p className="text-lg font-bold text-slate-800 mb-2">Supprimer le profil ?</p>
            <p className="text-sm text-slate-500 mb-6">
              Êtes-vous sûr de vouloir supprimer le profil de <strong>{deleteTarget.name}</strong> ?
              Toutes ses données seront perdues.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={confirmDelete} disabled={deleting}
                className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60">
                {deleting ? "Suppression…" : "Supprimer définitivement"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {deletedName && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {deletedName} a été supprimé.
        </div>
      )}

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

        {/* PIN setup section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-parent-primary">🔒 Code parent</h2>
            {pinSetup === "idle" && (
              <button onClick={() => { setPinSetup("enter"); setPinInput(""); setPinFirst(""); }}
                className="text-xs font-semibold text-parent-accent hover:underline">
                Modifier
              </button>
            )}
          </div>
          {pinSetup === "idle" ? (
            <p className="text-xs text-slate-400">
              {pinSaved ? "✅ Code enregistré !" : "Sécurisez le retour vers cet espace avec un code à 4 chiffres."}
            </p>
          ) : (
            <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3 text-center">
                {pinSetup === "enter" ? "Choisissez un code à 4 chiffres" : "Confirmez le code"}
              </p>
              <div className="flex justify-center gap-2 mb-3">
                {[0,1,2,3].map((i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border-2 ${pinInput.length > i ? "bg-parent-accent border-parent-accent" : "border-slate-300"}`} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d, i) =>
                  d === "" ? <div key={i} /> :
                  d === "⌫" ? (
                    <button key={i} onClick={() => setPinInput((p) => p.slice(0,-1))}
                      className="rounded-lg bg-slate-100 py-2 text-base font-bold text-slate-500 hover:bg-slate-200">⌫</button>
                  ) : (
                    <button key={i} onClick={() => handlePinDigit(d)}
                      className="rounded-lg bg-slate-100 py-2 text-base font-bold text-slate-700 hover:bg-slate-200">{d}</button>
                  )
                )}
              </div>
              <button onClick={() => setPinSetup("idle")} className="mt-3 w-full text-xs text-slate-400 underline">Annuler</button>
            </div>
          )}
        </section>

        {/* Child duel history */}
        {duelHistory.length > 0 && displayProfiles.length >= 2 && (
          <section className="mb-6">
            <h2 className="mb-3 text-base font-semibold text-parent-primary">⚔️ Duels entre enfants</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(
                duelHistory.reduce<Record<string, { date: string; scores: { name: string; avatarEmoji: string; score: number }[] }>>((acc, entry) => {
                  const child = displayProfiles.find((p) => p.id === entry.childId);
                  if (!child) return acc;
                  if (!acc[entry.date]) acc[entry.date] = { date: entry.date, scores: [] };
                  acc[entry.date].scores.push({ name: child.name, avatarEmoji: child.avatarEmoji, score: entry.score });
                  return acc;
                }, {})
              ).slice(0, 5).map(([date, { scores }]) => {
                if (scores.length < 2) return null;
                const sorted = [...scores].sort((a, b) => b.score - a.score);
                return (
                  <div key={date} className="rounded-xl bg-white border border-slate-200 px-4 py-3 shadow-sm flex items-center justify-between">
                    <span className="text-xs text-slate-400">{new Date(date).toLocaleDateString("fr-FR")}</span>
                    <div className="flex items-center gap-2">
                      {sorted.map((s, i) => (
                        <span key={s.name} className="text-sm font-bold text-slate-700">
                          {i > 0 && <span className="text-slate-300 mx-1">vs</span>}
                          {s.avatarEmoji} {s.name} <span className={i === 0 ? "text-amber-600" : "text-slate-500"}>{s.score}/10</span>
                          {i === 0 && <span className="ml-1">🏆</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-base font-semibold text-parent-primary">Mes enfants</h2>

          {profilesLoading ? (
            <p className="text-sm text-slate-400">Chargement…</p>
          ) : displayProfiles.length === 0 ? (
            <EmptyChildren onAdd={() => navigate({ to: "/parent/children/new" })} />
          ) : (
            <div className="flex flex-col gap-6">
              {displayProfiles.map((child) => (
                <ChildCard key={child.id} child={child}
                  onPlay={() => navigate({ to: "/child/home", search: { childId: child.id } })}
                  onStats={() => navigate({ to: "/parent/children/$childId/stats", params: { childId: child.id } })}
                  onTrivia={() => navigate({ to: "/parent/trivia" })}
                  onDuel={() => navigate({ to: "/parent/trivia/duel/$childId", params: { childId: child.id } })}
                  onDelete={() => setDeleteTarget(child)}
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
  onDelete,
}: {
  child: ChildProfile;
  onPlay: () => void;
  onStats: () => void;
  onTrivia: () => void;
  onDuel: () => void;
  onDelete: () => void;
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
        <div className="flex-1">
          <p className="font-bold text-parent-primary text-lg">{child.name}</p>
          {alert && (
            <p className="text-xs text-amber-600 font-medium">⚠️ N'a pas joué depuis {daysSince} jours</p>
          )}
          {lastTriviaDate && (
            <p className="text-xs text-slate-400">Dernier trivia : {new Date(lastTriviaDate).toLocaleDateString("fr-FR")}</p>
          )}
        </div>
        <button onClick={onDelete}
          className="ml-auto text-slate-300 hover:text-red-400 text-xl p-1 rounded-lg hover:bg-red-50 transition"
          title="Supprimer ce profil">
          🗑️
        </button>
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
