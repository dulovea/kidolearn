import type { ExerciseType } from "@/types/exercise";

// ── Strict TTS rules — NEVER reveals the answer ───────────────────────────────

const VISUAL_PROMPTS: Record<ExerciseType, string> = {
  "choice":       "",                                           // uses exercise ttsText
  "numpad":       "",
  "count":        "Combien y a-t-il d'objets ?",
  "compare":      "Quel est le plus grand ?",
  "compare-sign": "Quel signe convient entre ces deux nombres ?",
  "match":        "Relie chaque élément à sa paire !",
  "sequence":     "Qu'est-ce qui vient ensuite ?",
  "order":        "Mets ces éléments dans le bon ordre !",
  "pattern":      "Qu'est-ce qui vient ensuite ?",
  "memory":       "Mémorise bien ce que tu vois !",
  "grid-find":    "Trouve les éléments identiques !",
  "categorize":   "Range chaque élément dans la bonne catégorie !",
  "clock":        "Quelle heure est-il ?",
  "fraction":     "Quelle fraction est coloriée ?",
  "bar-chart":    "Lis le graphique et réponds !",
  "symmetry":     "Complète la figure symétrique !",
  "maze":         "Trouve le bon chemin !",
};

// Types where TTS must use the fixed prompt (not the exercise ttsText)
const ALWAYS_USE_VISUAL_PROMPT = new Set<ExerciseType>([
  "count", "compare", "compare-sign", "match", "sequence", "order",
  "pattern", "memory", "grid-find", "categorize", "clock", "fraction",
  "bar-chart", "symmetry", "maze",
]);

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speak(type: ExerciseType, ttsText: string): void {
  if (!("speechSynthesis" in window)) return;

  const text = ALWAYS_USE_VISUAL_PROMPT.has(type)
    ? VISUAL_PROMPTS[type]
    : ttsText;

  if (!text) return;

  window.speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "fr-FR";
  currentUtterance.rate = 0.9;
  currentUtterance.pitch = 1.1;

  // Pick a natural French voice if available
  const voices = window.speechSynthesis.getVoices();
  const frVoice = voices.find(
    (v) => v.lang.startsWith("fr") && (v.name.includes("Google") || v.name.includes("Thomas") || v.name.includes("Amélie"))
  ) ?? voices.find((v) => v.lang.startsWith("fr"));
  if (frVoice) currentUtterance.voice = frVoice;

  window.speechSynthesis.speak(currentUtterance);
}

export function stopSpeech(): void {
  window.speechSynthesis.cancel();
}

// Call once on first user interaction to pre-load voices
export function primeVoices(): void {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
}
