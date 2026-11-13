import React from "react";
import {useCurrentFrame, useVideoConfig} from "remotion";
import {C, TYPE} from "../theme";
import {at} from "../timing";
import {
  Arrow,
  Groundline,
  Label,
  SketchCircle,
  SketchLine,
  SketchPath,
  SketchRect,
} from "../components/Sketch";
import {Cloud, Gauge, GPU, LayersMotif, ModelStack, Panel, RAMSticks} from "../components/Objects";
import {SceneProps} from "./types";

const useBeats = (t0: number) => (phrase: string, occ = 0) => Math.max(0, at(phrase, occ) - t0);

export const S07_Strata: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const problem = B("starting with the problem");
  return (
    <>
      <LayersMotif x={720} y={210} start={0.25} />
      <Label text="Strata" x={960} y={520} size={TYPE.huge} color={C.fg} start={0.45} weight={700} />
      <Arrow x1={960} y1={620} x2={960} y2={730} start={problem} stroke={C.soft} seed={402} />
      <SketchCircle x={960} y={810} d={100} start={problem + 0.3} dur={0.4} stroke={C.red} fill={C.panel} strokeWidth={4} seed={403} />
      <Label text="?" x={960} y={810} size={TYPE.big} color={C.red} start={problem + 0.5} />
      <Label text="the problem" x={960} y={900} size={TYPE.small} color={C.soft} start={problem + 0.6} />
    </>
  );
};

export const S08_Parameters: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const list = B("giant list of numbers");
  const params = B("We call them parameters");
  const size = B("hundred and twenty-five billion of them");
  const access = B("GPU needs fast access");
  const grid = Array.from({length: 72}).map((_, i) => {
    const v = ((i * 37) % 17) / 10 - 0.8;
    return v.toFixed(2);
  });
  return (
    <>
      <SketchRect x={510} y={250} w={900} h={420} start={list + 0.1} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={411} strokeWidth={3} />
      {grid.map((v, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        return (
          <Label
            key={i}
            text={v}
            x={560 + col * 73}
            y={310 + row * 53}
            size={36}
            color={i % 9 === 0 ? C.purple : C.soft}
            start={list + 0.3 + i * 0.008}
            dur={0.2}
            weight={500}
          />
        );
      })}
      <Label text="parameters" x={960} y={720} size={TYPE.key} color={C.purple} start={params} />
      <g opacity={t > size ? 1 : 0}>
        <SketchRect x={620} y={775} w={680} h={90} start={size} dur={0.4} stroke={C.purple} fill={C.panel} radius={12} seed={412} />
        <Label text="125,000,000,000" x={960} y={820} size={56} color={C.fg} start={size + 0.2} />
      </g>
      <g opacity={t > access ? 1 : 0}>
        <GPU x={1330} y={250} w={230} h={92} start={access} color={C.cyan} fans={1} />
        <Arrow x1={1290} y1={300} x2={1200} y2={330} start={access + 0.2} stroke={C.cyan} seed={413} />
        <Label text="fast access" x={1490} y={370} size={TYPE.micro} color={C.cyan} start={access + 0.3} />
      </g>
    </>
  );
};

export const S09_VRAM: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const gpu = B("The GPU keeps them");
  const fast = B("VRAM is very fast");
  const small = B("but it’s small");
  const sizes = B("twelve, sixteen");
  const model = B("Even after we shrink");
  const bigger = B("still bigger than that");
  return (
    <>
      <SketchRect x={380} y={350} w={580} h={310} start={gpu + 0.1} dur={0.55} stroke={C.cyan} fill={C.panel} radius={18} seed={421} strokeWidth={4} />
      <SketchRect x={470} y={430} w={280} h={150} start={gpu + 0.35} dur={0.4} stroke={C.line} fill={C.well} radius={8} seed={422} />
      <Label text="VRAM" x={610} y={475} size={TYPE.body} color={C.cyan} start={gpu + 0.5} />
      <Label text="12 / 16 / 24 GB" x={610} y={535} size={TYPE.micro} color={C.fg} start={sizes} />
      <SketchPath d="M 800 400 L 830 440 L 805 440 L 835 485" start={fast} dur={0.3} stroke={C.green} strokeWidth={5} seed={423} />
      <Label text="fast" x={870} y={440} size={TYPE.small} color={C.green} start={fast + 0.2} />
      <Label text="small" x={610} y={640} size={TYPE.body} color={C.red} start={small} />
      <SketchRect x={1090} y={300} w={340} h={320} start={model} dur={0.5} stroke={C.purple} fill={C.panel} radius={6} seed={424} strokeWidth={4} />
      <Label text="125B" x={1260} y={460} size={TYPE.big} color={C.purple} start={model + 0.3} />
      <SketchRect x={1130} y={370} w={260} h={220} start={bigger} dur={0.5} stroke={C.yellow} fill="none" radius={4} seed={425} strokeWidth={3} />
      <Label text="shrunk" x={1260} y={345} size={TYPE.micro} color={C.yellow} start={bigger + 0.2} />
      <Arrow x1={1080} y1={470} x2={770} y2={500} start={bigger + 0.4} stroke={C.red} seed={426} />
      <Label text="still bigger" x={960} y={780} size={TYPE.key} color={C.red} start={bigger + 0.1} />
      <Label text="than 24 GB" x={960} y={845} size={TYPE.small} color={C.soft} start={bigger + 0.25} />
      <g opacity={t > model ? 1 : 0}>
        <SketchCircle x={750} y={470} d={72} start={model + 0.2} dur={0.3} stroke={C.red} strokeWidth={4} seed={427} />
        <Label text="no" x={750} y={470} size={TYPE.body} color={C.red} start={model + 0.45} />
      </g>
    </>
  );
};

export const S10_RAM: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const second = B("a gaming PC has a second kind");
  const ram = B("regular system RAM");
  const slower = B("It’s slower than");
  const more = B("a lot more of it");
  const sixty = B("sixty-four gigabytes");
  return (
    <>
      <GPU x={340} y={430} w={300} h={120} start={second} color={C.cyan} fans={1} />
      <Label text="VRAM" x={490} y={620} size={TYPE.body} color={C.cyan} start={second + 0.2} />
      <Label text="12–24 GB" x={490} y={680} size={TYPE.micro} color={C.soft} start={second + 0.35} />
      <RAMSticks x={980} y={410} count={6} height={330} start={ram} color={C.green} />
      <Label text="system RAM" x={1140} y={330} size={TYPE.key} color={C.green} start={ram + 0.2} />
      <Label text="64 GB+" x={1140} y={790} size={TYPE.big} color={C.green} start={sixty} />
      <Label text="slower" x={780} y={560} size={TYPE.body} color={C.orange} start={slower} />
      <Arrow x1={860} y1={560} x2={950} y2={560} start={slower + 0.2} stroke={C.orange} seed={431} />
      <g opacity={0.9}>
        <SketchCircle x={1420} y={620} d={90} start={more} dur={0.4} stroke={C.soft} strokeWidth={3} seed={432} />
        <SketchLine x1={1420} y1={620} x2={1420} y2={585} start={more + 0.3} stroke={C.soft} strokeWidth={3} seed={433} />
        <SketchLine x1={1420} y1={620} x2={1447} y2={638} start={more + 0.35} stroke={C.soft} strokeWidth={3} seed={434} />
        <Label text="more room" x={1420} y={690} size={TYPE.micro} color={C.soft} start={more + 0.4} />
      </g>
    </>
  );
};

export const S11_Fit: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const question = B("the old question");
  const fit = B("Does the model fit");
  const no = B("If it doesn’t");
  const slower = B("Slower speeds");
  const worse = B("worse quality");
  const give = B("or giving up");
  return (
    <>
      <SketchRect x={590} y={280} w={740} h={480} start={0.1} dur={0.5} stroke={C.purple} fill={C.panel} radius={8} seed={441} strokeWidth={4} />
      <Label text="125B" x={690} y={350} size={TYPE.big} color={C.purple} start={fit + 0.2} />
      <SketchRect x={750} y={390} w={420} h={280} start={fit + 0.35} dur={0.5} stroke={C.cyan} fill={C.well} radius={6} seed={442} strokeWidth={4} />
      <Label text="VRAM" x={855} y={470} size={TYPE.body} color={C.cyan} start={fit + 0.5} />
      <Label text="12–24 GB" x={855} y={540} size={TYPE.micro} color={C.soft} start={fit + 0.7} />
      <g opacity={no > 0 ? 1 : 0}>
        <SketchLine x1={980} y1={410} x2={1150} y2={650} start={no} dur={0.35} stroke={C.red} strokeWidth={8} seed={444} />
        <SketchLine x1={1150} y1={410} x2={980} y2={650} start={no + 0.08} dur={0.35} stroke={C.red} strokeWidth={8} seed={445} />
        <Label text="doesn’t fit" x={960} y={805} size={TYPE.key} color={C.red} start={no + 0.3} />
      </g>
      <Panel x={420} y={900} w={330} h={110} start={slower} fill={C.panel} stroke={C.orange} seed={446} />
      <Arrow x1={500} y1={935} x2={500} y2={985} start={slower + 0.15} stroke={C.orange} strokeWidth={4} seed={447} />
      <Label text="slower" x={620} y={955} size={TYPE.small} color={C.orange} start={slower + 0.25} />
      <Panel x={800} y={900} w={330} h={110} start={worse} fill={C.panel} stroke={C.yellow} seed={448} />
      <SketchRect x={840} y={935} w={40} h={40} start={worse + 0.2} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={449} />
      <SketchRect x={890} y={935} w={40} h={40} start={worse + 0.25} dur={0.2} stroke={C.yellow} fill={C.panel} seed={450} />
      <Label text="worse" x={1020} y={955} size={TYPE.small} color={C.yellow} start={worse + 0.3} />
      <Panel x={1180} y={900} w={330} h={110} start={give} fill={C.panel} stroke={C.red} seed={451} />
      <SketchLine x1={1235} y1={935} x2={1235} y2={985} start={give + 0.2} stroke={C.red} strokeWidth={4} seed={452} />
      <SketchPath d="M 1235 935 L 1285 950 L 1235 965 Z" start={give + 0.3} dur={0.25} stroke={C.red} strokeWidth={3} seed={453} />
      <Label text="give up" x={1380} y={955} size={TYPE.small} color={C.red} start={give + 0.35} />
    </>
  );
};

export const S12_WhatIf: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const diff = B("Strata tries something different");
  const whatIf = B("What if the GPU");
  const whole = B("hold the whole model");
  const once = B("at once");
  return (
    <>
      <SketchRect x={420} y={280} w={540} h={560} start={0.2} dur={0.5} stroke={C.cyan} fill={C.panel} radius={18} seed={461} strokeWidth={4} />
      <Label text="GPU" x={690} y={245} size={TYPE.body} color={C.cyan} start={0.5} />
      <SketchRect x={1060} y={280} w={540} h={560} start={0.35} dur={0.5} stroke={C.green} fill={C.panel} radius={18} seed={462} strokeWidth={4} />
      <Label text="RAM" x={1330} y={245} size={TYPE.body} color={C.green} start={0.65} />
      {/* model chunks */}
      {[0, 1].map((i) => (
        <SketchRect key={i} x={490 + i * 220} y={400 + i * 150} w={190} h={130} start={whatIf + 0.3 + i * 0.15} dur={0.35} stroke={C.purple} fill={C.well} radius={5} seed={463 + i} strokeWidth={3} />
      ))}
      {[0, 1].map((i) => (
        <SketchRect key={`r${i}`} x={1130 + i * 220} y={400 + i * 150} w={190} h={130} start={whole + 0.3 + i * 0.15} dur={0.35} stroke={C.purple} fill={C.well} radius={5} seed={466 + i} strokeWidth={3} />
      ))}
      <Arrow x1={990} y1={530} x2={1035} y2={530} start={whole + 0.6} stroke={C.green} seed={468} />
      <Label text="some pieces wait in RAM" x={1330} y={760} size={TYPE.micro} color={C.soft} start={whole + 0.8} />
      <Label text="not all at once" x={960} y={920} size={TYPE.key} color={C.green} start={once} />
    </>
  );
};

export const S13_Inference: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const engine = B("open-source inference engine");
  const inference = B("Inference just means");
  const loads = B("loads the model");
  return (
    <>
      <Panel x={260} y={390} w={300} h={220} start={inference} fill={C.panel} stroke={C.soft} seed={471} />
      <Label text="prompt" x={410} y={500} size={TYPE.body} color={C.fg} start={inference + 0.2} />
      <Panel x={780} y={330} w={360} h={340} start={engine} fill={C.panel} stroke={C.cyan} seed={472} />
      <Label text="engine" x={960} y={420} size={TYPE.key} color={C.cyan} start={engine + 0.2} />
      <ModelStack x={870} y={465} w={180} h={150} layers={3} start={loads} label="" color={C.purple} />
      <Panel x={1360} y={390} w={300} h={220} start={inference} fill={C.panel} stroke={C.green} seed={473} />
      <Label text="answer" x={1510} y={500} size={TYPE.body} color={C.green} start={inference + 0.2} />
      <Arrow x1={570} y1={500} x2={770} y2={500} start={inference + 0.3} stroke={C.soft} seed={474} />
      <Arrow x1={1150} y1={500} x2={1350} y2={500} start={inference + 0.45} stroke={C.soft} seed={475} />
      <Label text="running the model" x={960} y={790} size={TYPE.body} color={C.fg} start={inference + 0.3} />
      <Label text="not training" x={960} y={860} size={TYPE.small} color={C.red} start={B("as opposed to training")} />
      <Label text="llama.cpp" x={760} y={940} size={TYPE.micro} color={C.soft} start={B("llama C-P-P")} />
      <Label text="vLLM" x={1160} y={940} size={TYPE.micro} color={C.soft} start={B("V-L-L-M")} />
      <Label text="open source" x={960} y={1010} size={TYPE.micro} color={C.green} start={B("open-source")} />
    </>
  );
};

export const S14_OneModel: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const general = B("Those two are general-purpose");
  const models = B("lots of different models");
  const strata = B("Strata goes the other way");
  const one = B("built for ONE model");
  const name = B("Qwen three point eight Flash Next");
  const bets = B("make bets that a general tool");
  return (
    <>
      <Panel x={240} y={250} w={560} h={620} start={general} fill={C.panel} stroke={C.soft} seed={481} />
      <Label text="general tools" x={520} y={300} size={TYPE.body} color={C.fg} start={general + 0.2} />
      {Array.from({length: 6}).map((_, i) => (
        <SketchRect
          key={i}
          x={300 + (i % 3) * 150}
          y={390 + Math.floor(i / 3) * 180}
          w={120}
          h={130}
          start={models + 0.1 + i * 0.08}
          dur={0.3}
          stroke={C.soft}
          fill={C.well}
          radius={4}
          seed={482 + i}
          strokeWidth={2.5}
        />
      ))}
      <Label text="llama.cpp" x={370} y={790} size={TYPE.micro} color={C.soft} start={models + 0.7} />
      <Label text="vLLM" x={650} y={790} size={TYPE.micro} color={C.soft} start={models + 0.8} />
      <Label text="many models" x={520} y={850} size={TYPE.small} color={C.cyan} start={models + 0.4} />
      <Panel x={1120} y={250} w={560} h={620} start={strata} fill={C.panel} stroke={C.green} seed={483} />
      <Label text="Strata" x={1400} y={300} size={TYPE.body} color={C.green} start={strata + 0.2} />
      <SketchRect x={1240} y={370} w={320} h={260} start={one} dur={0.45} stroke={C.purple} fill={C.well} radius={6} seed={484} strokeWidth={4} />
      <Label text={["Qwen 3.8", "Flash Next"]} x={1400} y={465} size={42} color={C.fg} start={name} lineHeight={1.1} />
      <Label text="125B" x={1400} y={570} size={TYPE.big} color={C.purple} start={name + 0.4} />
      <Label text="one model" x={1400} y={850} size={TYPE.small} color={C.green} start={one} />
      <Label text="it can specialize" x={960} y={930} size={TYPE.small} color={C.soft} start={bets} />
    </>
  );
};

export const S15_Claim: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const vram = B("twelve gigabytes of V-RAM");
  const ram = B("sixty-four gigabytes of system RAM");
  const tens = B("tens of tokens per second");
  return (
    <>
      <Panel x={210} y={360} w={360} h={230} start={vram} fill={C.panel} stroke={C.cyan} seed={491} />
      <Label text="12 GB" x={390} y={440} size={TYPE.number} color={C.cyan} start={vram + 0.2} />
      <Label text="VRAM" x={390} y={525} size={TYPE.body} color={C.soft} start={vram + 0.35} />
      <Label text="+" x={630} y={475} size={TYPE.big} color={C.fg} start={ram} />
      <Panel x={720} y={360} w={360} h={230} start={ram} fill={C.panel} stroke={C.green} seed={492} />
      <Label text="64 GB" x={900} y={440} size={TYPE.number} color={C.green} start={ram + 0.2} />
      <Label text="system RAM" x={900} y={525} size={TYPE.body} color={C.soft} start={ram + 0.35} />
      <Arrow x1={1120} y1={475} x2={1260} y2={475} start={tens} stroke={C.soft} seed={493} />
      <Label text="tens of" x={1450} y={420} size={TYPE.big} color={C.yellow} start={tens + 0.2} />
      <Label text="tokens/sec" x={1450} y={500} size={TYPE.key} color={C.yellow} start={tens + 0.35} />
      <Label text="on a 125B model" x={960} y={760} size={TYPE.small} color={C.soft} start={tens + 0.7} />
      <Label text="that’s the promise" x={960} y={930} size={TYPE.small} color={C.soft} start={tens + 1.3} />
    </>
  );
};

export const S16_Token: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const token = B("A token is a small chunk");
  const word = B("three-quarters of a word");
  const speed = B("Tokens per second");
  const read = B("read at roughly five or six");
  const fifty = B("so at fifty");
  return (
    <>
      <Label text="roughly ¾ of a word" x={960} y={250} size={TYPE.body} color={C.soft} start={word} />
      {/* word chunks */}
      <SketchRect x={540} y={330} w={200} h={100} start={token + 0.2} dur={0.35} stroke={C.cyan} fill={C.panel} radius={8} seed={501} />
      <SketchRect x={755} y={330} w={110} h={100} start={token + 0.3} dur={0.35} stroke={C.cyan} fill={C.panel} radius={8} seed={502} />
      <SketchRect x={880} y={330} w={150} h={100} start={token + 0.4} dur={0.35} stroke={C.cyan} fill={C.panel} radius={8} seed={503} />
      <SketchRect x={1045} y={330} w={80} h={100} start={token + 0.5} dur={0.35} stroke={C.soft} fill={C.panel} radius={8} seed={504} />
      <SketchRect x={1140} y={330} w={200} h={100} start={token + 0.6} dur={0.35} stroke={C.soft} fill={C.panel} radius={8} seed={509} />
      <Label text="local" x={640} y={380} size={TYPE.body} color={C.fg} start={token + 0.35} />
      <Label text="AI" x={810} y={380} size={TYPE.body} color={C.fg} start={token + 0.45} />
      <Label text="run" x={955} y={380} size={TYPE.body} color={C.fg} start={token + 0.55} />
      <Label text="s" x={1085} y={380} size={TYPE.body} color={C.soft} start={token + 0.65} />
      <Label text="here" x={1240} y={380} size={TYPE.body} color={C.soft} start={token + 0.75} />
      <SketchLine x1={540} y1={470} x2={1340} y2={470} start={word + 0.3} dur={0.5} stroke={C.line} strokeWidth={3} seed={505} />
      <Label text="tokens/sec = writing speed" x={960} y={535} size={TYPE.small} color={C.soft} start={speed} />
      {/* bars */}
      <Label text="the model" x={700} y={630} size={TYPE.small} color={C.green} start={fifty} align="right" />
      <SketchRect x={720} y={605} w={50} h={50} start={fifty} dur={0.3} stroke={C.green} fill={C.green} radius={4} seed={506} />
      <Label text="50 t/s" x={800} y={630} size={TYPE.body} color={C.green} align="left" start={fifty + 0.2} />
      <Label text="you" x={700} y={750} size={TYPE.small} color={C.orange} start={read} align="right" />
      <SketchRect x={650} y={725} w={50} h={50} start={read} dur={0.3} stroke={C.orange} fill={C.orange} radius={4} seed={507} />
      <Label text="5–6 t/s" x={730} y={750} size={TYPE.body} color={C.orange} align="left" start={read + 0.2} />
      <Arrow x1={1010} y1={680} x2={1290} y2={680} start={fifty + 0.5} stroke={C.green} seed={508} />
      <Label text="far faster than we read" x={1150} y={720} size={TYPE.small} color={C.fg} start={fifty + 0.7} />
      <Label text="at 50 tokens/sec" x={960} y={900} size={TYPE.key} color={C.yellow} start={fifty + 0.4} />
    </>
  );
};

export const S17_ThreeIdeas: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const three = B("three ideas");
  const stack = B("stack on top");
  const cards = [
    {y: 620, n: "1", icon: "dots"},
    {y: 470, n: "2", icon: "swap"},
    {y: 320, n: "3", icon: "shrink"},
  ];
  return (
    <>
      {cards.map((c, i) => (
        <g key={c.n}>
          <SketchRect x={660} y={c.y} w={600} h={130} start={0.05 + i * 0.18} dur={0.4} stroke={i === 0 ? C.purple : i === 1 ? C.cyan : C.green} fill={C.panel} radius={10} seed={511 + i} strokeWidth={3.5} />
          <Label text={c.n} x={715} y={c.y + 65} size={TYPE.big} color={C.soft} start={0.12 + i * 0.18} />
          {c.icon === "dots" ? (
            <g>
              {Array.from({length: 7}).map((_, k) => (
                <SketchCircle key={k} x={800 + k * 34} y={c.y + 65} d={18} start={0.18 + i * 0.18 + k * 0.02} dur={0.2} stroke={C.purple} fill={k % 3 === 0 ? C.purple : "none"} seed={520 + k} strokeWidth={2} />
              ))}
            </g>
          ) : c.icon === "swap" ? (
            <g>
              <SketchRect x={790} y={c.y + 35} w={60} h={60} start={0.18 + i * 0.18} dur={0.25} stroke={C.cyan} fill={C.well} seed={530} />
              <Arrow x1={860} y1={c.y + 65} x2={950} y2={c.y + 65} start={0.28 + i * 0.18} stroke={C.cyan} seed={531} />
              <SketchRect x={965} y={c.y + 35} w={60} h={60} start={0.38 + i * 0.18} dur={0.25} stroke={C.cyan} fill={C.well} seed={532} />
            </g>
          ) : (
            <g>
              <SketchRect x={790} y={c.y + 25} w={80} h={80} start={0.18 + i * 0.18} dur={0.25} stroke={C.green} fill={C.well} seed={533} />
              <Arrow x1={880} y1={c.y + 65} x2={940} y2={c.y + 65} start={0.28 + i * 0.18} stroke={C.green} seed={534} />
              <SketchRect x={955} y={c.y + 40} w={50} h={50} start={0.38 + i * 0.18} dur={0.25} stroke={C.green} fill={C.well} seed={535} />
            </g>
          )}
        </g>
      ))}
    </>
  );
};
