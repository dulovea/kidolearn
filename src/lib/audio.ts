// Web Audio API — no external lib needed

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.4
): void {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gainNode = ac.createGain();
    osc.connect(gainNode);
    gainNode.connect(ac.destination);
    osc.type = type;
    osc.frequency.value = frequency;
    gainNode.gain.setValueAtTime(gain, ac.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch {
    // AudioContext may be blocked until user gesture — silent fail
  }
}

/** 3-note joyful arpeggio for correct answer */
export function playCorrect(): void {
  playTone(523.25, 0.15); // C5
  setTimeout(() => playTone(659.25, 0.15), 100); // E5
  setTimeout(() => playTone(783.99, 0.3), 200); // G5
}

/** Soft UI tick for interactions */
export function playTick(): void {
  playTone(880, 0.05, "square", 0.15);
}

/** Resume AudioContext after user gesture (required by browsers) */
export function resumeAudio(): void {
  try {
    getCtx().resume();
  } catch {
    // ignore
  }
}
