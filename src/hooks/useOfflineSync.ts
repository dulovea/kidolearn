import { useEffect, useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getQueue, dequeue } from "@/lib/offline";

export function useOfflineSync() {
  const [syncing, setSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(() => getQueue().length);

  const sync = useCallback(async () => {
    const queue = getQueue();
    if (queue.length === 0 || syncing) return;

    setSyncing(true);
    const synced: string[] = [];

    for (const item of queue) {
      try {
        if (item.type === "session") {
          const { error } = await supabase
            .from("learning_sessions")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .upsert(item.payload as any);
          if (!error) synced.push(item.id);
        } else if (item.type === "progress") {
          const { error } = await supabase
            .from("activity_progress")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .upsert(item.payload as any);
          if (!error) synced.push(item.id);
        }
      } catch {
        // keep item — retry on next sync
      }
    }

    dequeue(synced);
    setPendingCount(getQueue().length);
    setSyncing(false);
  }, [syncing]);

  useEffect(() => {
    window.addEventListener("online", sync);
    return () => window.removeEventListener("online", sync);
  }, [sync]);

  useEffect(() => {
    if (navigator.onLine) sync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { syncing, pendingCount, sync };
}
