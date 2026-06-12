import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useChildProfiles } from "@/hooks/useChildProfile";

export const Route = createFileRoute("/parent/trivia/challenge")({
  component: ChallengePage,
});

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "KDL-";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

interface Challenge {
  id: string;
  code: string;
  parent_id: string;
  child_id: string | null;
  created_at: string;
  expires_at: string;
  accepted: boolean;
}

function ChallengePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profiles } = useChildProfiles(user?.id);

  const [code, setCode] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [myChallenges, setMyChallenges] = useState<Challenge[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    (supabase.from("challenges" as any)
      .select("*")
      .eq("parent_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5) as any).then(({ data }: { data: Challenge[] | null }) => {
        if (data) setMyChallenges(data);
      });
  }, [user]);

  async function createChallenge() {
    if (!user) return;
    setCreating(true);
    const newCode = generateCode();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await (supabase.from("challenges" as any).insert({
      code: newCode,
      parent_id: user.id,
      child_id: selectedChild,
      expires_at: expiresAt,
      accepted: false,
    } as any).select().single() as any);

    if (!error && data) {
      setCode(newCode);
      setMyChallenges((prev) => [data as Challenge, ...prev]);
    }
    setCreating(false);
  }

  function shareOnWhatsApp() {
    if (!code) return;
    const url = `${window.location.origin}/challenge/${code}`;
    const text = encodeURIComponent(
      `Je te défie sur KidoLearn ! Clique ici pour jouer : ${url} 🧠💪`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  async function copyCode() {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isExpired = (expiresAt: string) => new Date(expiresAt) < new Date();

  return (
    <div className="min-h-screen bg-parent-bg px-4 py-6">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => navigate({ to: "/parent/dashboard" })}
            className="text-sm text-slate-400 hover:text-slate-600">← Retour</button>
          <h1 className="text-lg font-bold text-parent-primary">📤 Créer un défi</h1>
        </div>

        {/* Create card */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow">
          <p className="mb-4 text-sm text-slate-600">
            Générez un code unique à partager avec un ami ou un autre parent. Le code est valable <strong>24 heures</strong>.
          </p>

          {profiles.length > 0 && (
            <div className="mb-4">
              <label className="mb-1 block text-xs font-semibold text-slate-500">Associer à un enfant (optionnel)</label>
              <select
                value={selectedChild ?? ""}
                onChange={(e) => setSelectedChild(e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option value="">Aucun</option>
                {profiles.map((c) => (
                  <option key={c.id} value={c.id}>{c.avatarEmoji} {c.name}</option>
                ))}
              </select>
            </div>
          )}

          {!code ? (
            <button onClick={createChallenge} disabled={creating}
              className="w-full rounded-xl bg-parent-accent py-3 font-bold text-white hover:opacity-90 disabled:opacity-60">
              {creating ? "Création…" : "Générer un code défi"}
            </button>
          ) : (
            <div className="text-center">
              <div className="mb-4 rounded-xl bg-indigo-50 py-4">
                <p className="text-xs text-slate-500 mb-1">Votre code défi</p>
                <p className="text-3xl font-extrabold tracking-widest text-parent-accent">{code}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={copyCode}
                  className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                  {copied ? "✅ Copié !" : "📋 Copier"}
                </button>
                <button onClick={shareOnWhatsApp}
                  className="flex-1 rounded-xl bg-green-500 py-2 text-sm font-semibold text-white hover:opacity-90">
                  📱 WhatsApp
                </button>
              </div>
              <button onClick={() => { setCode(null); }}
                className="mt-3 w-full text-xs text-slate-400 underline">
                Créer un nouveau code
              </button>
            </div>
          )}
        </div>

        {/* History */}
        {myChallenges.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-slate-500">Mes derniers défis</h2>
            <div className="flex flex-col gap-2">
              {myChallenges.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
                  <span className="font-mono font-bold text-parent-primary">{c.code}</span>
                  <div className="flex items-center gap-2 text-xs">
                    {c.accepted && <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">Accepté</span>}
                    {isExpired(c.expires_at)
                      ? <span className="text-slate-400">Expiré</span>
                      : <span className="text-amber-600">Actif</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
