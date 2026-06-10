export async function generateTriviaQuestions(prompt: string): Promise<string> {
  const res = await fetch("/api/trivia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  return data.text;
}

async function callClaude(systemPrompt: string, userPrompt: string): Promise<string> {
  const prompt = systemPrompt ? `${systemPrompt}\n\n${userPrompt}` : userPrompt;
  return generateTriviaQuestions(prompt);
}

export interface AiTriviaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  fun: string;
  category: string;
}

/** Generate AI trivia questions for a given child (age-based) */
export async function generateAiQuestions(
  childName: string,
  age: number,
  count = 3,
  date: string
): Promise<AiTriviaQuestion[]> {
  const system = `Tu es un expert en éducation pour enfants africains. Génère des questions de trivia éducatives, culturellement adaptées à l'Afrique de l'Ouest (surtout le Bénin), pour un enfant de ${age} ans. Les questions doivent être en français, amusantes, et adaptées à l'âge.`;

  const user = `Génère exactement ${count} questions de trivia pour ${childName} (${age} ans) pour la date ${date}.
Retourne UNIQUEMENT un tableau JSON valide, sans texte autour, avec ce format exact :
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "fun": "Le saviez-vous : ...",
    "category": "🌍 Afrique"
  }
]
Thèmes : histoire africaine, géographie du Bénin, animaux d'Afrique, culture locale, sciences, nature.`;

  try {
    const raw = await callClaude(system, user);
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("JSON non trouvé dans la réponse");
    const parsed = JSON.parse(jsonMatch[0]) as AiTriviaQuestion[];
    return parsed.slice(0, count);
  } catch {
    return [];
  }
}

/** Generate trivia questions for parent solo mode */
export async function generateParentTrivia(count = 10): Promise<AiTriviaQuestion[]> {
  const system = `Tu es un expert en culture générale africaine. Génère des questions de trivia de niveau adulte sur l'Afrique, le Bénin, l'histoire, la géographie, la culture. Questions en français.`;

  const user = `Génère exactement ${count} questions de trivia adulte sur l'Afrique et la culture générale.
Retourne UNIQUEMENT un tableau JSON valide :
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "fun": "Le saviez-vous : ...",
    "category": "🌍 Culture"
  }
]`;

  try {
    const raw = await callClaude(system, user);
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("JSON non trouvé dans la réponse");
    return JSON.parse(jsonMatch[0]) as AiTriviaQuestion[];
  } catch {
    return [];
  }
}
