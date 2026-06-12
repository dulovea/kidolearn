import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  childName: string;
  onDone: () => void;
}

export function ChildOnboarding({ childName, onDone }: Props) {
  const [step, setStep] = useState(0);

  const STEPS = [
    {
      emoji: "🌟",
      bg: "from-violet-400 to-indigo-500",
      title: `Salut ${childName} !`,
      body: "Bienvenue dans ton espace d'apprentissage ! Ici tu vas apprendre des maths, découvrir le monde et gagner des étoiles ⭐",
    },
    {
      emoji: "🎮",
      bg: "from-amber-400 to-orange-500",
      title: "Comment jouer ?",
      body: "🔢 Le bouton Jouer te fait pratiquer les maths et la logique, niveau par niveau.\n🧠 Le bouton Trivia te pose des questions de culture générale sur le monde et l'Afrique.\nSi tu te trompes, pas de panique — tu verras la bonne réponse 😊",
    },
    {
      emoji: "🚀",
      bg: "from-green-400 to-teal-500",
      title: "Prêt(e) à commencer ?",
      body: `Tu dois avoir 16 bonnes réponses sur 20 pour passer au niveau suivant. Bonne chance ${childName} !`,
    },
  ];

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-child-bg to-indigo-100 px-6">
      {/* Progress dots */}
      <div className="flex gap-3 mb-8">
        {STEPS.map((_, i) => (
          <div key={i} className={cn(
            "rounded-full transition-all duration-300",
            i === step ? "w-8 h-3 bg-child-primary" : i < step ? "w-3 h-3 bg-child-primary/50" : "w-3 h-3 bg-slate-300"
          )} />
        ))}
      </div>

      {/* Card */}
      <div className={cn(
        "w-full max-w-sm rounded-3xl bg-gradient-to-br p-8 text-white shadow-2xl text-center mb-8 transition-all duration-300",
        current.bg
      )}>
        <div className="text-8xl mb-6 animate-bounce">{current.emoji}</div>
        <h2 className="text-2xl font-extrabold mb-4">{current.title}</h2>
        <p className="text-base leading-relaxed opacity-90 whitespace-pre-line">{current.body}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full max-w-sm">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)}
            className="flex-1 rounded-2xl border-2 border-slate-300 bg-white py-4 text-base font-bold text-slate-500 active:scale-95 transition">
            ← Retour
          </button>
        )}
        <button onClick={() => isLast ? onDone() : setStep((s) => s + 1)}
          className="flex-1 rounded-2xl bg-child-primary py-4 text-base font-extrabold text-white shadow-lg active:scale-95 transition hover:opacity-90">
          {isLast ? "C'est parti ! 🎉" : "Suivant →"}
        </button>
      </div>
    </div>
  );
}
