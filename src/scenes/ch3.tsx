import React from "react";
import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {C, TYPE} from "../theme";
import {at} from "../timing";
import {
  Arrow,
  Label,
  SketchArc,
  SketchCircle,
  SketchLine,
  SketchPath,
  SketchRect,
} from "../components/Sketch";
import {Building, Check, GPU, ModelStack, Panel, RAMSticks, StickFigure} from "../components/Objects";
import {SceneProps} from "./types";

const useBeats = (t0: number) => (phrase: string, occ = 0) => Math.max(0, at(phrase, occ) - t0);
const dots = (cols: number, rows: number, x: number, y: number, dx: number, dy: number) =>
  Array.from({length: cols * rows}).map((_, i) => ({
    x: x + (i % cols) * dx,
    y: y + Math.floor(i / cols) * dy,
    i,
  }));

export const S18_MoE: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const first = B("The first idea");
  const moe = B("mixture-of-experts");
  const letters = B("M-O-E");
  return (
    <>
      <SketchRect x={560} y={250} w={800} h={540} start={first + 0.2} dur={0.55} stroke={C.purple} fill={C.panel} radius={18} seed={601} strokeWidth={4} />
      <Label text="the model" x={960} y={300} size={TYPE.body} color={C.soft} start={first + 0.4} />
      {dots(6, 4, 680, 380, 115, 95).map((d) => (
        <SketchCircle key={d.i} x={d.x} y={d.y} d={54} start={first + 0.3 + d.i * 0.03} dur={0.25} stroke={C.purple} fill={C.well} seed={610 + d.i} strokeWidth={2.5} />
      ))}
      <SketchRect x={1080} y={700} w={170} h={72} start={moe} dur={0.35} stroke={C.pink} fill={C.well} radius={8} seed={640} strokeWidth={3} />
      <Label text="MoE" x={1165} y={737} size={42} color={C.pink} start={moe + 0.2} />
      <Label text="many small experts inside" x={960} y={860} size={TYPE.small} color={C.soft} start={moe + 0.5} />
    </>
  );
};

export const S19_Dense: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const dense = B("In a normal");
  const every = B("every parameter works");
  const all = B("ALL hundred and twenty-five");
  const time = B("every single time");
  return (
    <>
      <SketchCircle x={360} y={560} d={110} start={dense + 0.2} dur={0.4} stroke={C.cyan} fill={C.panel} strokeWidth={4} seed={651} />
      <Label text="token" x={360} y={620} size={TYPE.micro} color={C.cyan} start={dense + 0.4} />
      <Arrow x1={430} y1={560} x2={620} y2={560} start={every} stroke={C.soft} seed={652} />
      {dots(8, 5, 720, 360, 115, 100).map((d) => (
        <g key={d.i}>
          <SketchCircle x={d.x} y={d.y} d={56} start={every + 0.1 + d.i * 0.015} dur={0.22} stroke={C.purple} fill={C.panel} seed={660 + d.i} strokeWidth={2.5} />
          <SketchCircle x={d.x} y={d.y} d={22} start={all + 0.1 + d.i * 0.015} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={700 + d.i} strokeWidth={1.5} />
        </g>
      ))}
      <Label text="ALL 125B" x={1100} y={900} size={TYPE.big} color={C.yellow} start={all} />
    </>
  );
};

export const S20_Router: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const different = B("built differently");
  const experts = B("small specialist networks");
  const router = B("router looks");
  const token = B("looks at each token");
  const picks = B("picks which experts");
  const sitsOut = B("Everyone else sits");
  const grid = dots(4, 4, 1120, 330, 120, 120);
  const active = [1, 6, 11];
  return (
    <>
      <SketchCircle x={260} y={560} d={100} start={different + 0.2} dur={0.4} stroke={C.purple} fill={C.panel} strokeWidth={4} seed={721} />
      <Label text="token" x={260} y={625} size={TYPE.micro} color={C.purple} start={different + 0.4} />
      <SketchCircle x={600} y={560} d={130} start={router} dur={0.45} stroke={C.cyan} fill={C.panel} strokeWidth={4} seed={722} />
      <Label text="router" x={600} y={565} size={TYPE.body} color={C.cyan} start={router + 0.2} />
      <Arrow x1={315} y1={560} x2={530} y2={560} start={token} stroke={C.soft} seed={723} />
      <Label text="experts" x={1350} y={255} size={TYPE.small} color={C.soft} start={experts} />
      {grid.map((d) => {
        const isActive = active.includes(d.i);
        return (
          <g key={d.i} opacity={isActive ? 1 : sitsOut > 0 ? 0.3 : 1}>
            <SketchCircle x={d.x} y={d.y} d={64} start={experts + 0.1 + d.i * 0.03} dur={0.25} stroke={isActive ? C.green : C.soft} fill={isActive ? C.green : C.well} seed={730 + d.i} strokeWidth={isActive ? 4 : 2.5} />
          </g>
        );
      })}
      {active.map((idx, k) => {
        const d = grid[idx];
        return (
          <SketchPath
            key={idx}
            d={`M 670 560 Q ${(670 + d.x) / 2} ${480 - k * 40} ${d.x - 35} ${d.y}`}
            start={picks + 0.1 + k * 0.18}
            dur={0.5}
            stroke={C.green}
            strokeWidth={3}
            seed={750 + k}
          />
        );
      })}
      <Label text="only a few experts" x={960} y={920} size={TYPE.body} color={C.green} start={picks + 0.8} />
    </>
  );
};

export const S21_SixB: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const model = B("In this model");
  const six = B("about six billion");
  const total = B("hundred and twenty-five billion parameters");
  return (
    <>
      <SketchRect x={420} y={360} w={1080} h={260} start={model} dur={0.5} stroke={C.line} fill={C.panel} radius={12} seed={761} strokeWidth={4} />
      <SketchRect x={432} y={372} w={78} h={236} start={six + 0.2} dur={0.4} stroke={C.green} fill={C.green} radius={6} seed={762} strokeWidth={3} />
      <Label text="6B" x={471} y={490} size={TYPE.small} color={C.bg} start={six + 0.5} />
      <Label text="119B idle" x={960} y={490} size={TYPE.body} color={C.soft} start={total + 0.3} />
      <Label text="125B total" x={960} y={700} size={TYPE.key} color={C.purple} start={total} />
      <Arrow x1={555} y1={310} x2={480} y2={360} start={six + 0.6} stroke={C.green} seed={763} />
      <Label text="active per token" x={700} y={300} size={TYPE.small} color={C.green} start={six + 0.8} />
    </>
  );
};

export const S22_Company: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const company = B("Say we run a company");
  const employees = B("hundred and twenty-five thousand employees");
  const task = B("Any given task");
  const six = B("six thousand of them");
  const payroll = B("whole company on the payroll");
  const room = B("in the room at once");
  const advantage = B("Strata takes advantage");
  const staff = dots(8, 6, 300, 400, 55, 65);
  const selected = [2, 9, 14, 21, 28];
  return (
    <>
      <SketchRect x={230} y={250} w={500} h={500} start={company + 0.2} dur={0.55} stroke={C.soft} fill={C.panel} radius={8} seed={771} strokeWidth={4} />
      <SketchRect x={280} y={320} w={400} h={380} start={employees} dur={0.5} stroke={C.line} fill={C.well} radius={4} seed={772} strokeWidth={2.5} />
      {staff.map((d) => {
        const isSel = selected.includes(d.i);
        return (
          <SketchCircle
            key={d.i}
            x={d.x}
            y={d.y}
            d={22}
            start={employees + 0.2 + d.i * 0.01}
            dur={0.18}
            stroke={isSel ? C.green : C.soft}
            fill={isSel ? C.green : C.panel}
            seed={780 + d.i}
            strokeWidth={2}
          />
        );
      })}
      <Label text="125,000 on payroll" x={480} y={810} size={TYPE.small} color={C.soft} start={payroll} />
      <Panel x={1040} y={310} w={560} h={330} start={task} fill={C.panel} stroke={C.green} seed={800} />
      <Label text="one task" x={1320} y={360} size={TYPE.body} color={C.green} start={task + 0.2} />
      {Array.from({length: 5}).map((_, i) => (
        <SketchCircle key={i} x={1140 + i * 85} y={480} d={40} start={six + 0.1 + i * 0.08} dur={0.25} stroke={C.green} fill={C.green} seed={810 + i} strokeWidth={2.5} />
      ))}
      <Label text="6,000 needed" x={1320} y={570} size={TYPE.body} color={C.green} start={six + 0.4} />
      <Label text="not all in the room" x={1320} y={720} size={TYPE.small} color={C.soft} start={room} />
      <SketchPath d="M 520 830 L 520 880 L 1290 880 L 1290 830" start={advantage} dur={0.5} stroke={C.yellow} strokeWidth={4} seed={805} />
      <Label text="the gap" x={905} y={930} size={TYPE.key} color={C.yellow} start={advantage + 0.35} />
    </>
  );
};

export const S23_Gap: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const gap = B("that gap");
  return (
    <>
      <SketchRect x={300} y={390} w={260} h={200} start={gap + 0.1} dur={0.4} stroke={C.green} fill={C.panel} radius={10} seed={821} strokeWidth={4} />
      <Label text="6B" x={430} y={475} size={TYPE.big} color={C.green} start={gap + 0.3} />
      <Label text="active" x={430} y={545} size={TYPE.micro} color={C.soft} start={gap + 0.4} />
      <SketchRect x={1250} y={390} w={370} h={200} start={gap + 0.2} dur={0.4} stroke={C.purple} fill={C.panel} radius={10} seed={822} strokeWidth={4} />
      <Label text="125B" x={1435} y={475} size={TYPE.big} color={C.purple} start={gap + 0.4} />
      <Label text="total" x={1435} y={545} size={TYPE.micro} color={C.soft} start={gap + 0.5} />
      <SketchPath d="M 600 640 L 600 690 L 1210 690 L 1210 640" start={gap + 0.5} dur={0.5} stroke={C.yellow} strokeWidth={4} seed={823} />
      <Label text="the gap" x={905} y={740} size={TYPE.key} color={C.yellow} start={gap + 0.8} />
      <Arrow x1={905} y1={790} x2={905} y2={850} start={gap + 1.0} stroke={C.soft} seed={824} />
      <Label text="Strata uses it" x={905} y={905} size={TYPE.small} color={C.fg} start={gap + 1.1} />
    </>
  );
};

export const S24_Rooms: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const company = B("Let’s stay with the company");
  const meeting = B("meeting room");
  const fast = B("Small, fast");
  const rest = B("rest of the building");
  const bigger = B("Much bigger");
  const walk = B("but a walk away");
  return (
    <>
      <SketchRect x={360} y={250} w={1200} h={620} start={company + 0.2} dur={0.55} stroke={C.soft} fill={C.panel} radius={8} seed={831} strokeWidth={4} />
      <SketchRect x={430} y={380} w={470} h={350} start={meeting} dur={0.5} stroke={C.cyan} fill={C.well} radius={6} seed={832} strokeWidth={4} />
      <Label text="meeting room" x={665} y={455} size={TYPE.key} color={C.cyan} start={meeting + 0.2} />
      <Label text="VRAM" x={665} y={530} size={TYPE.body} color={C.cyan} start={meeting + 0.35} />
      <Label text="small · fast" x={665} y={610} size={TYPE.small} color={C.green} start={fast} />
      <Arrow x1={930} y1={555} x2={1050} y2={555} start={rest} stroke={C.soft} seed={833} />
      <Label text="the building" x={1360} y={450} size={TYPE.key} color={C.green} start={rest} />
      <Label text="system RAM" x={1360} y={520} size={TYPE.body} color={C.green} start={rest + 0.2} />
      <Label text="much bigger" x={1360} y={600} size={TYPE.small} color={C.soft} start={bigger} />
      <Label text="a walk away" x={1360} y={660} size={TYPE.micro} color={C.orange} start={walk} />
      <Label text="VRAM = meeting room" x={960} y={930} size={TYPE.small} color={C.cyan} start={meeting + 0.7} />
    </>
  );
};

export const S25_Caching: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const fill = B("Strata fills the meeting room");
  const wait = B("Everyone else waits");
  const asks = B("router asks");
  const fetch = B("goes and gets them");
  const move = Math.max(0, Math.min(1, (t - fetch) / 1.0));
  const mx = interpolate(move, [0, 1], [1270, 850]);
  const my = 640 - Math.sin(move * Math.PI) * 90;
  return (
    <>
      <SketchRect x={330} y={350} w={640} h={430} start={fill - 0.5} dur={0.5} stroke={C.cyan} fill={C.panel} radius={10} seed={841} strokeWidth={4} />
      <Label text="VRAM" x={650} y={305} size={TYPE.body} color={C.cyan} start={fill - 0.2} />
      {Array.from({length: 8}).map((_, i) => (
        <SketchCircle key={i} x={430 + (i % 4) * 140} y={470 + Math.floor(i / 4) * 140} d={56} start={fill + 0.1 + i * 0.09} dur={0.3} stroke={C.green} fill={C.green} seed={842 + i} strokeWidth={2.5} />
      ))}
      <Label text="hot experts" x={650} y={730} size={TYPE.small} color={C.green} start={fill + 0.8} />
      <SketchRect x={1130} y={350} w={560} h={430} start={wait} dur={0.5} stroke={C.soft} fill={C.panel} radius={10} seed={851} strokeWidth={3} />
      <Label text="elsewhere" x={1410} y={305} size={TYPE.body} color={C.soft} start={wait + 0.2} />
      {dots(5, 4, 1190, 430, 90, 85).map((d) => (
        <SketchCircle key={d.i} x={d.x} y={d.y} d={34} start={wait + 0.2 + d.i * 0.03} dur={0.2} stroke={C.soft} fill={C.well} seed={860 + d.i} strokeWidth={2} />
      ))}
      <SketchCircle x={700} y={800} d={70} start={asks} dur={0.3} stroke={C.cyan} fill={C.panel} strokeWidth={3} seed={890} />
      <Label text="router" x={700} y={865} size={TYPE.micro} color={C.cyan} start={asks + 0.15} />
      <SketchPath d="M 720 790 Q 900 720 1210 660" start={asks + 0.2} dur={0.45} stroke={C.cyan} strokeWidth={3} seed={891} />
      <g opacity={move > 0 ? 1 : 0}>
        <SketchCircle x={mx} y={my} d={52} start={fetch} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={892} strokeWidth={3} />
        <Label text="fetch" x={mx} y={my - 50} size={TYPE.micro} color={C.yellow} start={fetch + 0.1} />
      </g>
      <Arrow x1={1160} y1={760} x2={1010} y2={700} start={fetch + 0.2} stroke={C.yellow} seed={893} />
    </>
  );
};

export const S26_CacheMeaning: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const name = B("called expert caching");
  const idea = B("the same idea");
  return (
    <>
      <SketchRect x={270} y={390} w={470} h={330} start={0.2} dur={0.5} stroke={C.green} fill={C.panel} radius={12} seed={901} strokeWidth={4} />
      <Label text="fast" x={505} y={350} size={TYPE.body} color={C.green} start={0.6} />
      {Array.from({length: 6}).map((_, i) => (
        <SketchCircle key={i} x={380 + (i % 3) * 140} y={480 + Math.floor(i / 3) * 130} d={52} start={0.5 + i * 0.06} dur={0.25} stroke={C.green} fill={C.green} seed={902 + i} strokeWidth={2.5} />
      ))}
      <Label text="what we use most" x={505} y={760} size={TYPE.micro} color={C.soft} start={idea + 0.6} />
      <SketchRect x={1050} y={310} w={690} h={470} start={0.35} dur={0.5} stroke={C.soft} fill={C.panel} radius={12} seed={911} strokeWidth={3} />
      <Label text="big & slow" x={1395} y={270} size={TYPE.body} color={C.soft} start={0.65} />
      {dots(7, 5, 1110, 380, 80, 75).map((d) => (
        <SketchCircle key={d.i} x={d.x} y={d.y} d={30} start={0.6 + d.i * 0.02} dur={0.2} stroke={C.soft} fill={C.well} seed={920 + d.i} strokeWidth={1.8} />
      ))}
      <Arrow x1={1030} y1={550} x2={770} y2={550} start={idea + 0.8} stroke={C.yellow} seed={950} />
      <Label text="keep hot things close" x={900} y={870} size={TYPE.key} color={C.yellow} start={idea + 0.9} />
      <Label text="expert caching" x={960} y={960} size={TYPE.body} color={C.cyan} start={name} />
    </>
  );
};

export const S27_Bench4090: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const gpu = B("on an R-T-X forty-ninety");
  const twelve = B("about twelve thousand");
  const total = B("twenty-four thousand, five hundred");
  const half = B("other half");
  const speed = B("over a hundred and forty");
  const some = B("on some workloads");
  return (
    <>
      <GPU x={750} y={230} w={420} h={120} start={0.2} color={C.cyan} label="" />
      <Label text="RTX 4090" x={960} y={200} size={TYPE.small} color={C.soft} start={gpu + 0.2} />
      <SketchRect x={300} y={480} w={1320} h={110} start={twelve} dur={0.5} stroke={C.line} fill={C.panel} radius={12} seed={961} strokeWidth={3} />
      <SketchRect x={312} y={492} w={636} h={86} start={twelve + 0.2} dur={0.5} stroke={C.green} fill={C.green} radius={8} seed={962} strokeWidth={3} />
      <Label text="12,000 in VRAM" x={330} y={425} size={TYPE.small} color={C.green} align="left" start={twelve + 0.4} />
      <Label text="12,576 in RAM" x={1250} y={425} size={TYPE.small} color={C.fg} align="left" start={half} />
      <Label text="24,576 experts total" x={960} y={660} size={TYPE.small} color={C.soft} start={total} />
      <Label text="140+ t/s" x={960} y={790} size={TYPE.huge} color={C.green} start={speed} />
      <Label text="on some workloads" x={960} y={900} size={TYPE.micro} color={C.soft} start={some} />
      <Label text="roughly half cached" x={960} y={960} size={TYPE.small} color={C.yellow} start={half + 0.6} />
    </>
  );
};

export const S28_OnlyParts: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const whole = B("doesn’t have to hold the whole model");
  const parts = B("only needs the parts");
  return (
    <>
      <SketchRect x={380} y={300} w={620} h={470} start={0.1} dur={0.5} stroke={C.cyan} fill={C.panel} radius={16} seed={971} strokeWidth={4} />
      <Label text="GPU" x={690} y={265} size={TYPE.body} color={C.cyan} start={whole + 0.4} />
      {Array.from({length: 3}).map((_, i) => (
        <SketchRect key={i} x={470} y={390 + i * 110} w={440} h={80} start={whole + 0.4 + i * 0.1} dur={0.3} stroke={C.purple} fill={C.well} radius={4} seed={972 + i} strokeWidth={3} />
      ))}
      {Array.from({length: 4}).map((_, i) => (
        <SketchRect key={`o${i}`} x={1120} y={320 + i * 100} w={400} h={70} start={parts + 0.1 + i * 0.1} dur={0.3} stroke={C.soft} fill={C.panel} radius={4} seed={980 + i} strokeWidth={2.5} opacity={0.5} />
      ))}
      <Arrow x1={1080} y1={560} x2={1010} y2={560} start={parts + 0.6} stroke={C.yellow} seed={990} />
      <Label text="fetch on demand" x={1240} y={760} size={TYPE.small} color={C.yellow} start={parts + 0.8} />
      <Label text="only what we need now" x={960} y={900} size={TYPE.key} color={C.yellow} start={parts + 0.9} />
    </>
  );
};

export const S29_Sparse: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const slice = B("wake only a small slice");
  const sparse = B("already sparse");
  const place = B("where each piece should live");
  const special = B("so specialized");
  const grid = dots(5, 3, 730, 350, 100, 100);
  const lit = [2, 7, 12];
  return (
    <>
      <SketchRect x={640} y={290} w={600} h={420} start={0.2} dur={0.5} stroke={C.purple} fill={C.panel} radius={14} seed={1001} strokeWidth={4} />
      <Label text="the model" x={940} y={255} size={TYPE.micro} color={C.soft} start={slice + 0.2} />
      {grid.map((d) => (
        <SketchCircle key={d.i} x={d.x} y={d.y} d={54} start={slice + 0.2 + d.i * 0.03} dur={0.22} stroke={lit.includes(d.i) ? C.green : C.soft} fill={lit.includes(d.i) ? C.green : C.well} seed={1010 + d.i} strokeWidth={2.5} />
      ))}
      <Label text="a small slice wakes" x={940} y={760} size={TYPE.small} color={C.green} start={sparse} />
      <Arrow x1={700} y1={720} x2={420} y2={800} start={place} stroke={C.yellow} seed={1030} />
      <Arrow x1={1180} y1={720} x2={1460} y2={800} start={place + 0.15} stroke={C.yellow} seed={1031} />
      <Label text="GPU" x={380} y={850} size={TYPE.body} color={C.cyan} start={place + 0.3} />
      <Label text="RAM" x={1500} y={850} size={TYPE.body} color={C.green} start={place + 0.4} />
      <Label text="already sparse" x={960} y={900} size={TYPE.key} color={C.purple} start={sparse + 0.3} />
      <g opacity={special > 0 ? 1 : 0}>
        <SketchRect x={750} y={950} w={420} h={80} start={special} dur={0.3} stroke={C.pink} fill={C.well} radius={8} seed={1040} strokeWidth={3} />
        <Label text="built for one model" x={960} y={990} size={TYPE.micro} color={C.pink} start={special + 0.2} />
      </g>
    </>
  );
};

export const S30_Subscribe: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const subscribe = B("please subscribe");
  const back = B("back to Strata");
  return (
    <>
      <SketchArc x={960} y={380} w={220} h={200} startAngle={-180} stopAngle={0} start={0.2} dur={0.5} stroke={C.yellow} strokeWidth={5} seed={1051} />
      <SketchLine x1={850} y1={390} x2={1070} y2={390} start={0.45} dur={0.3} stroke={C.yellow} strokeWidth={5} seed={1052} />
      <SketchLine x1={960} y1={280} x2={960} y2={300} start={0.55} dur={0.2} stroke={C.yellow} strokeWidth={5} seed={1053} />
      <SketchCircle x={960} y={420} d={26} start={0.65} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={1054} />
      <SketchRect x={680} y={540} w={560} h={150} start={0.8} dur={0.45} stroke={C.red} fill={C.panel} radius={30} seed={1055} strokeWidth={4} />
      <Label text="subscribe" x={960} y={615} size={TYPE.big} color={C.fg} start={subscribe + 0.2} />
      <Arrow x1={960} y1={740} x2={960} y2={810} start={back} stroke={C.green} seed={1056} />
      <Label text="back to Strata" x={960} y={865} size={TYPE.body} color={C.green} start={back + 0.2} />
    </>
  );
};
