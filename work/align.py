import json, re, difflib

SCRIPT = "/home/jeevankumar/Videos/strata/script.txt"
WHISPER = "/home/jeevankumar/Videos/strata/work/whisper_words.json"
OUT = "/home/jeevankumar/Videos/strata/src/data/words.json"

NUM = {
    "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
    "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
    "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
    "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40,
    "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80,
    "ninety": 90, "hundred": 100, "thousand": 1000, "million": 1000000,
}

def norm(s):
    s = s.lower().replace("’", "'")
    parts = re.findall(r"[a-z0-9]+", s)
    out = []
    for p in parts:
        if p in NUM:
            out.append(str(NUM[p]))
        else:
            out.append(p)
    return "".join(out)

script_tokens = open(SCRIPT).read().split()
wh = json.load(open(WHISPER))
ww = wh["words"]
whisper_tokens = [w["word"] for w in ww]
sn = [norm(t) for t in script_tokens]
wn = [norm(t) for t in whisper_tokens]

print("script", len(sn), "whisper", len(wn))
sm = difflib.SequenceMatcher(None, sn, wn, autojunk=False)
blocks = sm.get_matching_blocks()
print("matching blocks", len(blocks), "matched words", sum(b.size for b in blocks))

# Map script word -> (start,end) for matched anchors.
times = [None] * len(sn)
for b in blocks:
    for k in range(b.size):
        times[b.a + k] = (ww[b.b + k]["start"], ww[b.b + k]["end"])

# Fill gaps by interpolating between nearest anchors.
def fill_gap(i0, i1, prev_end, next_start):
    # i0..i1 exclusive script indices
    n = i1 - i0
    if n <= 0:
        return
    span = max(0.001, next_start - prev_end)
    weights = [max(2.0, len(re.sub(r"[^A-Za-z0-9]", "", script_tokens[i]))) for i in range(i0, i1)]
    total = sum(weights)
    t = prev_end
    for i, w in zip(range(i0, i1), weights):
        d = span * w / total
        times[i] = (t, t + d)
        t += d

# leading gap
first_anchor = next((i for i, t in enumerate(times) if t is not None), len(times))
if first_anchor > 0:
    next_start = times[first_anchor][0]
    fill_gap(0, first_anchor, 0.0, next_start)

# inner gaps
i = 0
while i < len(times):
    if times[i] is None:
        j = i
        while j < len(times) and times[j] is None:
            j += 1
        prev_end = times[i - 1][1] if i > 0 else 0.0
        next_start = times[j][0] if j < len(times) else ww[-1]["end"]
        fill_gap(i, j, prev_end, next_start)
        i = j
    else:
        i += 1

# trailing
if times[-1] is None:
    times[-1] = (ww[-1]["end"], ww[-1]["end"] + 0.2)

# Enforce monotonicity and sensible durations.
fixed = []
prev_end = 0.0
for i, (s, e) in enumerate(times):
    s = max(s, prev_end)
    e = max(e, s + 0.06)
    fixed.append((s, e))
    prev_end = e

words = [{"text": t, "start": round(s, 3), "end": round(e, 3)} for t, (s, e) in zip(script_tokens, fixed)]
json.dump({"duration": wh["duration"], "words": words}, open(OUT, "w"), indent=1)
print("wrote", OUT, "last", words[-1])

# sanity checks
for phrase in [
    "The project is called Strata",
    "A model is basically",
    "So what changed",
    "The first idea comes from the model",
    "This is called expert caching",
    "Even with caching",
    "So how fast is it",
    "What’s it like to use",
    "Now for the limits",
    "For a long time, the first question",
]:
    target = [norm(x) for x in phrase.split()]
    for i in range(len(sn) - len(target) + 1):
        if sn[i:i + len(target)] == target:
            print(f"{words[i]['start']:7.2f}  {phrase}")
            break
    else:
        print("NOT FOUND:", phrase)
