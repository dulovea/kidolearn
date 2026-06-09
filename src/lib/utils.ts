import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AgeGroup } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAgeGroup(birthDate: string): AgeGroup {
  const age = Math.floor(
    (Date.now() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
  if (age <= 4) return "2-4";
  if (age <= 7) return "5-7";
  if (age <= 10) return "8-10";
  return "11-12";
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function starsToLabel(stars: 0 | 1 | 2 | 3): string {
  return ["Pas encore", "Bien essayé !", "Super !", "Parfait !"][stars];
}
