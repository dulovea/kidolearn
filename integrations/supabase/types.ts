// Skeleton — replace with output of `npx supabase gen types typescript` once your schema is set.

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: "parent" | "child";
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      child_profiles: {
        Row: {
          id: string;
          parent_id: string;
          name: string;
          birth_date: string;
          avatar_emoji: string;
          pin: string | null;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          name: string;
          birth_date: string;
          avatar_emoji?: string;
          pin?: string | null;
          settings?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["child_profiles"]["Insert"]>;
      };
      exercise_attempts: {
        Row: {
          id: string;
          child_id: string;
          module_id: string;
          level_id: number;
          score: number;
          stars: number;
          played_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          module_id: string;
          level_id: number;
          score: number;
          stars?: number;
          played_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["exercise_attempts"]["Insert"]>;
      };
      learning_sessions: {
        Row: {
          id: string;
          child_id: string;
          activity_id: string;
          started_at: string;
          completed_at: string | null;
          duration_seconds: number;
          score: number | null;
          stars: number;
          offline: boolean;
          synced: boolean;
        };
        Insert: {
          id: string;
          child_id: string;
          activity_id: string;
          started_at: string;
          completed_at?: string | null;
          duration_seconds?: number;
          score?: number | null;
          stars?: number;
          offline?: boolean;
          synced?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["learning_sessions"]["Insert"]>;
      };
      activity_progress: {
        Row: {
          child_id: string;
          activity_id: string;
          best_score: number;
          attempts: number;
          last_played_at: string | null;
          total_time_seconds: number;
          stars: number;
        };
        Insert: {
          child_id: string;
          activity_id: string;
          best_score?: number;
          attempts?: number;
          last_played_at?: string | null;
          total_time_seconds?: number;
          stars?: number;
        };
        Update: Partial<Database["public"]["Tables"]["activity_progress"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
