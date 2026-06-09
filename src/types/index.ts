// ── Auth ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  role: "parent" | "child";
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
}

// ── Child profile (managed by parent) ────────────────────────────────────────

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  birthDate: string;
  avatarEmoji: string;
  pin?: string;
  settings: ChildSettings;
  createdAt: string;
  updatedAt: string;
}

export type AgeGroup = "2-4" | "5-7" | "8-10" | "11-12";

export interface ChildSettings {
  ageGroup: AgeGroup;
  language: "fr" | "en";
  soundEnabled: boolean;
  animationsEnabled: boolean;
  dailyGoalMinutes: number;
}

// ── Progress & sessions ───────────────────────────────────────────────────────

export interface LearningSession {
  id: string;
  childId: string;
  activityId: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  score?: number;
  stars: 0 | 1 | 2 | 3;
  offline: boolean;
  synced: boolean;
}

export interface ActivityProgress {
  childId: string;
  activityId: string;
  bestScore: number;
  attempts: number;
  lastPlayedAt: string;
  totalTimeSeconds: number;
  stars: 0 | 1 | 2 | 3;
}

// ── Activities ────────────────────────────────────────────────────────────────

export type ActivityCategory =
  | "letters"
  | "numbers"
  | "shapes"
  | "colors"
  | "logic"
  | "creativity";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: ActivityCategory;
  ageGroups: AgeGroup[];
  durationMinutes: number;
  thumbnailEmoji: string;
  isOfflineAvailable: boolean;
}

// ── Offline queue ─────────────────────────────────────────────────────────────

export interface OfflineQueueItem {
  id: string;
  type: "session" | "progress";
  payload: LearningSession | ActivityProgress;
  createdAt: string;
}
