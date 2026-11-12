# Strata — minimalist explainer

Local-first Remotion project for the Strata script (`script.txt`).

## Preview (no render)

```bash
npm install
npm run studio
```

Open **http://localhost:4321**.

The composition is `StrataExplainer` (1920x1080, 30 fps, 11:52.3).

## Timing

- Narration: `audio.wav` (11:49.5)
- Word timestamps: `src/data/words.json`, generated with local faster-whisper and aligned to `script.txt`
- Storyboard / timing sheet: `storyboard.md`
- Rebuild timings: `work/transcribe.py`, then `work/align.py`, then `work/make_storyboard.py` with the local venv

## Structure

- `src/scenes/` — one file per chapter, scenes are word-locked to `src/timing.ts`
- `src/components/Sketch.tsx` — Rough.js hand-drawn primitives and SVG text
- `src/components/Objects.tsx` — GPUs, PCs, RAM, buildings, stick figures
- `src/Video.tsx` — scene timeline and 3-frame fade-through-background transitions
