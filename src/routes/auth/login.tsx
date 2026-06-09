import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      navigate({ to: "/parent/dashboard" });
    }
  }

  return (
    <div className="parent-space flex min-h-screen flex-col items-center justify-center bg-parent-bg px-4">
      {!isSupabaseConfigured && (
        <div className="mb-4 w-full max-w-sm rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <p className="font-semibold">⚙️ Configuration requise</p>
          <p className="mt-1">
            Copiez <code className="rounded bg-amber-100 px-1">.env.example</code> en{" "}
            <code className="rounded bg-amber-100 px-1">.env</code> et renseignez vos clés
            Supabase. La connexion ne fonctionnera pas sans ça.
          </p>
        </div>
      )}
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-parent-primary">KidoLearn</h1>
        <p className="mb-6 text-center text-sm text-parent-secondary">Espace parent — connexion</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-parent-accent focus:ring-2 focus:ring-parent-accent/20"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-parent-accent focus:ring-2 focus:ring-parent-accent/20"
          />

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-parent-accent py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Pas encore de compte ?{" "}
          <a href="/auth/register" className="text-parent-accent hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}
