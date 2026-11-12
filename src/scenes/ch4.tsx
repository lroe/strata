import React from "react";
import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {C, TYPE} from "../theme";
import {at} from "../timing";
import {
  Arrow,
  Label,
  SketchCircle,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
} from "../components/Sketch";
import {Gauge, GPU, ModelStack, Panel, RAMSticks} from "../components/Objects";
import {SceneProps} from "./types";

const useBeats = (t0: number) => (phrase: string, occ = 0) => Math.max(0, at(phrase, occ) - t0);

const SpeedBar: React.FC<{
  x: number;
  y: number;
  name: string;
  value: number;
  max?: number;
  color: string;
  start: number;
  width?: number;
}> = ({x, y, name, value, max = 100, color, start, width = 820}) => {
  const w = (value / max) * width;
  return (
    <g>
      <Label text={name} x={x - 30} y={y} size={42} color={C.fg} align="right" start={start} />
      <SketchRect x={x} y={y - 24} w={width} h={48} start={start + 0.1} dur={0.4} stroke={C.line} fill={C.panel} radius={24} seed={1101 + value} strokeWidth={2.5} />
      <SketchRect x={x + 3} y={y - 21} w={Math.max(10, w - 6)} h={42} start={start + 0.25} dur={0.7} stroke={C.line} fill={color} radius={21} seed={1140 + value} strokeWidth={1.5} />
      <Label text={`${value}`} x={x + Math.max(w, 30) + 26} y={y} size={56} color={color} align="left" start={start + 0.6} />
    </g>
  );
};

export const S31_QuantIntro: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const caching = B("Even with caching");
  const lot = B("a lot of data");
  const quant = B("also uses quantization");
  return (
    <>
      <ModelStack x={480} y={350} w={300} h={320} layers={6} start={caching} label="125B" labelSize={64} color={C.purple} />
      <Label text="a lot of data" x={630} y={755} size={TYPE.body} color={C.soft} start={lot} />
      <Arrow x1={840} y1={500} x2={1080} y2={500} start={quant} dur={0.5} stroke={C.yellow} strokeWidth={4} seed={1151} />
      <SketchRect x={1130} y={420} w={220} h={180} start={quant + 0.2} dur={0.5} stroke={C.green} fill={C.panel} radius={8} seed={1152} strokeWidth={4} />
      <Label text="quantization" x={1240} y={690} size={TYPE.key} color={C.green} start={quant + 0.5} />
      <Label text="smaller" x={1240} y={750} size={TYPE.small} color={C.soft} start={quant + 0.8} />
      <SketchPath d="M 900 610 L 1000 610 L 980 590 M 1000 610 L 980 630" start={quant + 0.4} dur={0.4} stroke={C.soft} strokeWidth={3} seed={1153} />
    </>
  );
};

export const S32_Bits: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const number = B("Each parameter");
  const fewer = B("fewer bits");
  const less = B("much less memory");
  return (
    <>
      <Panel x={610} y={300} w={700} h={190} start={number} fill={C.panel} stroke={C.soft} seed={1161} />
      <Label text="0.7341" x={960} y={395} size={TYPE.number} color={C.fg} start={number + 0.2} />
      {Array.from({length: 16}).map((_, i) => {
        const lit = i < 4;
        return (
          <g key={i}>
            <SketchRect x={560 + i * 52} y={590} w={42} h={42} start={number + 0.3 + i * 0.02} dur={0.2} stroke={lit ? C.green : C.soft} fill={lit ? C.green : C.well} radius={3} seed={1170 + i} strokeWidth={lit ? 3 : 2} />
          </g>
        );
      })}
      <Label text="16 bits" x={960} y={550} size={TYPE.small} color={C.soft} start={number + 0.6} />
      <Arrow x1={960} y1={690} x2={960} y2={750} start={fewer} stroke={C.green} seed={1190} />
      <Label text="fewer bits" x={960} y={795} size={TYPE.key} color={C.green} start={fewer} />
      <Label text="less precision" x={760} y={900} size={TYPE.small} color={C.yellow} start={less} />
      <Label text="much less memory" x={1160} y={900} size={TYPE.small} color={C.green} start={less + 0.25} />
    </>
  );
};

export const S33_JPEG: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const photo = B("saving a photo");
  const shrink = B("The file shrinks");
  const fine = B("still looks mostly fine");
  const damage = B("see the damage");
  return (
    <>
      <SketchRect x={360} y={330} w={620} h={380} start={photo} dur={0.55} stroke={C.soft} fill={C.panel} radius={8} seed={1201} strokeWidth={4} />
      <SketchCircle x={500} y={430} d={90} start={photo + 0.2} dur={0.35} stroke={C.yellow} fill={C.yellow} seed={1202} strokeWidth={2} />
      <SketchPolygon points={[[390, 670], [560, 470], [720, 670]]} start={photo + 0.3} dur={0.5} stroke={C.purple} fill={C.well} seed={1203} strokeWidth={3} />
      <SketchPolygon points={[[600, 670], [760, 520], [940, 670]]} start={photo + 0.45} dur={0.5} stroke={C.cyan} fill={C.well} seed={1204} strokeWidth={3} />
      <Label text="original" x={670} y={745} size={TYPE.micro} color={C.soft} start={photo + 0.6} />
      <Arrow x1={1000} y1={520} x2={1120} y2={520} start={shrink} stroke={C.yellow} seed={1205} />
      <SketchRect x={1140} y={420} w={330} h={200} start={shrink} dur={0.5} stroke={C.green} fill={C.panel} radius={6} seed={1206} strokeWidth={4} />
      <SketchCircle x={1215} y={475} d={44} start={shrink + 0.2} dur={0.3} stroke={C.yellow} fill={C.yellow} seed={1207} strokeWidth={1.6} />
      <SketchPolygon points={[[1155, 600], [1235, 500], [1305, 600]]} start={shrink + 0.3} dur={0.4} stroke={C.purple} fill={C.well} seed={1208} strokeWidth={2.5} />
      <SketchPolygon points={[[1270, 600], [1345, 520], [1435, 600]]} start={shrink + 0.4} dur={0.4} stroke={C.cyan} fill={C.well} seed={1209} strokeWidth={2.5} />
      <Label text="JPEG" x={1305} y={655} size={TYPE.micro} color={C.green} start={shrink + 0.5} />
      <Label text="mostly fine" x={1305} y={735} size={TYPE.small} color={C.green} start={fine} />
      <g opacity={damage > 0 ? 1 : 0}>
        <SketchRect x={1380} y={555} w={55} h={55} start={damage} dur={0.3} stroke={C.red} fill={C.red} seed={1210} strokeWidth={2} />
        <Label text="push too far" x={960} y={830} size={TYPE.body} color={C.red} start={damage + 0.2} />
      </g>
      <Label text="the file shrinks" x={520} y={830} size={TYPE.small} color={C.soft} start={shrink + 0.2} />
    </>
  );
};

export const S34_Levels: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const names = B("with names like");
  const bits = B("two and the three");
  const fewer = B("Fewer bits means smaller");
  const dumber = B("a little dumber");
  const cards = [
    {name: "Q2", bits: "2", w: 90, color: C.green},
    {name: "IQ2_XS", bits: "2", w: 110, color: C.cyan},
    {name: "IQ3_XXS", bits: "3", w: 130, color: C.purple},
    {name: "IQ3_S", bits: "3", w: 150, color: C.orange},
  ];
  return (
    <>
      {cards.map((c, i) => {
        const x = 220 + i * 380;
        const start = names + 0.2 + i * 0.35;
        return (
          <g key={c.name}>
            <Panel x={x} y={350} w={340} h={280} start={0.2 + i * 0.1} fill={C.panel} stroke={c.color} seed={1220 + i} />
            <Label text={c.name} x={x + 170} y={430} size={52} color={C.fg} start={start + 0.15} />
            <SketchRect x={x + 70} y={480} w={200} h={90} start={start + 0.25} dur={0.35} stroke={c.color} fill={C.well} radius={8} seed={1230 + i} strokeWidth={2.5} />
            <Label text={`≈${c.bits} bits`} x={x + 170} y={525} size={TYPE.micro} color={c.color} start={bits + 0.1 + i * 0.15} />
            <SketchRect x={x + 170 - c.w / 2} y={690} w={c.w} h={30} start={fewer + 0.1 + i * 0.15} dur={0.35} stroke={c.color} fill={c.color} radius={15} seed={1240 + i} strokeWidth={2} />
          </g>
        );
      })}
      <Label text="smaller + faster" x={560} y={790} size={TYPE.small} color={C.green} start={B("smaller and faster")} />
      <Label text="a little dumber" x={1290} y={790} size={TYPE.small} color={C.red} start={dumber} />
      <Arrow x1={760} y1={850} x2={1130} y2={850} start={fewer + 0.7} stroke={C.soft} seed={1250} />
    </>
  );
};

export const S35_Tradeoff: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const menu = B("gives us a menu");
  const point = B("find the point");
  const without = B("without losing too much");
  const move = interpolate(t, [point, point + 1.6], [0.2, 0.62], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const mx = 380 + move * 1160;
  return (
    <>
      <Label text="smaller / faster" x={380} y={420} size={TYPE.body} color={C.green} align="left" start={0.2} />
      <Label text="smarter" x={1540} y={420} size={TYPE.body} color={C.purple} align="right" start={0.35} />
      <SketchLine x1={380} y1={560} x2={1540} y2={560} start={0.3} dur={0.7} stroke={C.soft} strokeWidth={5} seed={1261} />
      {Array.from({length: 21}).map((_, i) => (
        <SketchLine key={i} x1={380 + i * 58} y1={540} x2={380 + i * 58} y2={580} start={0.4 + i * 0.01} dur={0.2} stroke={C.line} strokeWidth={2.5} seed={1262 + i} />
      ))}
      <g opacity={point > 0 ? 1 : 0}>
        <SketchCircle x={mx} y={560} d={54} start={point} dur={0.3} stroke={C.yellow} fill={C.yellow} seed={1283} strokeWidth={3} />
        <SketchLine x1={mx} y1={610} x2={mx} y2={670} start={point + 0.15} dur={0.25} stroke={C.yellow} strokeWidth={3} seed={1284} />
        <Label text="the sweet spot" x={mx} y={720} size={TYPE.key} color={C.yellow} start={point + 0.3} />
      </g>
      <SketchRect x={690} y={665} w={360} h={54} start={without} dur={0.4} stroke={C.green} fill={C.green} radius={27} seed={1285} strokeWidth={2} opacity={0.18} />
      <Label text="still smart enough" x={960} y={830} size={TYPE.small} color={C.green} start={without + 0.2} />
      <Label text="not one setting" x={960} y={920} size={TYPE.micro} color={C.soft} start={menu + 0.8} />
    </>
  );
};

export const S36_TestMachine: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const machine = B("its own test machine");
  const vram = B("with twelve gigabytes of V-RAM");
  const ram = B("sixty-four gigabytes of RAM");
  return (
    <>
      <GPU x={480} y={300} w={960} h={280} start={0.2} color={C.cyan} fans={3} label="" />
      <Label text="RTX 5070" x={960} y={230} size={TYPE.hero} color={C.fg} start={machine + 0.3} />
      <Panel x={560} y={700} w={360} h={150} start={vram} fill={C.panel} stroke={C.cyan} seed={1291} />
      <Label text="12 GB" x={740} y={760} size={TYPE.big} color={C.cyan} start={vram + 0.2} />
      <Label text="VRAM" x={740} y={815} size={TYPE.micro} color={C.soft} start={vram + 0.35} />
      <Panel x={1000} y={700} w={360} h={150} start={ram} fill={C.panel} stroke={C.green} seed={1292} />
      <Label text="64 GB" x={1180} y={760} size={TYPE.big} color={C.green} start={ram + 0.2} />
      <Label text="system RAM" x={1180} y={815} size={TYPE.micro} color={C.soft} start={ram + 0.35} />
      <Label text="the project’s test machine" x={960} y={940} size={TYPE.micro} color={C.soft} start={machine + 0.6} />
    </>
  );
};

export const S37_Speeds: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const q2 = B("ninety-three");
  const iq2 = B("Seventy-nine");
  const iq3 = B("Sixty-two");
  const iq3s = B("fifty-three");
  const fewer = B("fewer the bits");
  return (
    <>
      <Label text="tokens per second" x={960} y={195} size={TYPE.body} color={C.soft} start={0.2} />
      <SpeedBar x={560} y={330} name="Q2" value={93} color={C.green} start={q2} />
      <SpeedBar x={560} y={480} name="IQ2_XS" value={79} color={C.cyan} start={iq2} />
      <SpeedBar x={560} y={630} name="IQ3_XXS" value={62} color={C.purple} start={iq3} />
      <SpeedBar x={560} y={780} name="IQ3_S" value={53} color={C.orange} start={iq3s} />
      <Label text="fewer bits → faster" x={960} y={920} size={TYPE.key} color={C.yellow} start={fewer + 0.3} />
    </>
  );
};

export const S38_Prompt: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const reports = B("prompt processing");
  const reads = B("reads what we send");
  const upTo = B("up to two thousand");
  const number = B("one hundred and seventy");
  return (
    <>
      <Panel x={250} y={360} w={520} h={380} start={reports} fill={C.panel} stroke={C.soft} seed={1301} />
      <Label text="prompt" x={510} y={410} size={TYPE.body} color={C.soft} start={reports + 0.2} />
      {Array.from({length: 6}).map((_, i) => (
        <SketchLine key={i} x1={330} y1={480 + i * 40} x2={690 - (i % 3) * 80} y2={480 + i * 40} start={reports + 0.3 + i * 0.1} dur={0.3} stroke={C.line} strokeWidth={6} seed={1302 + i} />
      ))}
      <Arrow x1={790} y1={550} x2={1040} y2={550} start={reads} stroke={C.cyan} strokeWidth={4} seed={1310} />
      <GPU x={1070} y={450} w={400} h={200} start={reads + 0.2} color={C.cyan} label="" />
      <Label text="read" x={915} y={500} size={TYPE.small} color={C.cyan} start={reads + 0.3} />
      <Label text="2,170" x={1270} y={760} size={TYPE.huge} color={C.green} start={upTo + 0.2} />
      <Label text="tokens/sec" x={1270} y={860} size={TYPE.body} color={C.green} start={number} />
      <Label text="reading speed" x={1270} y={930} size={TYPE.micro} color={C.soft} start={reads + 0.8} />
      <Label text="before writing" x={510} y={800} size={TYPE.small} color={C.soft} start={reads + 0.6} />
    </>
  );
};

export const S39_Caveats: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const depends = B("Speed depends");
  const best = B("a best case");
  const promise = B("not a promise");
  const knobs = [
    {x: 500, y: 560, label: "GPU"},
    {x: 650, y: 330, label: "RAM + CPU"},
    {x: 1270, y: 330, label: "quantization"},
    {x: 1420, y: 560, label: "context"},
    {x: 960, y: 840, label: "task"},
  ];
  return (
    <>
      <Gauge x={960} y={470} r={210} value={0.78} start={0.2} color={C.yellow} />
      {[
        [500, 560, 690, 530],
        [650, 330, 760, 380],
        [1270, 330, 1160, 380],
        [1420, 560, 1230, 530],
        [960, 840, 960, 700],
      ].map(([x1, y1, x2, y2], i) => (
        <SketchLine key={i} x1={x1} y1={y1} x2={x2} y2={y2} start={0.6 + i * 0.08} dur={0.3} stroke={C.line} strokeWidth={2.5} seed={1340 + i} />
      ))}
      <Label text="speed" x={960} y={610} size={TYPE.micro} color={C.soft} start={0.7} />
      {knobs.map((k, i) => (
        <g key={k.label}>
          <SketchCircle x={k.x} y={k.y} d={74} start={0.35 + i * 0.1} dur={0.3} stroke={C.soft} fill={C.panel} strokeWidth={3} seed={1320 + i} />
          <Label text={k.label} x={k.x} y={k.y + 70} size={TYPE.micro} color={C.soft} start={0.45 + i * 0.1} />
        </g>
      ))}
      <Label text="best case" x={960} y={920} size={TYPE.big} color={C.yellow} start={best} />
      <Label text="not a promise" x={960} y={990} size={TYPE.body} color={C.red} start={promise} />
    </>
  );
};

export const S40_DualGPU: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const modified = B("One person modified");
  const together = B("together");
  const code = B("a hundred and forty-three");
  const prose = B("hundred and two");
  const alone = B("twenty-eight");
  const experiments = B("Those are experiments");
  return (
    <>
      <GPU x={420} y={250} w={400} h={150} start={0.2} color={C.cyan} label="" />
      <Label text="RTX 5080" x={620} y={215} size={TYPE.small} color={C.soft} start={modified} />
      <GPU x={1100} y={250} w={400} h={150} start={0.35} color={C.green} label="" />
      <Label text="RTX 4060 Ti" x={1300} y={215} size={TYPE.small} color={C.soft} start={modified + 0.4} />
      <SketchLine x1={830} y1={320} x2={1090} y2={320} start={together} dur={0.5} stroke={C.yellow} strokeWidth={5} seed={1331} />
      <Label text="together" x={960} y={365} size={TYPE.micro} color={C.yellow} start={together + 0.2} />
      <SpeedBar x={580} y={540} name="coding" value={143} max={160} color={C.green} start={code} width={760} />
      <SpeedBar x={580} y={680} name="prose" value={102} max={160} color={C.cyan} start={prose} width={760} />
      <SpeedBar x={580} y={820} name="5080 alone" value={28} max={160} color={C.orange} start={alone} width={760} />
      <Label text="experiments, not benchmarks" x={960} y={950} size={TYPE.micro} color={C.soft} start={experiments + 0.2} />
    </>
  );
};
