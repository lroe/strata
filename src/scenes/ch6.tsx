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
import {
  Check,
  CloudCrossed,
  Cross,
  Gauge,
  GPU,
  LayersMotif,
  ModelStack,
  Panel,
  PCTower,
  RAMSticks,
  StickFigure,
} from "../components/Objects";
import {SceneProps} from "./types";

const useBeats = (t0: number) => (phrase: string, occ = 0) => Math.max(0, at(phrase, occ) - t0);

export const S52_Crowd: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const one = B("fast for one person");
  const crowd = B("Serving a thousand users");
  const vllm = B("Engines like V-L-L-M");
  const replace = B("won’t replace llama C-P-P");
  const manyModels = B("huge range of models");
  return (
    <>
      <Groundline y={820} from={180} to={1740} start={0.05} />
      <StickFigure x={430} y={800} scale={1.2} start={one} phone />
      <Label text="one user" x={430} y={870} size={TYPE.body} color={C.green} start={one + 0.2} />
      <Label text="fast" x={430} y={300} size={TYPE.big} color={C.green} start={one + 0.4} />
      <Gauge x={430} y={440} r={100} value={0.9} start={one + 0.3} color={C.green} />
      <Label text="vs" x={960} y={510} size={TYPE.hero} color={C.soft} start={crowd - 0.3} />
      {Array.from({length: 7}).map((_, i) => (
        <StickFigure key={i} x={1150 + i * 78} y={800} scale={0.85} start={crowd + 0.1 + i * 0.1} color={i < 3 ? C.fg : C.soft} />
      ))}
      <Label text="1000 users" x={1380} y={870} size={TYPE.body} color={C.red} start={crowd + 0.3} />
      <Label text="waiting" x={1380} y={300} size={TYPE.big} color={C.red} start={crowd + 0.5} />
      <SketchPath d="M 1180 350 Q 1380 400 1580 350" start={crowd + 0.6} dur={0.5} stroke={C.red} strokeWidth={4} seed={1601} />
      <Label text="many requests" x={1380} y={420} size={TYPE.micro} color={C.soft} start={crowd + 0.8} />
      <SketchRect x={300} y={920} w={600} h={110} start={vllm} dur={0.4} stroke={C.cyan} fill={C.panel} radius={12} seed={1602} strokeWidth={3} />
      <Label text="vLLM · many users" x={600} y={975} size={TYPE.small} color={C.cyan} start={vllm + 0.2} />
      <SketchRect x={1120} y={920} w={600} h={110} start={manyModels} dur={0.4} stroke={C.purple} fill={C.panel} radius={12} seed={1603} strokeWidth={3} />
      <Label text="llama.cpp · many models" x={1420} y={975} size={TYPE.small} color={C.purple} start={manyModels} />
    </>
  );
};

export const S53_SweetSpot: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const sweet = B("sweet spot");
  const gaming = B("powerful gaming PC");
  const huge = B("run a huge model");
  return (
    <>
      <Groundline y={800} from={260} to={1660} start={0.1} />
      <PCTower x={620} y={390} w={260} h={410} start={sweet} label="" />
      <Label text="powerful gaming PC" x={750} y={850} size={TYPE.small} color={C.cyan} start={gaming} />
      <ModelStack x={1040} y={450} w={280} h={300} layers={5} start={huge} label="125B" labelSize={60} color={C.purple} />
      <Label text="a huge model" x={1180} y={850} size={TYPE.small} color={C.purple} start={huge + 0.2} />
      <Check x={960} y={590} size={70} start={huge + 0.6} />
      <SketchPath d="M 520 900 L 520 940 L 1400 940 L 1400 900" start={sweet + 0.5} dur={0.5} stroke={C.green} strokeWidth={4} seed={1611} />
      <Label text="the sweet spot" x={960} y={1000} size={TYPE.big} color={C.green} start={sweet + 0.7} />
    </>
  );
};

export const S54_BiggerStory: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const until = B("Until now");
  const loosen = B("Sparse models loosen");
  const engines = B("engines built around them");
  const workspace = B("GPU becomes the fast workspace");
  const holds = B("RAM holds the rest");
  return (
    <>
      {/* old limit gate */}
      <SketchLine x1={330} y1={300} x2={330} y2={760} start={until} dur={0.5} stroke={C.red} strokeWidth={6} seed={1621} />
      <SketchLine x1={530} y1={300} x2={530} y2={760} start={until + 0.15} dur={0.5} stroke={C.red} strokeWidth={6} seed={1622} />
      <SketchLine x1={330} y1={300} x2={530} y2={300} start={until + 0.3} dur={0.4} stroke={C.red} strokeWidth={6} seed={1623} />
      <Label text="VRAM limit" x={430} y={820} size={TYPE.small} color={C.red} start={until + 0.4} />
      <ModelStack x={150} y={430} w={120} h={160} layers={3} start={until + 0.5} label="" color={C.soft} />
      <g opacity={loosen > 0 ? 1 : 0}>
        <SketchLine x1={330} y1={300} x2={280} y2={250} start={loosen} dur={0.3} stroke={C.red} strokeWidth={5} seed={1624} />
        <SketchLine x1={530} y1={300} x2={580} y2={250} start={loosen + 0.1} dur={0.3} stroke={C.red} strokeWidth={5} seed={1625} />
        <Label text="loosened" x={430} y={240} size={TYPE.micro} color={C.green} start={loosen + 0.3} />
      </g>
      {/* new arrangement */}
      <SketchRect x={650} y={400} w={460} h={140} start={engines} dur={0.5} stroke={C.cyan} fill={C.panel} radius={12} seed={1626} strokeWidth={4} />
      <SketchLine x1={690} y1={540} x2={690} y2={620} start={engines + 0.3} stroke={C.cyan} strokeWidth={5} seed={1627} />
      <SketchLine x1={1070} y1={540} x2={1070} y2={620} start={engines + 0.3} stroke={C.cyan} strokeWidth={5} seed={1628} />
      <Label text="GPU" x={880} y={360} size={TYPE.body} color={C.cyan} start={workspace} />
      <Label text="workspace" x={880} y={590} size={TYPE.key} color={C.cyan} start={workspace + 0.2} />
      {Array.from({length: 3}).map((_, i) => (
        <SketchRect key={i} x={690 + i * 120} y={430} w={90} h={80} start={workspace + 0.3 + i * 0.1} dur={0.3} stroke={C.purple} fill={C.well} radius={4} seed={1630 + i} strokeWidth={2.5} />
      ))}
      <SketchLine x1={1210} y1={400} x2={1210} y2={720} start={holds} stroke={C.line} strokeWidth={4} seed={1634} />
      {Array.from({length: 3}).map((_, i) => (
        <g key={i}>
          <SketchLine x1={1230} y1={430 + i * 100} x2={1630} y2={430 + i * 100} start={holds + 0.1 + i * 0.1} dur={0.4} stroke={C.soft} strokeWidth={4} seed={1635 + i} />
          <SketchRect x={1260} y={390 + i * 100} w={80} h={50} start={holds + 0.2 + i * 0.1} dur={0.3} stroke={C.green} fill={C.well} radius={4} seed={1640 + i} strokeWidth={2.5} />
        </g>
      ))}
      <Label text="RAM" x={1430} y={360} size={TYPE.body} color={C.green} start={holds} />
      <Label text="the rest" x={1430} y={800} size={TYPE.key} color={C.green} start={holds + 0.3} />
    </>
  );
};

export const S55_PrivateMachine: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const build = B("Say we build a gaming PC");
  const vram = B("twenty-four gigabytes of V-RAM");
  const ram = B("twenty-eight gigabytes", 1);
  const ssd = B("a fast SSD");
  const rig = B("a gaming rig");
  const privateAI = B("a private AI machine");
  return (
    <>
      <Groundline y={850} from={260} to={1660} start={0.1} />
      <PCTower x={810} y={330} w={300} h={500} start={build} label="" />
      <Label text="gaming rig" x={680} y={280} size={TYPE.body} color={C.soft} start={rig} />
      <SketchRect x={380} y={380} w={330} h={100} start={vram} dur={0.4} stroke={C.cyan} fill={C.panel} radius={10} seed={1651} strokeWidth={3} />
      <Label text="24 GB VRAM" x={545} y={430} size={TYPE.small} color={C.cyan} start={vram + 0.2} />
      <SketchRect x={380} y={510} w={330} h={100} start={ram} dur={0.4} stroke={C.green} fill={C.panel} radius={10} seed={1652} strokeWidth={3} />
      <Label text="128 GB RAM" x={545} y={560} size={TYPE.small} color={C.green} start={ram + 0.2} />
      <SketchRect x={380} y={640} w={330} h={100} start={ssd} dur={0.4} stroke={C.yellow} fill={C.panel} radius={10} seed={1653} strokeWidth={3} />
      <Label text="fast SSD" x={545} y={690} size={TYPE.small} color={C.yellow} start={ssd + 0.2} />
      <CloudCrossed x={1320} y={360} w={260} start={privateAI} opacity={0.8} />
      <Label text="private AI machine" x={1450} y={620} size={TYPE.big} color={C.green} start={privateAI} />
      <Label text="now" x={1450} y={700} size={TYPE.micro} color={C.green} start={privateAI + 0.3} />
    </>
  );
};

export const S56_Tools: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const cloud = B("with no cloud provider");
  const coding = B("point a coding agent");
  const docs = B("search our own documents");
  const upload = B("without uploading");
  return (
    <>
      <PCTower x={810} y={300} w={300} h={460} start={0.2} label="" />
      <SketchRect x={250} y={300} w={400} h={120} start={cloud} dur={0.4} stroke={C.red} fill={C.panel} radius={12} seed={1661} strokeWidth={3} />
      <Label text="no cloud" x={450} y={360} size={TYPE.small} color={C.red} start={cloud + 0.2} />
      <Cross x={600} y={315} size={30} start={cloud + 0.4} />
      <SketchRect x={250} y={640} w={400} h={120} start={coding} dur={0.4} stroke={C.cyan} fill={C.panel} radius={12} seed={1662} strokeWidth={3} />
      <Label text="coding agent" x={450} y={700} size={TYPE.small} color={C.cyan} start={coding + 0.2} />
      <Arrow x1={780} y1={700} x2={660} y2={700} start={coding + 0.4} stroke={C.cyan} seed={1663} />
      <SketchRect x={1270} y={470} w={400} h={120} start={docs} dur={0.4} stroke={C.green} fill={C.panel} radius={12} seed={1664} strokeWidth={3} />
      <Label text="your documents" x={1470} y={530} size={TYPE.small} color={C.green} start={docs + 0.2} />
      <Arrow x1={1120} y1={530} x2={1250} y2={530} start={docs + 0.4} stroke={C.green} seed={1665} />
      <Label text="nothing leaves the machine" x={960} y={890} size={TYPE.key} color={C.yellow} start={upload + 0.3} />
      <SketchPath d="M 900 830 L 940 860 L 1020 790" start={upload + 0.6} dur={0.4} stroke={C.yellow} strokeWidth={5} seed={1666} />
    </>
  );
};

export const S57_Closing: React.FC<SceneProps> = ({t0}) => {
  const B = useBeats(t0);
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const model = B("A hundred and twenty-five billion parameter model running at dozens");
  const silly = B("sounded silly");
  const engineering = B("an engineering problem");
  const firstQ = B("the first question");
  const secondQ = B("a second question");
  const useAll = B("use all the memory");
  const drive = B("may drive a lot");
  const pcOut = firstQ + 0.35;
  const oldOut = secondQ + 0.3;
  const pcOpacity = Math.max(0, Math.min(1, (pcOut - t) / 0.35));
  const oldOpacity = Math.max(0, Math.min(1, (t - firstQ) / 0.3, (oldOut - t) / 0.3));
  const memOpacity = Math.max(0, Math.min(1, (t - secondQ) / 0.35));
  return (
    <>
      <g opacity={pcOpacity}>
        <PCTower x={760} y={360} w={260} h={440} start={model} label="" />
        <ModelStack x={1080} y={440} w={260} h={280} layers={5} start={model} label="125B" labelSize={56} color={C.purple} />
        <Label text="dozens of tokens/sec" x={960} y={880} size={TYPE.small} color={C.green} start={model + 0.5} />
        <Label text="sounded silly" x={700} y={300} size={TYPE.micro} color={C.soft} start={silly} />
        <g opacity={engineering > 0 ? 1 : 0}>
          <SketchRect x={720} y={930} w={480} h={80} start={engineering} dur={0.35} stroke={C.green} fill={C.panel} radius={10} seed={1671} strokeWidth={3} />
          <Label text="now an engineering problem" x={960} y={970} size={TYPE.micro} color={C.green} start={engineering + 0.2} />
        </g>
      </g>
      <g opacity={oldOpacity}>
        <Label text="how much VRAM?" x={960} y={450} size={TYPE.big} color={C.soft} start={firstQ} />
        <Cross x={960} y={545} size={60} start={firstQ + 0.5} />
      </g>
      <g opacity={memOpacity}>
        <SketchRect x={540} y={730} w={300} h={100} start={secondQ + 0.1} dur={0.4} stroke={C.cyan} fill={C.panel} radius={8} seed={1673} strokeWidth={2.5} />
        <Label text="GPU" x={690} y={780} size={TYPE.body} color={C.cyan} start={secondQ + 0.3} />
        <SketchRect x={860} y={730} w={300} h={100} start={secondQ + 0.2} dur={0.4} stroke={C.green} fill={C.panel} radius={8} seed={1674} strokeWidth={2.5} />
        <Label text="RAM" x={1010} y={780} size={TYPE.body} color={C.green} start={secondQ + 0.4} />
        <SketchRect x={1180} y={730} w={300} h={100} start={secondQ + 0.3} dur={0.4} stroke={C.yellow} fill={C.panel} radius={8} seed={1675} strokeWidth={2.5} />
        <Label text="SSD" x={1330} y={780} size={TYPE.body} color={C.yellow} start={secondQ + 0.5} />
      </g>
      <g opacity={useAll > 0 ? 1 : 0}>
        <Label text="use all the memory" x={960} y={430} size={TYPE.hero} color={C.green} start={useAll} />
        <SketchLine x1={480} y1={525} x2={1440} y2={525} start={useAll + 0.2} dur={0.5} stroke={C.line} strokeWidth={3} seed={1672} />
      </g>
      <g opacity={drive > 0 ? 1 : 0}>
        <Label text="the next question" x={960} y={900} size={TYPE.micro} color={C.soft} start={drive} />
      </g>
    </>
  );
};
