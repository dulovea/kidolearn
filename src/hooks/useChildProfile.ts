import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getCachedChildProfiles, setCachedChildProfiles } from "@/lib/offline";
import type { ChildProfile } from "@/types";
import type { Database } from "@/lib/supabase";

type ChildProfileRow = Database["public"]["Tables"]["child_profiles"]["Row"];

export function useChildProfiles(parentId: string | undefined) {
  const [profiles, setProfiles] = useState<ChildProfile[]>(
    () => getCachedChildProfiles() as ChildProfile[]
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!parentId) {
      setLoading(false);
      return;
    }

    supabase
      .from("child_profiles")
      .select("*")
      .eq("parent_id", parentId)
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else if (data) {
          const rows = data as unknown as ChildProfileRow[];
          const mapped: ChildProfile[] = rows.map((r) => ({
            id: r.id,
            parentId: r.parent_id,
            name: r.name,
            birthDate: r.birth_date,
            avatarEmoji: r.avatar_emoji,
            pin: r.pin ?? undefined,
            settings: r.settings as unknown as ChildProfile["settings"],
            createdAt: r.created_at,
            updatedAt: r.updated_at,
          }));
          setProfiles(mapped);
          setCachedChildProfiles(mapped);
        }
        setLoading(false);
      });
  }, [parentId]);

  return { profiles, loading, error };
}
