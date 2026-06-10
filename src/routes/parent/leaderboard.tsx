import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/parent/leaderboard")({
  component: LeaderboardPage,
});

interface LeaderEntry {
  parent_id: string;
  display_name: string;
  weekly_score: number;
  rank: number;
}

function LeaderboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      // Weekly window: last 7 days
      const since = new Date(Date.now() - 7 * 86400000).toISOString();

      const { data } = await (supabase
        .from("parent_trivia_sessions" as any)
        .select("parent_id, score")
        .gte("played_at", since) as any);

      if (!data) { setLoading(false); return; }

      // Aggregate scores per parent
      const totals = new Map<string, number>();
      for (const row of data as { parent_id: string; score: number }[]) {
        totals.set(row.parent_id, (totals.get(row.parent_id) ?? 0) + row.score);
      }

      // Sort and rank
      const sorted = [...totals.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([parent_id, weekly_score], i) => ({
          parent_id,
          display_name: parent_id === user?.id ? "Vous" : `Parent ${i + 1}`,
          weekly_score,
          rank: i + 1,
        }));

      setEntries(sorted);
      const me = sorted.find((e) => e.parent_id === user?.id);
      setMyRank(me?.rank ?? null);
      setLoading(false);
    }
    load();
  }, [user]);

  const MEDALS = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-parent-bg px-4 py-6">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => navigate({ to: "/parent/dashboard" })}
            className="text-sm text-slate-400 hover:text-slate-600">← Retour</button>
          <h1 className="text-lg font-bold text-parent-primary">🏆 Classement parents</h1>
        </div>

        {/* My rank banner */}
        {myRank && (
          <div className="mb-5 rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-indigo-700">
              Votre rang cette semaine : <span className="text-xl font-extrabold">#{myRank}</span>
            </p>
            {myRank === 1 && (
              <p className="mt-1 text-xs font-bold text-amber-600">🏅 Champion de la semaine !</p>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-parent-accent border-t-transparent" />
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 shadow text-center">
            <p className="text-4xl mb-2">🌱</p>
            <p className="font-semibold text-slate-600">Pas encore de données cette semaine.</p>
            <p className="mt-1 text-sm text-slate-400">Jouez au trivia pour apparaître ici !</p>
            <button onClick={() => navigate({ to: "/parent/trivia/" })}
              className="mt-4 rounded-lg bg-parent-accent px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
              Jouer au trivia
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.map((entry) => (
              <div key={entry.parent_id}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm ${
                  entry.parent_id === user?.id ? "bg-indigo-50 border-2 border-indigo-300" : "bg-white"
                }`}>
                <span className="text-xl w-8 text-center">
                  {entry.rank <= 3 ? MEDALS[entry.rank - 1] : `#${entry.rank}`}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">
                    {entry.display_name}
                    {entry.rank === 1 && (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                        Champion
                      </span>
                    )}
                  </p>
                </div>
                <p className="font-bold text-parent-accent">{entry.weekly_score} pts</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-center text-xs text-slate-400">Classement basé sur les 7 derniers jours</p>
      </div>
    </div>
  );
}
