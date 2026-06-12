import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { acceptInvite } from "@/lib/family";

const searchSchema = z.object({ token: z.string() });

export const Route = createFileRoute("/auth/accept-invite")({
  validateSearch: searchSchema,
  component: AcceptInvitePage,
});

function AcceptInvitePage() {
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function accept() {
      // Wait for Supabase to pick up the session from the URL (magic link)
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;

      if (!userId) {
        setStatus("error");
        setMessage("Session introuvable. Recliquez sur le lien d'invitation.");
        return;
      }

      const { error } = await acceptInvite(token, userId);
      if (error) {
        setStatus("error");
        setMessage(error);
      } else {
        setStatus("success");
      }
    }
    accept();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parent-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-parent-accent border-t-transparent" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-parent-bg px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg text-center">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Invitation invalide</h2>
          <p className="text-sm text-slate-500 mb-5">{message}</p>
          <a href="/auth/login" className="block rounded-lg bg-parent-accent py-2 text-sm font-semibold text-white hover:opacity-90">
            Aller à la connexion
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-parent-bg px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">👨‍👩‍👧</div>
        <h2 className="text-xl font-bold text-green-700 mb-2">Bienvenue dans la famille !</h2>
        <p className="text-sm text-slate-500 mb-6">
          Vous avez rejoint l'espace familial KidoLearn. Vous pouvez maintenant voir et suivre les enfants de la famille.
        </p>
        <button onClick={() => navigate({ to: "/parent/dashboard" })}
          className="w-full rounded-lg bg-parent-accent py-2 text-sm font-semibold text-white hover:opacity-90">
          Accéder au tableau de bord →
        </button>
      </div>
    </div>
  );
}
