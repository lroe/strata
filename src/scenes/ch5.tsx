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
  SketchRect,
} from "../components/Sketch";
import {
  Bar,
  CloudCrossed,
  Cross,
  Check,
  GPU,
  ModelStack,
  Panel,
  RAMSticks,
  StickFigure,
  WindowCard,
} from "../components/Objects";
import {SceneProps} from "./types";

const useBeats = (t0: number) => (phrase: string, occ = 0) => Math.max(0, at(phrase, occ) - t0);

export const S41_ContextWindow: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const windowT = B("The context window");
  const conversation = B("our conversation");
  const document = B("a pasted document");
  const codebase = B("a whole codebase");
  return (
    <>
      <SketchRect x={520} y={260} w={880} h={520} start={windowT} dur={0.55} stroke={C.cyan} fill={C.panel} radius={16} seed={1401} strokeWidth={4} />
      <SketchLine x1={520} y1={330} x2={1400} y2={330} start={windowT + 0.2} dur={0.4} stroke={C.line} strokeWidth={3} seed={1402} />
      <Label text="context window" x={960} y={850} size={TYPE.key} color={C.cyan} start={windowT + 0.4} />
      <Label text="kept in mind at once" x={960} y={915} size={TYPE.micro} color={C.soft} start={windowT + 0.7} />
      <Panel x={590} y={390} w={240} h={300} start={conversation} fill={C.well} stroke={C.purple} seed={1403} />
      <Label text="chat" x={710} y={445} size={TYPE.body} color={C.purple} start={conversation + 0.2} />
      <SketchRect x={630} y={500} w={160} h={50} start={conversation + 0.3} dur={0.3} stroke={C.soft} fill={C.panel} radius={12} seed={1404} />
      <SketchRect x={630} y={570} w={120} h={50} start={conversation + 0.4} dur={0.3} stroke={C.soft} fill={C.panel} radius={12} seed={1405} />
      <Panel x={850} y={420} w={240} h={270} start={document} fill={C.well} stroke={C.soft} seed={1406} />
      <Label text="document" x={970} y={475} size={TYPE.micro} color={C.soft} start={document + 0.2} />
      {Array.from({length: 4}).map((_, i) => (
        <SketchLine key={i} x1={890} y1={520 + i * 35} x2={1050 - (i % 2) * 40} y2={520 + i * 35} start={document + 0.3 + i * 0.08} dur={0.25} stroke={C.soft} strokeWidth={5} seed={1407 + i} />
      ))}
      <Panel x={1110} y={390} w={240} h={300} start={codebase} fill={C.well} stroke={C.green} seed={1412} />
      <Label text="codebase" x={1230} y={445} size={TYPE.micro} color={C.green} start={codebase + 0.2} />
      {Array.from({length: 5}).map((_, i) => (
        <SketchLine key={i} x1={1150} y1={500 + i * 32} x2={1300 - (i % 3) * 35} y2={500 + i * 32} start={codebase + 0.3 + i * 0.08} dur={0.25} stroke={C.green} strokeWidth={4} seed={1413 + i} />
      ))}
    </>
  );
};

export const S42_KVCache: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const costs = B("Long context costs memory");
  const notes = B("keeps notes on every token");
  const cache = B("KV cache");
  const longer = B("longer the conversation");
  const grow = Math.max(0, Math.min(1, (t - notes) / 6));
  return (
    <>
      <ModelStack x={300} y={330} w={250} h={280} layers={5} start={costs} label="model" labelSize={40} color={C.purple} />
      <Arrow x1={600} y1={470} x2={760} y2={470} start={notes} stroke={C.soft} seed={1421} />
      <SketchRect x={800} y={250} w={640} h={470} start={notes} dur={0.5} stroke={C.yellow} fill={C.panel} radius={10} seed={1422} strokeWidth={4} />
      <Label text="notes" x={960} y={305} size={TYPE.body} color={C.yellow} start={notes + 0.2} />
      {Array.from({length: 9}).map((_, i) => (
        <SketchLine key={i} x1={850} y1={360 + i * 38} x2={1360 - (i % 3) * 50} y2={360 + i * 38} start={notes + 0.3 + i * 0.25} dur={0.25} stroke={i > 5 ? C.yellow : C.soft} strokeWidth={4} seed={1423 + i} />
      ))}
      <Bar x={980} y={780} w={460} h={32} value={grow} start={notes + 0.4} color={C.red} />
      <Label text="grows with context" x={1210} y={850} size={TYPE.small} color={C.red} start={longer} />
      <Label text="KV cache" x={960} y={945} size={TYPE.big} color={C.yellow} start={cache} />
    </>
  );
};

export const S43_Context128K: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const reach = B("benchmarks reach");
  const speed = B("land between");
  const hi = B("seventy-four");
  return (
    <>
      <Label text="128K context" x={960} y={250} size={TYPE.hero} color={C.green} start={reach + 0.2} />
      <SketchLine x1={260} y1={520} x2={1660} y2={520} start={0.2} dur={0.7} stroke={C.soft} strokeWidth={5} seed={1431} />
      {Array.from({length: 9}).map((_, i) => (
        <SketchLine key={i} x1={260 + i * 175} y1={500} x2={260 + i * 175} y2={540} start={0.3 + i * 0.04} dur={0.2} stroke={C.soft} strokeWidth={3} seed={1432 + i} />
      ))}
      <Label text="0" x={260} y={575} size={TYPE.micro} color={C.soft} start={reach + 0.4} />
      <Label text="128K" x={1660} y={575} size={TYPE.body} color={C.green} start={reach + 0.6} />
      <SketchRect x={1540} y={460} w={140} h={30} start={reach + 0.4} dur={0.3} stroke={C.green} fill={C.green} radius={15} seed={1441} strokeWidth={2} />
      <SketchPath d="M 1540 650 L 1540 700 L 1660 700 L 1660 650" start={speed} dur={0.5} stroke={C.yellow} strokeWidth={4} seed={1442} />
      <Label text="46–74 t/s" x={1600} y={770} size={TYPE.big} color={C.yellow} start={speed + 0.3} />
      <Label text="still usable" x={1600} y={835} size={TYPE.micro} color={C.soft} start={hi + 0.2} />
      <Label text="long context" x={500} y={300} size={TYPE.body} color={C.soft} start={reach + 0.8} />
    </>
  );
};

export const S44_Experimental: React.FC<{t0: number}> = ({t0}) => {
  const B = useBeats(t0);
  const docs = B("Its docs");
  const threeEighty = B("three hundred and eighty-four");
  const fiveTwelve = B("five hundred and twelve");
  const experimental = B("experimental");
  return (
    <>
      <SketchLine x1={300} y1={520} x2={780} y2={520} start={docs} dur={0.6} stroke={C.green} strokeWidth={7} seed={1451} />
      {Array.from({length: 22}).map((_, i) => (
        <SketchLine key={i} x1={780 + i * 40} y1={520} x2={780 + i * 40 + 16} y2={520} start={threeEighty + 0.1 + i * 0.03} dur={0.15} stroke={C.orange} strokeWidth={6} seed={1452 + i} />
      ))}
      <SketchLine x1={300} y1={500} x2={300} y2={540} start={docs + 0.2} stroke={C.green} strokeWidth={4} seed={1470} />
      <SketchLine x1={780} y1={500} x2={780} y2={540} start={docs + 0.3} stroke={C.green} strokeWidth={4} seed={1473} />
      <SketchLine x1={1400} y1={500} x2={1400} y2={540} start={threeEighty + 0.3} stroke={C.orange} strokeWidth={4} seed={1474} />
      <SketchLine x1={1640} y1={500} x2={1640} y2={540} start={fiveTwelve + 0.2} stroke={C.orange} strokeWidth={4} seed={1475} />
      <Label text="128K" x={780} y={575} size={TYPE.body} color={C.green} start={docs + 0.4} />
      <Label text="384K" x={1400} y={575} size={TYPE.body} color={C.orange} start={threeEighty + 0.2} />
      <Label text="512K" x={1640} y={575} size={TYPE.body} color={C.orange} start={fiveTwelve + 0.2} />
      <Label text="tested" x={540} y={620} size={TYPE.micro} color={C.green} start={docs + 0.5} />
      <Label text="experimental" x={1480} y={620} size={TYPE.small} color={C.orange} start={experimental} />
    </>
  );
};

export const S45_Community256K: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const experiment = B("One community experiment");
  const gpu1 = B("a forty-eight gigabyte");
  const gpu2 = B("a sixteen gigabyte");
  const ram = B("a hundred and twenty-eight gigabytes");
  const context = B("around two hundred and fifty-six");
  return (
    <>
      <GPU x={300} y={320} w={430} h={160} start={0.2} color={C.cyan} label="" />
      <Label text="RTX 4090 D" x={515} y={285} size={TYPE.small} color={C.soft} start={gpu1 + 0.2} />
      <Label text="48 GB" x={515} y={530} size={TYPE.body} color={C.cyan} start={gpu1 + 0.2} />
      <GPU x={300} y={620} w={430} h={150} start={0.35} color={C.green} label="" />
      <Label text="RTX 5070 Ti" x={515} y={585} size={TYPE.small} color={C.soft} start={gpu2 + 0.2} />
      <Label text="16 GB" x={515} y={820} size={TYPE.body} color={C.green} start={gpu2 + 0.2} />
      <RAMSticks x={980} y={420} count={5} height={280} start={ram} color={C.purple} />
      <Label text="128 GB RAM" x={1250} y={770} size={TYPE.body} color={C.purple} start={ram + 0.2} />
      <Label text="≈256K" x={1470} y={420} size={TYPE.huge} color={C.yellow} start={context} />
      <Label text="context" x={1470} y={530} size={TYPE.body} color={C.yellow} start={context + 0.2} />
      <Label text="community experiment" x={960} y={945} size={TYPE.small} color={C.soft} start={experiment + 0.8} />
    </>
  );
};

export const S46_LocalUI: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const local = B("local web interface");
  const api = B("OpenAI-compatible");
  const address = B("local address");
  const anthropic = B("Anthropic-compatible endpoint");
  return (
    <>
      <WindowCard x={420} y={230} w={1080} h={560} title="browser" start={local} seed={1491} />
      <SketchRect x={500} y={320} w={920} h={80} start={address} dur={0.45} stroke={C.cyan} fill={C.panel} radius={12} seed={1492} strokeWidth={3} />
      <Label text="127.0.0.1:8080" x={540} y={360} size={52} color={C.cyan} align="left" start={address + 0.2} />
      <SketchCircle x={556} y={500} d={54} start={local + 0.5} dur={0.3} stroke={C.green} fill={C.green} seed={1493} strokeWidth={2} />
      <Label text="Strata" x={610} y={505} size={TYPE.body} color={C.fg} align="left" start={local + 0.6} />
      <SketchRect x={540} y={560} w={800} h={70} start={local + 0.7} dur={0.35} stroke={C.line} fill={C.well} radius={35} seed={1494} strokeWidth={2.5} />
      <Label text="type here…" x={580} y={595} size={36} color={C.soft} align="left" start={local + 0.8} />
      <Label text="local web interface" x={960} y={850} size={TYPE.small} color={C.soft} start={local + 0.4} />
      <g opacity={api > 0 ? 1 : 0}>
        <SketchRect x={520} y={900} w={380} h={100} start={api} dur={0.35} stroke={C.green} fill={C.panel} radius={10} seed={1495} strokeWidth={3} />
        <Label text="OpenAI API" x={710} y={950} size={TYPE.micro} color={C.green} start={api + 0.2} />
      </g>
      <g opacity={anthropic > 0 ? 1 : 0}>
        <SketchRect x={1020} y={900} w={380} h={100} start={anthropic} dur={0.35} stroke={C.purple} fill={C.panel} radius={10} seed={1496} strokeWidth={3} />
        <Label text="Anthropic API" x={1210} y={950} size={TYPE.micro} color={C.purple} start={anthropic + 0.2} />
      </g>
    </>
  );
};

export const S47_Compatible: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const compatible = B("OpenAI-compatible just means");
  const tools = B("That covers");
  const coding = B("coding agents");
  const chat = B("chat apps");
  const python = B("Python scripts");
  const rag = B("R-A-G apps");
  const server = B("local server");
  const prompts = B("prompts never leave");
  return (
    <>
      <SketchRect x={690} y={440} w={540} h={190} start={compatible} dur={0.5} stroke={C.cyan} fill={C.panel} radius={16} seed={1501} strokeWidth={4} />
      <Label text="127.0.0.1:8080" x={960} y={515} size={52} color={C.cyan} start={compatible + 0.2} />
      <Label text="local server" x={960} y={585} size={36} color={C.soft} start={server} />
      {[
        {x: 300, y: 300, label: "coding agent", p: coding},
        {x: 300, y: 760, label: "chat app", p: chat},
        {x: 1320, y: 300, label: "Python", p: python},
        {x: 1320, y: 760, label: "RAG", p: rag},
      ].map((c, i) => (
        <g key={c.label}>
          <Panel x={c.x} y={c.y} w={300} h={120} start={c.p} fill={C.panel} stroke={C.soft} seed={1502 + i} />
          <Label text={c.label} x={c.x + 150} y={c.y + 60} size={TYPE.small} color={C.fg} start={c.p + 0.2} />
          <Arrow
            x1={i < 2 ? c.x + 300 : c.x}
            y1={c.y + 60}
            x2={i < 2 ? 675 : 1245}
            y2={i < 2 ? 460 : 585}
            start={c.p + 0.4}
            stroke={C.cyan}
            seed={1510 + i}
          />
        </g>
      ))}
      <CloudCrossed x={800} y={30} w={200} start={tools + 0.3} opacity={0.8} />
      <Label text="no cloud" x={1080} y={105} size={TYPE.body} color={C.red} start={tools + 0.5} />
      <SketchRect x={130} y={180} w={1660} h={800} start={compatible + 0.3} dur={0.6} stroke={C.line} fill="none" radius={24} seed={1520} strokeWidth={2.5} />
      <Label text="prompts stay home" x={960} y={1010} size={TYPE.key} color={C.green} start={prompts} />
    </>
  );
};

export const S48_Requirements: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const windows = B("It runs on Windows");
  const gpu = B("NVIDIA R-T-X GPU");
  const vram = B("at least twelve gigabytes");
  const ram = B("sixty-four gigabytes as the standard baseline");
  const disk = B("eighty gigabytes");
  const rows = [
    {label: "Windows 10/11 · Linux", p: windows, color: C.cyan},
    {label: "NVIDIA RTX 20–50", p: gpu, color: C.purple},
    {label: "12 GB VRAM minimum", p: vram, color: C.pink},
    {label: "64 GB RAM baseline", p: ram, color: C.green},
    {label: "80 GB free disk", p: disk, color: C.yellow},
  ];
  return (
    <>
      <Panel x={480} y={220} w={960} h={640} start={0.2} fill={C.panel} stroke={C.line} seed={1531} />
      {rows.map((r, i) => (
        <g key={r.label}>
          <Check x={570} y={330 + i * 105} size={42} start={r.p} color={r.color} />
          <Label text={r.label} x={630} y={330 + i * 105} size={44} color={C.fg} align="left" start={r.p + 0.15} />
        </g>
      ))}
      <Label text="minimum setup" x={960} y={930} size={TYPE.micro} color={C.soft} start={windows + 0.5} />
    </>
  );
};

export const S49_StartHere: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const bat = B("a file called");
  const model = B("picking the model");
  const quant = B("the quantization, and the context");
  const context = B("and the context length");
  const low = B("low RAM mode");
  return (
    <>
      <WindowCard x={480} y={220} w={960} h={560} title="start-here.bat" start={0.2} seed={1541} />
      {[
        {label: "1  model", p: model},
        {label: "2  quantization", p: quant},
        {label: "3  context length", p: context},
      ].map((r, i) => (
        <g key={r.label}>
          <SketchRect x={560} y={340 + i * 110} w={800} h={78} start={r.p} dur={0.35} stroke={i === 0 ? C.green : i === 1 ? C.cyan : C.purple} fill={C.well} radius={8} seed={1542 + i} strokeWidth={2.5} />
          <Label text={r.label} x={610} y={380 + i * 110} size={TYPE.body} color={C.fg} align="left" start={r.p + 0.2} />
        </g>
      ))}
      <g opacity={low > 0 ? 1 : 0}>
        <SketchRect x={620} y={830} w={680} h={100} start={low} dur={0.4} stroke={C.orange} fill={C.panel} radius={12} seed={1546} strokeWidth={3} />
        <Label text="low RAM mode" x={960} y={880} size={TYPE.body} color={C.orange} start={low + 0.2} />
      </g>
    </>
  );
};

export const S50_OutOfVRAM: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const out = B("if we run out");
  const quant = B("aggressive quantization");
  const offload = B("more offloading");
  const second = B("a second GPU");
  const split = B("work out the split");
  return (
    <>
      <GPU x={300} y={300} w={480} h={190} start={0.1} color={C.red} label="VRAM" />
      <RAMSticks x={1240} y={250} count={5} height={260} start={out + 0.2} color={C.green} />
      <Label text="system RAM" x={1440} y={555} size={TYPE.micro} color={C.green} start={out + 0.4} />
      <Label text="full" x={540} y={540} size={TYPE.big} color={C.red} start={out + 0.3} />
      <Bar x={820} y={350} w={360} h={30} value={1} start={out + 0.3} color={C.red} />
      <Bar x={820} y={420} w={360} h={30} value={0.45} start={split} color={C.green} />
      <Arrow x1={1090} y1={350} x2={1220} y2={350} start={out + 0.6} stroke={C.red} seed={1551} />
      <Label text="shrink + offload" x={960} y={520} size={TYPE.small} color={C.yellow} start={split} />
      {[
        {x: 250, label: "more quantization", p: quant, color: C.purple},
        {x: 760, label: "more offload", p: offload, color: C.cyan},
        {x: 1270, label: "second GPU", p: second, color: C.green},
      ].map((c, i) => (
        <g key={c.label}>
          <SketchRect x={c.x} y={700} w={400} h={110} start={c.p} dur={0.4} stroke={c.color} fill={C.panel} radius={12} seed={1560 + i} strokeWidth={3} />
          <Label text={c.label} x={c.x + 200} y={755} size={TYPE.small} color={c.color} start={c.p + 0.2} />
        </g>
      ))}
      <Label text="Strata picks the split" x={960} y={900} size={TYPE.key} color={C.yellow} start={split + 0.4} />
    </>
  );
};

export const S51_Limits: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const notAny = B("doesn’t mean any model");
  const oneModel = B("built around one model");
  const capable = B("need a capable machine");
  const ramSpeed = B("The speed of our RAM");
  const pcie = B("PCI Express link");
  const ssd = B("our SSD");
  const gpu = B("the GPU itself");
  return (
    <>
      <SketchRect x={250} y={280} w={420} h={300} start={0.2} dur={0.5} stroke={C.soft} fill={C.panel} radius={12} seed={1571} strokeWidth={4} />
      <SketchLine x1={260} y1={580} x2={660} y2={580} start={notAny + 0.3} stroke={C.soft} strokeWidth={6} seed={1572} />
      <SketchRect x={340} y={360} w={240} h={150} start={notAny + 0.2} dur={0.4} stroke={C.purple} fill={C.well} radius={4} seed={1573} strokeWidth={3} />
      <Cross x={460} y={435} size={90} start={notAny + 0.5} />
      <Label text="not any laptop" x={460} y={660} size={TYPE.body} color={C.red} start={notAny + 0.6} />
      <Label text="one model" x={460} y={720} size={TYPE.small} color={C.pink} start={oneModel} />
      {[
        {x: 900, label: "RAM", p: ramSpeed},
        {x: 1100, label: "PCIe", p: pcie},
        {x: 1300, label: "SSD", p: ssd},
        {x: 1500, label: "GPU", p: gpu},
      ].map((c, i) => (
        <g key={c.label}>
          <SketchRect x={c.x} y={380} w={150} h={150} start={c.p} dur={0.4} stroke={i === 0 ? C.green : i === 1 ? C.yellow : i === 2 ? C.cyan : C.purple} fill={C.panel} radius={10} seed={1580 + i} strokeWidth={3} />
          <Label text={c.label} x={c.x + 75} y={455} size={TYPE.body} color={C.fg} start={c.p + 0.2} />
          {i < 3 ? <Arrow x1={c.x + 150} y1={455} x2={c.x + 195} y2={455} start={c.p + 0.4} stroke={C.soft} seed={1590 + i} /> : null}
        </g>
      ))}
      <SketchLine x1={900} y1={610} x2={1650} y2={610} start={capable + 0.3} dur={0.5} stroke={C.line} strokeWidth={4} seed={1595} />
      <Label text="all of it shapes the experience" x={1275} y={700} size={TYPE.small} color={C.soft} start={gpu + 0.3} />
      <Label text="it won’t fix old hardware" x={1275} y={790} size={TYPE.small} color={C.red} start={capable + 1.0} />
    </>
  );
};
