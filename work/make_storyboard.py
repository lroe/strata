import json, re

WORDS = json.load(open("/home/jeevankumar/Videos/strata/src/data/words.json"))["words"]
DURATION = 709.48
TOTAL = DURATION + 2.8

NUM = {"zero":0,"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,
       "nine":9,"ten":10,"eleven":11,"twelve":12,"thirteen":13,"fourteen":14,"fifteen":15,
       "sixteen":16,"seventeen":17,"eighteen":18,"nineteen":19,"twenty":20,"thirty":30,
       "forty":40,"fifty":50,"sixty":60,"seventy":70,"eighty":80,"ninety":90,
       "hundred":100,"thousand":1000,"million":1000000}

def clean(s):
    s = s.lower().replace("’", "'")
    parts = re.findall(r"[a-z0-9]+", s)
    return "".join(str(NUM[p]) if p in NUM else p for p in parts)

N = [clean(w["text"]) for w in WORDS]

def at(phrase, occ=0):
    t = [clean(x) for x in phrase.split()]
    seen = 0
    for i in range(len(N) - len(t) + 1):
        if N[i:i+len(t)] == t:
            if seen == occ:
                return WORDS[i]["start"]
            seen += 1
    raise ValueError("not found: " + phrase)

src = open("/home/jeevankumar/Videos/strata/src/scenes/index.tsx").read()
pat = re.compile(r'\{id: "(S\d+)", title: "([^"]+)", start: (.*?), Component:')
scenes = []
for m in pat.finditer(src):
    sid, title, start_expr = m.groups()
    m2 = re.match(r's\("([^"]+)"(?:, ([\d.]+))?\)', start_expr)
    if m2:
        phrase, off = m2.group(1), float(m2.group(2) or 0.2)
        start = max(0.0, at(phrase) - off)
    else:
        start = float(start_expr)
    scenes.append({"id": sid, "title": title, "start": start})

for i, s in enumerate(scenes):
    s["end"] = scenes[i+1]["start"] if i+1 < len(scenes) else TOTAL

def narration_for(a, b):
    out = []
    for w in WORDS:
        if a - 0.01 <= w["start"] < b - 0.01:
            out.append(w["text"])
            if len(out) >= 7 and re.search(r"[.!?]$", w["text"]):
                break
            if len(out) >= 22:
                break
    text = " ".join(out)
    text = re.sub(r"\s+([,.!?;:])", r"\1", text)
    return text.strip()

def fmt(t):
    return f"{int(t//60):02d}:{t%60:04.1f}"

visual = {
"S01": "The detailed three-fan GPU starts alone, centered in frame, with slowly spinning curved blades and a pulsing LED. On 'big model' it glides right and down while a 3D 125B parameter monolith draws in on the left; whole-phrase labels big model / big GPU and a 125B dimension complete the hand-drawn equation.",
"S02": "Four size tiers along a groundline: 7B block, 14B block, 70B block, and a 100B+ data-center building. Each tier lands on its narrated noun; earlier tiers dim but stay readable.",
"S03": "A Reddit speed post card with a 125B / gaming PC claim; the speed gauge on the right rises to 144 t/s. No reported/expected labels.",
"S04": "A gaming PC tower with a 125B model stack feeding into it and a chat bubble that types three dots. The point: this model is actually chat-capable.",
"S05": "Three stacked benchmark cards: 2x RTX 3090 100+, RTX 4080 Super 40-60, RTX 4090 140+. Each card lands on its owner's line; earlier cards dim.",
"S06": "A GPU with a red X over 'same VRAM' on the left; an arrow to a bright software gear on the right. No extra memory, smarter software.",
"S07": "Strata wordmark with a layered-strata logo, then an arrow down to a red question mark: the problem comes first.",
"S08": "A panel of parameter numbers fills in, labelled parameters and 125,000,000,000. A small GPU appears with 'fast access'.",
"S09": "A GPU cutaway with a small VRAM chip labelled 12/16/24 GB, while a much larger 125B block with a 'shrunk' outline still overflows. Red 'no' on the chip.",
"S10": "Small VRAM card on the left, six tall system-RAM sticks on the right, a clock/snail cue for slower, and 64 GB+ in green.",
"S11": "A large 125B outline containing a smaller VRAM box; a red X crosses the VRAM box and 'doesn't fit' lands below. Three compromise chips follow: slower, worse quality, give up.",
"S12": "GPU and RAM panels side by side; model chunks sit in both, with an arrow moving some pieces to RAM. 'not all at once' closes the beat.",
"S13": "Prompt -> engine -> answer flow. The engine contains a small model stack, with running the model / not training / open source labels; llama.cpp and vLLM badges appear at the end.",
"S14": "Two panels: general tools with many model squares (llama.cpp, vLLM) versus Strata with one Qwen 3.8 Flash Next card. Many models / one model.",
"S15": "Equation: 12 GB VRAM + 64 GB system RAM -> tens of tokens/sec, with 'on a 125B model' below.",
"S16": "The sentence 'local AI runs here' is split into token boxes, then a model speed bar (50 t/s) and a human reading bar (5-6 t/s) compare.",
"S17": "Three numbered cards stack upward, each with a different minimal icon (experts, cache swap, shrink). No names, so the later chapters can introduce them.",
"S18": "A large model box fills with 24 expert dots; a MoE stamp lands inside the lower corner. 'many small experts inside' anchors the metaphor.",
"S19": "A token dot feeds a dense 8x5 parameter grid; every dot lights up and the caption ALL 125B lands.",
"S20": "Token -> router -> expert grid. Three expert dots turn green and three curved lines connect them to the router; the rest dim.",
"S21": "A 125B horizontal block with a 6B green slice at the left; labels 6B, 119B idle, 125B total.",
"S22": "A company building with a 125,000-employee dot grid beside a meeting-room card needing 6,000. A bracket between them labels the gap.",
"S23": "(Merged into S22.)",
"S24": "A building cutaway: meeting room (VRAM, small/fast) inside the larger building (system RAM, much bigger, a walk away).",
"S25": "Meeting room full of hot experts, outside area full of waiting experts, router at the bottom. A yellow expert travels from the outside into the room on 'goes and gets them'.",
"S26": "Fast box with six bright experts and big/slow box with many dim experts; an arrow moves a hot expert into the fast box. 'keep hot things close' + expert caching caption.",
"S27": "RTX 4090 card above a 24,576-expert bar: 12,000 green in VRAM, 12,576 in RAM; 140+ t/s lands large below.",
"S28": "GPU box holding three model layers, four more layers waiting outside, one arrow fetching a layer. 'only what we need now'.",
"S29": "Sparse model box with three of fifteen experts lit, arrows placing pieces into GPU and RAM bins, plus a 'built for one model' tag.",
"S30": "A bell with ring marks, a subscribe button, then an arrow back to Strata. A short aside, not a full chapter.",
"S31": "A large 125B model stack compresses through an arrow into a much smaller green box labelled quantization.",
"S32": "The number 0.7341 in a card, with 16 bit cells below; four cells light green and 'fewer bits' / 'less memory' land.",
"S33": "A hand-drawn landscape photo compresses into a smaller JPEG frame. 'mostly fine', then a red glitch block on 'push too far'.",
"S34": "Four quantization cards - Q2, IQ2_XS, IQ3_XXS, IQ3_S - with approx bit badges and small size bars. The left side is labelled smaller+faster and a little dumber; the right side is a little smarter.",
"S35": "A horizontal trade-off slider from smaller/faster to smarter. The marker slides to the sweet spot; a green band marks 'still smart enough'.",
"S36": "A large RTX 5070 card with 12 GB VRAM and 64 GB system RAM tags below.",
"S37": "Four horizontal bars for short-chat speeds: 93, 79, 62, 53 t/s. Bars land on each quantization name; 'fewer bits -> faster' closes.",
"S38": "A long prompt document flows into a GPU with a read arrow; 2,170 tokens/sec lands large, with 'before writing' below.",
"S39": "A speed gauge surrounded by five dependency knobs (GPU, RAM+CPU, quantization, context, task), then best case / not a promise.",
"S40": "RTX 5080 and RTX 4060 Ti linked together; three bars show 143 coding, 102 prose, 28 with the 5080 alone. 'experiments, not benchmarks'.",
"S41": "A context window frame fills with a chat card, a document card, and a codebase card, each landing on its noun.",
"S42": "A model writes into a growing notes panel; lines accumulate and a red KV-cache memory bar grows with context.",
"S43": "A 0-128K ruler with a green 128K marker; a bracket shows 46-74 t/s at the long end.",
"S44": "The same ruler extends: solid tested 128K, dashed experimental 384K and 512K, labelled tested / experimental.",
"S45": "A community machine: RTX 4090 D 48 GB, RTX 5070 Ti 16 GB, and 128 GB RAM around a huge approx 256K context label.",
"S46": "A local browser window at 127.0.0.1:8080 with a minimal Strata chat; OpenAI API tag, then Anthropic API tag.",
"S47": "A central local-server box at 127.0.0.1:8080 with four tools pointing in: coding agent, chat app, Python, RAG. A crossed-out cloud sits above; prompts stay home.",
"S48": "A minimum-setup checklist: Windows/Linux, RTX 20-50, 12 GB VRAM, 64 GB RAM, 80 GB free disk. Each row checks on its narration.",
"S49": "A start-here.bat window with three numbered choices: model, quantization, context length; a low RAM mode tag appears below.",
"S50": "A full VRAM GPU and system RAM with a red arrow; three option chips appear: more quantization, more offload, second GPU. Strata picks the split.",
"S51": "A crossed-out laptop with one model tag; a RAM -> PCIe -> SSD -> GPU chain lights up one box at a time. 'all of it shapes the experience'.",
"S52": "One user with a fast gauge on the left, 1000 users waiting in a queue on the right, a vs between them. vLLM / many users and llama.cpp / many models badges.",
"S53": "A gaming PC and a 125B model block with a check between them, bracketed as the sweet spot.",
"S54": "A broken VRAM-limit gate on the left; on the right the GPU becomes a workspace with model chunks and RAM shelves holding the rest.",
"S55": "A PC tower with 24 GB VRAM, 128 GB RAM, fast SSD badges; a crossed-out cloud and the label private AI machine (was: gaming rig).",
"S56": "The same PC with no cloud, a coding agent, and your documents cards connected to it; 'nothing leaves the machine'.",
"S57": "First a desktop PC with a 125B model and dozens of tokens/sec; then how much VRAM? is crossed out; finally the memory boxes GPU/RAM/SSD and the thesis use all the memory.",
}

ontext = {
"S01": "big model · big GPU · 125B",
"S02": "7B · 14B · 70B · 100B+",
"S03": "Reddit · 125B on a gaming PC · 144 t/s",
"S04": "125B · gaming PC · actually chat",
"S05": "2x RTX 3090 100+ · RTX 4080 Super 40-60 · RTX 4090 140+",
"S06": "same VRAM 12 GB · smarter software",
"S07": "Strata · the problem",
"S08": "parameters · 125,000,000,000 · fast access",
"S09": "VRAM 12/16/24 GB · fast · small · still bigger",
"S10": "VRAM 12-24 GB · system RAM 64 GB+ · slower",
"S11": "125B · VRAM 12-24 GB · doesn't fit · slower · worse quality · give up",
"S12": "GPU · RAM · not all at once",
"S13": "prompt · engine · answer · running the model · not training · open source",
"S14": "general tools · many models · Strata · Qwen 3.8 Flash Next · one model",
"S15": "12 GB VRAM · 64 GB system RAM · tens of tokens/sec · on a 125B model",
"S16": "roughly 3/4 of a word · tokens/sec = writing speed · 50 t/s · 5-6 t/s",
"S17": "1 · 2 · 3 (icons only)",
"S18": "the model · MoE · many small experts inside",
"S19": "token · ALL 125B",
"S20": "token · router · experts · only a few experts",
"S21": "6B · 119B idle · 125B total · active per token",
"S22": "125,000 on payroll · one task · 6,000 needed · not all in the room · the gap",
"S23": "-",
"S24": "meeting room · VRAM · small/fast · the building · system RAM · a walk away",
"S25": "VRAM · hot experts · elsewhere · router · fetch",
"S26": "fast · big & slow · what we use most · keep hot things close · expert caching",
"S27": "RTX 4090 · 12,000 in VRAM · 12,576 in RAM · 24,576 experts total · 140+ t/s",
"S28": "GPU · only what we need now",
"S29": "the model · a small slice wakes · GPU · RAM · already sparse · built for one model",
"S30": "subscribe · back to Strata",
"S31": "125B · a lot of data · quantization",
"S32": "0.7341 · 16 bits · fewer bits · less precision · much less memory",
"S33": "original · JPEG · mostly fine · push too far",
"S34": "Q2 · IQ2_XS · IQ3_XXS · IQ3_S · approx 2/2/3/3 bits · smaller + faster · a little dumber (left) · a little smarter (right)",
"S35": "smaller/faster · smarter · the sweet spot · still smart enough · not one setting",
"S36": "RTX 5070 · 12 GB VRAM · 64 GB system RAM",
"S37": "Q2 93 · IQ2_XS 79 · IQ3_XXS 62 · IQ3_S 53 t/s · fewer bits -> faster",
"S38": "prompt · read · 2,170 tokens/sec · before writing",
"S39": "GPU · RAM + CPU · quantization · context · task · best case · not a promise",
"S40": "RTX 5080 · RTX 4060 Ti · coding 143 · prose 102 · 5080 alone 28 · experiments, not benchmarks",
"S41": "context window · chat · document · codebase · kept in mind at once",
"S42": "model · notes · KV cache · grows with context",
"S43": "128K context · 46-74 t/s · still usable",
"S44": "tested 128K · experimental 384K · 512K",
"S45": "RTX 4090 D 48 GB · RTX 5070 Ti 16 GB · 128 GB RAM · approx 256K context",
"S46": "browser · 127.0.0.1:8080 · OpenAI API · Anthropic API · local web interface",
"S47": "127.0.0.1:8080 · coding agent · chat app · Python · RAG · no cloud · prompts stay home",
"S48": "Windows 10/11 · Linux · NVIDIA RTX 20-50 · 12 GB VRAM minimum · 64 GB RAM baseline · 80 GB free disk",
"S49": "start-here.bat · 1 model · 2 quantization · 3 context length · low RAM mode",
"S50": "VRAM full · more quantization · more offload · second GPU · Strata picks the split",
"S51": "not any laptop · one model · RAM · PCIe · SSD · GPU · all of it shapes the experience",
"S52": "one user · fast · 1000 users · waiting · vLLM many users · llama.cpp many models",
"S53": "powerful gaming PC · a huge model · the sweet spot",
"S54": "VRAM limit · GPU workspace · RAM the rest",
"S55": "24 GB VRAM · 128 GB RAM · fast SSD · gaming rig · private AI machine",
"S56": "no cloud · coding agent · your documents · nothing leaves the machine",
"S57": "125B · dozens of tokens/sec · how much VRAM? · use all the memory · GPU/RAM/SSD · the next question",
}

lines = []
lines.append("# Strata — Storyboard & Timing Sheet")
lines.append("")
lines.append("**Format:** 1920x1080, 30 fps, 11:49.5 narration + 2.8 s final hold")
lines.append("**Style:** Dracula dark (`#282A36`), hand-drawn 3-4 px ink, Caveat lettering, no scene titles. Visuals and narration carry the story.")
lines.append("**Sync:** every reveal is keyed to Whisper word timestamps (see `src/data/words.json`). No summary lands before it is spoken.")
lines.append("**Transitions:** 4-6 frame fade through the Dracula background. Every diagram holds 2+ seconds after its final reveal.")
lines.append("")
lines.append("| # | Time | Scene | Narration (opening) | Visual | Key on-screen text |")
lines.append("|---|---|---|---|---|---|")

for s in scenes:
    if s["id"] == "S23":
        continue
    n = narration_for(s["start"], s["end"])
    n = n.replace("|", "/")
    v = visual.get(s["id"], "").replace("|", "/")
    o = ontext.get(s["id"], "").replace("|", "/")
    lines.append(f"| {s['id']} | {fmt(s['start'])}-{fmt(s['end'])} | {s['title']} | {n} | {v} | {o} |")

open("/home/jeevankumar/Videos/strata/storyboard.md", "w").write("\n".join(lines) + "\n")
print("wrote storyboard.md with", len(scenes), "scenes")
for s in scenes[:5] + scenes[-3:]:
    print(s["id"], fmt(s["start"]), fmt(s["end"]), s["title"])
