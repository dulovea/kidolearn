import type { OfflineQueueItem, LearningSession, ActivityProgress } from "@/types";

const QUEUE_KEY = "kidolearn:offline_queue";
const ACTIVE_CHILD_KEY = "kidolearn:active_child";
const CHILD_PROFILES_KEY = "kidolearn:child_profiles";

// ── Queue ─────────────────────────────────────────────────────────────────────

export function getQueue(): OfflineQueueItem[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function enqueue(
  type: "session" | "progress",
  payload: LearningSession | ActivityProgress
) {
  const item: OfflineQueueItem = {
    id: crypto.randomUUID(),
    type,
    payload,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(QUEUE_KEY, JSON.stringify([...getQueue(), item]));
}

export function dequeue(ids: string[]) {
  const remaining = getQueue().filter((item) => !ids.includes(item.id));
  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
}

// ── Active child session ──────────────────────────────────────────────────────

export function getActiveChildId(): string | null {
  return localStorage.getItem(ACTIVE_CHILD_KEY);
}

export function setActiveChildId(id: string | null) {
  if (id) {
    localStorage.setItem(ACTIVE_CHILD_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_CHILD_KEY);
  }
}

// ── Cached child profiles ─────────────────────────────────────────────────────

export function getCachedChildProfiles(): unknown[] {
  try {
    return JSON.parse(localStorage.getItem(CHILD_PROFILES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function setCachedChildProfiles(profiles: unknown[]) {
  localStorage.setItem(CHILD_PROFILES_KEY, JSON.stringify(profiles));
}
