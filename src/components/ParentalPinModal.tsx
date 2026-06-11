import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  parentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const DIGITS = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

export function ParentalPinModal({ parentId, onSuccess, onCancel }: Props) {
  const [pin, setPin] = useState("");
  // undefined = loading, null = not set, string = set
  const [storedPin, setStoredPin] = useState<string | null | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    (supabase.from("profiles" as any).select("parental_pin").eq("id", parentId).single() as any)
      .then(({ data }: any) => setStoredPin(data?.parental_pin ?? null));
  }, [parentId]);

  function press(digit: string) {
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (next === storedPin) {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => setPin(""), 600);
      }
    }
  }

  function del() { setPin((p) => p.slice(0, -1)); setError(false); }

  if (storedPin === undefined) return null;

  if (storedPin === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-center">
          <p className="text-4xl mb-3">🔓</p>
          <p className="text-lg font-bold text-slate-800 mb-2">Aucun code parent défini</p>
          <p className="text-sm text-slate-500 mb-5">
            Définissez un code depuis votre tableau de bord pour sécuriser l'accès.
          </p>
          <div className="flex gap-3">
            <button onClick={onCancel}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50">
              Annuler
            </button>
            <button onClick={onSuccess}
              className="flex-1 rounded-xl bg-parent-accent py-2.5 text-sm font-bold text-white hover:opacity-90">
              Continuer quand même
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
        <p className="text-center text-base font-bold text-slate-700 mb-1">🔒 Code parent</p>
        <p className="text-center text-sm text-slate-400 mb-5">Entre le code parent pour continuer</p>

        <div className="flex justify-center gap-3 mb-5">
          {[0,1,2,3].map((i) => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all ${
              pin.length > i
                ? error ? "bg-red-500 border-red-500 scale-110" : "bg-parent-accent border-parent-accent"
                : "border-slate-300"
            }`} />
          ))}
        </div>

        {error && <p className="text-center text-xs text-red-500 mb-3">Code incorrect, réessaie.</p>}

        <div className="grid grid-cols-3 gap-2">
          {DIGITS.map((d, i) =>
            d === "" ? <div key={i} /> :
            d === "⌫" ? (
              <button key={i} onClick={del}
                className="rounded-xl bg-slate-100 py-3 text-xl font-bold text-slate-500 hover:bg-slate-200 active:scale-95 transition">
                ⌫
              </button>
            ) : (
              <button key={i} onClick={() => press(d)}
                className="rounded-xl bg-slate-100 py-3 text-xl font-bold text-slate-700 hover:bg-slate-200 active:scale-95 transition">
                {d}
              </button>
            )
          )}
        </div>

        <button onClick={onCancel} className="mt-4 w-full text-xs text-slate-400 underline">Annuler</button>
      </div>
    </div>
  );
}
