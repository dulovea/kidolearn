import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/parent/children/$childId/stats")({
  component: ChildStatsPage,
});

function ChildStatsPage() {
  const navigate = useNavigate();
  const { childId } = Route.useParams();

  return (
    <div className="parent-space min-h-screen bg-parent-bg px-6 py-8">
      <button
        onClick={() => navigate({ to: "/parent/dashboard" })}
        className="mb-4 text-xs text-slate-400 hover:text-slate-600"
      >
        ← Retour
      </button>
      <h2 className="mb-6 text-xl font-bold text-parent-primary">Statistiques</h2>
      <p className="text-sm text-slate-400">Profil enfant : {childId}</p>
    </div>
  );
}
