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
  SketchPolygon,
  SketchRect,
  clamp01,
} from "../components/Sketch";
import {Building, Cross, Gauge, GPU, ModelStack, PCTower, Panel, StickFigure} from "../components/Objects";
import {SceneProps} from "./types";

const useBeats = (t0: number) => (phrase: string, occ = 0) => Math.max(0, at(phrase, occ) - t0);
const dimAt = (t: number, at: number, dim = 0.45) => (t < at ? 1 : dim);

const Fan: React.FC<{cx: number; cy: number; r: number; start: number; dir?: number}> = ({
  cx,
  cy,
  r,
  start,
  dir = 1,
}) => {
  const frame = useCurrentFrame();
  const angle = (frame * 0.45 * dir) % 360;
  const blades = Array.from({length: 7}).map((_, i) => {
    const a = (i / 7) * Math.PI * 2;
    const d = `M ${cx + Math.cos(a) * r * 0.27} ${cy + Math.sin(a) * r * 0.27} ` +
      `Q ${cx + Math.cos(a + 0.5) * r * 0.62} ${cy + Math.sin(a + 0.5) * r * 0.62} ` +
      `${cx + Math.cos(a + 0.32) * r * 0.86} ${cy + Math.sin(a + 0.32) * r * 0.86}`;
    return (
      <SketchPath
        key={i}
        d={d}
        stroke={C.soft}
        strokeWidth={3}
        seed={260 + i}
      />
    );
  });
  return (
    <g>
      <SketchCircle x={cx} y={cy} d={r * 2} start={start} dur={0.35} stroke={C.cyan} strokeWidth={3.2} seed={250 + cx} />
      <SketchCircle x={cx} y={cy} d={r * 1.62} start={start + 0.15} dur={0.3} stroke={C.cyan} strokeWidth={2.2} seed={251 + cx} opacity={0.35} />
      <g transform={`rotate(${angle} ${cx} ${cy})`}>{blades}</g>
      <SketchCircle x={cx} y={cy} d={r * 0.42} start={start + 0.2} dur={0.25} stroke={C.cyan} fill={C.well} strokeWidth={2.5} seed={270 + cx} />
    </g>
  );
};

const Monolith: React.FC<{start?: number}> = ({start = 0.15}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const p = clamp01((t - start) / 0.55);
  return (
    <g opacity={p} transform={`translate(0 ${(1 - p) * 26})`}>
      {/* side and top planes */}
      <SketchPolygon
        points={[
          [790, 330],
          [824, 304],
          [824, 774],
          [790, 800],
        ]}
        start={start + 0.1}
        dur={0.5}
        stroke={C.purple}
        fill={C.well}
        strokeWidth={3.4}
        seed={310}
      />
      <SketchPolygon
        points={[
          [440, 330],
          [790, 330],
          [824, 304],
          [474, 304],
        ]}
        start={start + 0.16}
        dur={0.5}
        stroke={C.purple}
        fill={C.line}
        strokeWidth={3.4}
        seed={311}
      />
      {/* front plane */}
      <SketchRect x={440} y={330} w={350} h={470} start={start + 0.22} dur={0.55} stroke={C.purple} fill={C.panel} radius={2} strokeWidth={3.4} seed={312} />
      {/* faint layer rules behind the parameter field */}
      {[430, 530, 630, 730].map((y, i) => (
        <SketchLine key={y} x1={455} y1={y} x2={775} y2={y} start={start + 0.4 + i * 0.05} dur={0.35} stroke={C.purple} strokeWidth={3} seed={315 + i} opacity={0.14} />
      ))}
      {/* parameter field: 108 marks, one illuminated row */}
      {Array.from({ length: 108 }).map((_, i) => {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const bright = row === 7;
        return (
          <SketchCircle
            key={i}
            x={462 + col * 36}
            y={360 + row * 36}
            d={bright ? 9 : 7}
            start={start + 0.18 + row * 0.018 + col * 0.004}
            dur={0.14}
            stroke={bright ? C.fg : C.purple}
            fill={bright ? C.fg : C.purple}
            strokeWidth={1.6}
            seed={350 + i}
            opacity={bright ? 0.72 + 0.22 * Math.sin(t * 3) : 0.42}
          />
        );
      })}
      {/* top edge highlight */}
      <SketchLine x1={452} y1={331} x2={778} y2={331} start={start + 0.55} dur={0.4} stroke={C.fg} strokeWidth={3} seed={341} opacity={0.28} />
    </g>
  );
};

export const S01_Rule: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const modelAt = Math.max(0, B("big model"));
  const gpuAt = Math.max(modelAt + 0.4, B("big GPU"));
  const slide = 1 - Math.pow(1 - clamp01((t - modelAt) / 0.85), 3);
  const dx = 390 * slide;
  const dy = 195 * slide + (1 - slide) * Math.sin(t * 1.15) * 5;
  const gpuScale = 1 + 0.05 * (1 - slide);
  const led = 0.45 + 0.35 * Math.sin(t * 4.2);
  const dimAt = modelAt + 0.8;

  return (
    <>
      {/* GPU starts alone, dead center, then makes room for the model */}
      <g transform={`translate(${dx} ${dy}) translate(960 540) scale(${gpuScale}) translate(-960 -540)`}>
        {Array.from({length: 12}).map((_, i) => (
          <SketchLine
            key={i}
            x1={730 + i * 40}
            y1={423}
            x2={730 + i * 40}
            y2={445}
            start={0.5 + i * 0.015}
            dur={0.2}
            stroke={C.soft}
            strokeWidth={3}
            seed={420 + i}
          />
        ))}
        <SketchRect x={700} y={445} w={520} h={190} start={0.35} dur={0.55} stroke={C.cyan} fill={C.panel} radius={16} strokeWidth={4} seed={440} />
        <SketchLine x1={714} y1={465} x2={714} y2={615} start={0.6} dur={0.3} stroke={C.soft} strokeWidth={3} seed={441} />
        <Fan cx={815} cy={540} r={54} start={0.7} />
        <Fan cx={955} cy={540} r={54} start={0.8} dir={-1} />
        <Fan cx={1095} cy={540} r={54} start={0.9} />
        <SketchRect x={1108} y={400} w={74} h={24} start={0.9} dur={0.3} stroke={C.yellow} fill={C.well} radius={3} strokeWidth={2.5} seed={442} />
        {Array.from({length: 6}).map((_, i) => (
          <SketchRect key={i} x={1118 + (i % 3) * 20} y={406 + Math.floor(i / 3) * 8} w={10} h={5} start={1.0 + i * 0.03} dur={0.15} stroke={C.yellow} fill={C.yellow} radius={1} strokeWidth={1.5} seed={443 + i} />
        ))}
        {Array.from({length: 24}).map((_, i) => (
          <SketchRect key={i} x={730 + i * 17} y={635} w={8} h={16} start={0.8 + i * 0.015} dur={0.15} stroke={C.yellow} fill={C.yellow} radius={1} strokeWidth={1.5} seed={450 + i} opacity={0.55} />
        ))}
        <SketchCircle x={1188} y={597} d={12} start={1.1} dur={0.2} stroke={C.green} fill={C.green} strokeWidth={2} seed={475} opacity={led} />
      </g>

      {/* the model arrives on "big model" */}
      <Monolith start={modelAt} />
      <g opacity={clamp01((t - dimAt) / 0.5)}>
        <SketchLine x1={430} y1={850} x2={790} y2={850} start={dimAt} dur={0.45} stroke={C.soft} strokeWidth={3} seed={410} />
        <SketchLine x1={430} y1={838} x2={430} y2={862} start={dimAt + 0.12} dur={0.2} stroke={C.soft} strokeWidth={3} seed={411} />
        <SketchLine x1={790} y1={838} x2={790} y2={862} start={dimAt + 0.16} dur={0.2} stroke={C.soft} strokeWidth={3} seed={412} />
        <Label text="125B" x={610} y={900} size={56} color={C.purple} start={dimAt + 0.25} />
      </g>

      {/* whole-phrase labels, no word-by-word typography */}
      <Label text="big model" x={610} y={225} size={88} color={C.fg} weight={700} start={modelAt} dur={0.3} />
      <SketchLine x1={445} y1={282} x2={775} y2={282} start={modelAt + 0.5} dur={0.5} stroke={C.purple} strokeWidth={4} seed={480} />
      <Label text="big GPU" x={1330} y={545} size={88} color={C.fg} weight={700} start={gpuAt} dur={0.3} />
      <SketchLine x1={1150} y1={600} x2={1510} y2={600} start={gpuAt + 0.5} dur={0.5} stroke={C.cyan} strokeWidth={4} seed={481} />

      {/* the rule, drawn as ink */}
      <SketchLine x1={900} y1={690} x2={1020} y2={690} start={gpuAt + 0.3} dur={0.35} stroke={C.soft} strokeWidth={9} seed={482} />
      <SketchLine x1={900} y1={726} x2={1020} y2={726} start={gpuAt + 0.4} dur={0.35} stroke={C.soft} strokeWidth={9} seed={483} />
    </>
  );
};

export const S02_Tiers: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const p7 = B("seven-billion-parameter");
  const p14 = B("Fourteen billion");
  const p70 = B("Seventy billion");
  const p100 = B("over a hundred billion");
  return (
    <>
      <Groundline y={800} from={180} to={1740} start={0.05} />
      {/* 7B */}
      <g opacity={t > p14 + 1 ? 0.7 : 1}>
        <SketchRect x={250} y={690} w={100} h={100} start={p7} dur={0.45} stroke={C.green} fill={C.panel} radius={6} seed={311} strokeWidth={4} />
        <Label text="7B" x={300} y={645} size={TYPE.key} color={C.green} start={p7 + 0.15} />
        <Label text="easy" x={300} y={845} size={TYPE.small} color={C.green} start={p7 + 0.4} />
        <StickFigure x={380} y={800} scale={0.55} start={p7 + 0.5} color={C.soft} />
      </g>
      {/* 14B */}
      <g opacity={t > p70 + 1 ? 0.7 : 1}>
        <SketchRect x={650} y={645} w={140} h={145} start={p14} dur={0.45} stroke={C.yellow} fill={C.panel} radius={6} seed={312} strokeWidth={4} />
        <Label text="14B" x={720} y={595} size={TYPE.key} color={C.yellow} start={p14 + 0.15} />
        <Label text="check specs" x={720} y={845} size={TYPE.small} color={C.yellow} start={p14 + 0.4} />
      </g>
      {/* 70B */}
      <g opacity={t > p100 + 1 ? 0.7 : 1}>
        <SketchRect x={1080} y={560} w={190} h={230} start={p70} dur={0.45} stroke={C.orange} fill={C.panel} radius={6} seed={313} strokeWidth={4} />
        <Label text="70B" x={1175} y={505} size={TYPE.key} color={C.orange} start={p70 + 0.15} />
        <Label text="real money" x={1175} y={845} size={TYPE.small} color={C.orange} start={p70 + 0.4} />
        <Label text="$$$" x={1175} y={675} size={64} color={C.orange} start={p70 + 0.55} />
      </g>
      {/* 100B+ */}
      <g>
        <Building x={1410} y={470} w={300} h={320} start={p100} rows={4} cols={4} color={C.red} fill={C.panel} seed={314} />
        <Label text="100B+" x={1560} y={420} size={TYPE.key} color={C.red} start={p100 + 0.2} />
        <Label text="data center" x={1560} y={845} size={TYPE.small} color={C.red} start={p100 + 0.45} />
      </g>

    </>
  );
};

export const S03_Reddit: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const post = B("people on Reddit");
  const speeds = B("posting their speeds");
  const higher = B("way higher");
  const gaugeValue = Math.min(1, Math.max(0.08, (t - higher) / 2.2));
  return (
    <>
      <Panel x={360} y={230} w={720} h={560} start={post} fill={C.panel} stroke={C.line} seed={321} />
      <SketchCircle x={450} y={325} d={58} start={post + 0.2} dur={0.35} stroke={C.soft} fill={C.well} seed={322} strokeWidth={2.5} />
      <StickFigure x={450} y={380} scale={0.48} start={post + 0.3} color={C.soft} />
      <Label text="Reddit" x={510} y={315} size={TYPE.small} color={C.cyan} align="left" start={post + 0.3} />
      <Label text="a new speed post" x={510} y={365} size={TYPE.micro} color={C.soft} align="left" start={post + 0.5} />
      <SketchLine x1={420} y1={420} x2={1020} y2={420} start={post + 0.45} dur={0.5} stroke={C.line} strokeWidth={2.5} seed={323} />
      <Label text={["125B", "on a gaming PC"]} x={720} y={520} size={74} color={C.fg} start={post + 0.6} lineHeight={1.05} />
      <Label text="wait, what?" x={720} y={660} size={TYPE.small} color={C.soft} start={speeds} />
      <Arrow x1={1060} y1={600} x2={1180} y2={600} start={higher} stroke={C.soft} seed={324} />
      <Gauge x={1370} y={560} r={130} value={gaugeValue} start={higher} color={C.green} label={`${Math.round(gaugeValue * 160)} t/s`} sublabel="reported" />
      <Label text="way higher" x={1370} y={315} size={TYPE.key} color={C.green} start={higher} />
      <Label text="than expected" x={1370} y={375} size={TYPE.small} color={C.soft} start={higher + 0.3} />
    </>
  );
};

export const S04_125OnPC: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const p125 = B("A hundred and twenty-five billion parameter model, running");
  const pc = B("regular gaming PC");
  const chat = B("fast enough");
  return (
    <>
      <Groundline y={900} from={220} to={1700} start={0.05} />
      <PCTower x={720} y={500} w={240} h={400} start={pc} label="gaming PC" />
      <ModelStack x={430} y={560} w={220} h={220} layers={4} start={p125} label="125B" labelSize={58} color={C.purple} />
      <Arrow x1={670} y1={650} x2={710} y2={650} start={p125 + 0.5} stroke={C.purple} seed={331} />
      {/* chat bubble */}
      <SketchRect x={1120} y={520} w={420} h={190} start={chat} dur={0.45} stroke={C.green} fill={C.panel} radius={28} seed={332} strokeWidth={4} />
      <SketchPath d="M 1180 710 L 1160 760 L 1240 710" start={chat + 0.2} dur={0.3} stroke={C.green} strokeWidth={4} seed={333} />
      {[0, 1, 2].map((i) => (
        <SketchCircle key={i} x={1210 + i * 55} y={610 + (i % 2 === 0 ? 0 : 4)} d={18} start={chat + 0.45 + i * 0.22} dur={0.2} stroke={C.green} fill={C.green} seed={334 + i} strokeWidth={2} />
      ))}
      <Label text="actually chat" x={1330} y={790} size={TYPE.small} color={C.green} start={chat + 0.7} />
      <Label text="hello" x={1230} y={470} size={TYPE.micro} color={C.soft} start={chat + 0.55} />
    </>
  );
};

export const S05_Reports: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const p1 = B("One person with two");
  const p2 = B("Someone with an R-T-X forty-eighty");
  const p3 = B("A forty-ninety owner");
  const row = (y: number, gpu: string, speed: string, p: number, next: number, seed: number) => (
    <g opacity={t < next ? 1 : 0.65}>
      <Panel x={480} y={y} w={960} h={150} start={p} fill={C.panel} stroke={t < next ? C.green : C.line} seed={seed} />
      <Label text={gpu} x={560} y={y + 75} size={44} color={C.fg} align="left" start={p + 0.1} />
      <Label text={speed} x={1260} y={y + 75} size={64} color={C.green} align="right" start={p + 0.3} />
      <Label text="t/s" x={1350} y={y + 78} size={36} color={C.soft} align="left" start={p + 0.4} />
    </g>
  );
  return (
    <>
      {row(250, "2× RTX 3090", "100+", p1, p2, 341)}
      {row(470, "RTX 4080 Super", "40–60", p2, p3, 342)}
      {row(690, "RTX 4090", "140+", p3, Infinity, 343)}
      <Label text="different cards, same story" x={960} y={930} size={TYPE.small} color={C.soft} start={p3 + 1.6} />
    </>
  );
};

export const S06_WhatChanged: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const pRam = B("GPUs didn’t get any extra memory");
  const pSoft = B("software just got much smarter");
  return (
    <>
      <GPU x={340} y={520} w={360} h={150} start={pRam} color={C.cyan} />
      <Label text="same VRAM" x={520} y={730} size={TYPE.key} color={C.cyan} start={pRam + 0.2} />
      <Label text="12 GB" x={520} y={800} size={TYPE.body} color={C.soft} start={pRam + 0.4} />
      <Cross x={645} y={505} size={44} start={pRam + 0.7} />
      <Label text="no extra memory" x={520} y={875} size={TYPE.micro} color={C.red} start={pRam + 0.8} />
      <Arrow x1={800} y1={620} x2={1040} y2={620} start={pSoft} stroke={C.soft} seed={351} />
      {/* smarter software: gear-ish */}
      <g transform="translate(1250 430)">
        <SketchCircle x={160} y={160} d={190} start={pSoft} dur={0.45} stroke={C.green} strokeWidth={5} seed={352} />
        {Array.from({length: 10}).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <SketchLine
              key={i}
              x1={160 + Math.cos(a) * 98}
              y1={160 + Math.sin(a) * 98}
              x2={160 + Math.cos(a) * 124}
              y2={160 + Math.sin(a) * 124}
              start={pSoft + 0.3 + i * 0.03}
              dur={0.2}
              stroke={C.green}
              strokeWidth={7}
              seed={353 + i}
            />
          );
        })}
        <SketchCircle x={160} y={160} d={58} start={pSoft + 0.5} dur={0.3} stroke={C.green} strokeWidth={4} seed={364} />
        <SketchPath d="M 120 160 Q 145 130 160 160 T 200 160" start={pSoft + 0.7} dur={0.4} stroke={C.fg} strokeWidth={4} seed={365} />
      </g>
      <Label text="smarter software" x={1410} y={810} size={TYPE.key} color={C.green} start={pSoft + 0.3} />
    </>
  );
};
