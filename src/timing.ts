import raw from "./data/words.json";

export type ScriptWord = {text: string; start: number; end: number};

export const WORDS = raw.words as ScriptWord[];
export const AUDIO_DURATION = raw.duration as number;
export const FPS = 30;

const clean = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]/g, "");

const NORM = WORDS.map((w) => clean(w.text));

const findPhrase = (phrase: string, occurrence = 0): number => {
  const target = phrase.trim().split(/\s+/).map(clean).filter(Boolean);
  if (target.length === 0) return -1;
  let seen = 0;
  for (let i = 0; i <= NORM.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) {
      if (NORM[i + j] !== target[j]) {
        ok = false;
        break;
      }
    }
    if (ok) {
      if (seen === occurrence) return i;
      seen++;
      i += target.length - 1;
    }
  }
  return -1;
};

/**
 * Find the start time (seconds) of a phrase from the narration script.
 * Throws during development if the phrase is not in the aligned transcript.
 */
export const at = (phrase: string, occurrence = 0): number => {
  const idx = findPhrase(phrase, occurrence);
  if (idx >= 0) return WORDS[idx].start;
  const target = phrase.trim().split(/\s+/).map(clean).filter(Boolean);
  // Fallback: first word match, so a single mistyped word does not kill the preview.
  for (let i = 0; i < NORM.length; i++) {
    if (NORM[i] === target[0]) {
      console.warn(`Phrase not found exactly: "${phrase}" — using first word at ${WORDS[i].start}`);
      return WORDS[i].start;
    }
  }
  console.warn(`Phrase not found: "${phrase}" — using 0`);
  return 0;
};

/** Return the exact aligned words for a script phrase, with their real timings. */
export const wordsOf = (phrase: string, occurrence = 0): ScriptWord[] => {
  const idx = findPhrase(phrase, occurrence);
  if (idx < 0) {
    console.warn(`Words not found: "${phrase}"`);
    return [];
  }
  const target = phrase.trim().split(/\s+/).filter(Boolean);
  return WORDS.slice(idx, idx + target.length);
};

export const endOf = (phrase: string, occurrence = 0): number => {
  const t = at(phrase, occurrence);
  // find the word whose start is t and take its end
  const w = WORDS.find((x) => Math.abs(x.start - t) < 0.001);
  return w ? w.end : t;
};

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
