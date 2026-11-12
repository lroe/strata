import json, subprocess, sys, time
import numpy as np
from faster_whisper import WhisperModel

WAV = "/home/jeevankumar/Videos/strata/audio.wav"
OUT = "/home/jeevankumar/Videos/strata/work/whisper_words.json"
SR = 16000

print("decoding audio...", flush=True)
raw = subprocess.run(["ffmpeg","-v","error","-i",WAV,"-f","f32le","-ac","1","-ar",str(SR),"-"], capture_output=True, check=True).stdout
audio = np.frombuffer(raw, dtype=np.float32)
print("samples", len(audio), "duration", len(audio)/SR, flush=True)

print("loading model...", flush=True)
model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4)
print("transcribing...", flush=True)
t0 = time.time()
segments, info = model.transcribe(audio, beam_size=1, word_timestamps=True, vad_filter=True,
                                  condition_on_previous_text=False, language="en")
words = []
segments_out = []
for si, seg in enumerate(segments):
    segments_out.append({"id": seg.id, "start": seg.start, "end": seg.end, "text": seg.text})
    for w in seg.words:
        words.append({"word": w.word, "start": w.start, "end": w.end, "prob": w.probability})
    if si % 10 == 0:
        print(f"seg {si} t={seg.end:.1f}s elapsed={time.time()-t0:.1f}s", flush=True)

data = {"duration": len(audio)/SR, "language": info.language,
        "language_probability": info.language_probability,
        "segments": segments_out, "words": words}
with open(OUT, "w") as f:
    json.dump(data, f, indent=1)
print("DONE", len(words), "words", time.time()-t0, "s", flush=True)
