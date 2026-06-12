import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/challenge/$code")({
  component: ChallengeLandingPage,
});

function ChallengeLandingPage() {
  const navigate = useNavigate();
  const { code } = Route.useParams();
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    // Verify code exists and is not expired
    (supabase
      .from("challenges" as any)
      .select("id, expires_at, accepted")
      .eq("code", code)
      .single() as any)
      .then(({ data }: any) => {
        if (!data) { setValid(false); setChecking(false); return; }
        const expired = new Date(data.expires_at) < new Date();
        setValid(!expired);
        setChecking(false);
      });
  }, [code]);

  async function handleAccept() {
    setAccepting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Not logged in — redirect to login, come back after
      const returnTo = encodeURIComponent(`/challenge/${code}`);
      navigate({ to: "/auth/login", search: { returnTo } as any });
    } else {
      // Logged in — mark accepted and go to trivia
      await (supabase
        .from("challenges" as any)
        .update({ accepted: true } as any)
        .eq("code", code) as any);
      navigate({ to: "/parent/trivia" });
    }
    setAccepting(false);
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parent-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-parent-accent border-t-transparent" />
      </div>
    );
  }

  if (valid === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-parent-bg px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg text-center">
          <div className="text-5xl mb-4">⏰</div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Défi expiré</h2>
          <p className="text-sm text-slate-400 mb-5">Ce code de défi est invalide ou a expiré (valable 24h).</p>
          <a href="/" className="block rounded-lg bg-parent-accent py-2 text-sm font-semibold text-white hover:opacity-90">
            Découvrir KidoLearn
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-violet-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-center">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-2xl font-extrabold text-parent-primary mb-1">Défi KidoLearn</h1>
        <p className="text-sm text-slate-500 mb-6">Quelqu'un te défie sur les questions de culture générale !</p>

        <div className="rounded-2xl bg-indigo-50 border border-indigo-200 py-4 px-6 mb-6">
          <p className="text-xs text-slate-500 mb-1">Code du défi</p>
          <p className="text-3xl font-extrabold tracking-widest text-parent-accent">{code}</p>
        </div>

        <button onClick={handleAccept} disabled={accepting}
          className="w-full rounded-xl bg-parent-accent py-3 font-bold text-white hover:opacity-90 disabled:opacity-60 text-base mb-3">
          {accepting ? "…" : "Accepter le défi 💪"}
        </button>

        <p className="text-xs text-slate-400">
          Vous serez invité à vous connecter ou créer un compte gratuit.
        </p>
      </div>
    </div>
  );
}
