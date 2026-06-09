import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-child-bg">
        <div className="text-4xl animate-bounce-slow">🌟</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth/login" />;
  return <Navigate to="/parent/dashboard" />;
}
