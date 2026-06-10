import { useState } from "react";

const STEPS = [
  {
    emoji: "👋",
    title: "Bienvenue sur KidoLearn !",
    body: "La plateforme éducative basée sur l'apprentissage par étapes pour vos enfants. Commençons par créer le profil de votre enfant.",
  },
  {
    emoji: "👶",
    title: "Créez les profils de vos enfants",
    body: "Ajoutez chaque enfant avec son prénom, sa date de naissance et son avatar. L'app adapte les exercices à son âge automatiquement.",
  },
  {
    emoji: "📊",
    title: "Suivez leur progression",
    body: "Votre tableau de bord montre en temps réel les niveaux, les étoiles gagnées et les exercices difficiles de chaque enfant.",
  },
  {
    emoji: "🧠",
    title: "Jouez aussi !",
    body: "Le Trivia du Jour vous permet de jouer et de défier vos enfants. Apprenez ensemble !",
  },
];

interface Props {
  onDone: () => void;
}

export function ParentOnboarding({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-parent-accent" : "w-2 bg-slate-200"}`} />
          ))}
        </div>

        {/* Step counter */}
        <p className="text-xs font-semibold text-slate-400 text-center mb-4">{step + 1}/{STEPS.length}</p>

        {/* Content */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{current.emoji}</div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">{current.title}</h2>
          <p className="text-sm text-slate-500 leading-relaxed">{current.body}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50">
              ← Retour
            </button>
          )}
          <button onClick={() => isLast ? onDone() : setStep((s) => s + 1)}
            className="flex-1 rounded-xl bg-parent-accent py-2.5 text-sm font-bold text-white hover:opacity-90">
            {isLast ? "Terminer et commencer" : "Suivant →"}
          </button>
        </div>
      </div>
    </div>
  );
}
