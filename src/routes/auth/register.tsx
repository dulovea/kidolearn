import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const redirectTo = `${window.location.origin}/auth/login?confirmed=true`;

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name, role: "parent" },
        emailRedirectTo: redirectTo,
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // If Supabase auto-confirms (no email required), session exists immediately
    if (data.session) {
      navigate({ to: "/parent/dashboard" });
    } else {
      setPendingConfirm(true);
    }
  }

  if (pendingConfirm) {
    return (
      <div className="parent-space flex min-h-screen flex-col items-center justify-center bg-parent-bg px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-xl font-bold text-parent-primary mb-2">Vérifiez votre email</h2>
          <p className="text-sm text-slate-500 mb-6">
            Un lien de confirmation a été envoyé à <strong>{email}</strong>.<br />
            Cliquez dessus pour activer votre compte.
          </p>
          <a href="/auth/login"
            className="block rounded-lg bg-parent-accent py-2 text-sm font-semibold text-white text-center hover:opacity-90">
            Aller à la connexion
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-space flex min-h-screen flex-col items-center justify-center bg-parent-bg px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-parent-primary">KidoLearn</h1>
        <p className="mb-6 text-center text-sm text-parent-secondary">Créer un compte parent</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input type="text" placeholder="Votre prénom" required value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-parent-accent focus:ring-2 focus:ring-parent-accent/20" />
          <input type="email" placeholder="Email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-parent-accent focus:ring-2 focus:ring-parent-accent/20" />
          <input type="password" placeholder="Mot de passe (min. 8 caractères)" required minLength={8} value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-parent-accent focus:ring-2 focus:ring-parent-accent/20" />

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

          <button type="submit" disabled={loading}
            className="rounded-lg bg-parent-accent py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Création…" : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Déjà un compte ?{" "}
          <a href="/auth/login" className="text-parent-accent hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
