import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/parent/children/new")({
  component: NewChildPage,
});

const AVATARS = ["🐻", "🦊", "🐱", "🐶", "🐸", "🦋", "🐧", "🦄", "🐯", "🐼"];

function NewChildPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [emoji, setEmoji] = useState("🐻");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: err } = await (supabase.from("child_profiles") as any).insert({
      parent_id: user.id,
      name,
      birth_date: birthDate,
      avatar_emoji: emoji,
      pin: null,
      settings: {
        ageGroup: "5-7",
        language: "fr",
        soundEnabled: true,
        animationsEnabled: true,
        dailyGoalMinutes: 15,
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      navigate({ to: "/parent/dashboard" });
    }
  }

  return (
    <div className="parent-space flex min-h-screen flex-col items-center justify-center bg-parent-bg px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <button
          onClick={() => navigate({ to: "/parent/dashboard" })}
          className="mb-4 text-xs text-slate-400 hover:text-slate-600"
        >
          ← Retour
        </button>
        <h2 className="mb-6 text-xl font-bold text-parent-primary">Nouveau profil</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">Avatar</label>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setEmoji(av)}
                  className={`rounded-xl p-2 text-2xl transition ${
                    emoji === av
                      ? "bg-parent-accent/10 ring-2 ring-parent-accent"
                      : "hover:bg-slate-100"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Prénom</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-parent-accent focus:ring-2 focus:ring-parent-accent/20"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">Date de naissance</label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-parent-accent focus:ring-2 focus:ring-parent-accent/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-parent-accent py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Création…" : "Créer le profil"}
          </button>
        </form>
      </div>
    </div>
  );
}
