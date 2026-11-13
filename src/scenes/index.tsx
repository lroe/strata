import React from "react";
import {AUDIO_DURATION, at} from "../timing";
import {SceneProps} from "./types";
import {S01_Rule, S02_Tiers, S03_Reddit, S04_125OnPC, S05_Reports, S06_WhatChanged} from "./ch1";
import {
  S07_Strata,
  S08_Parameters,
  S09_VRAM,
  S10_RAM,
  S11_Fit,
  S12_WhatIf,
  S13_Inference,
  S14_OneModel,
  S15_Claim,
  S16_Token,
  S17_ThreeIdeas,
} from "./ch2";
import {
  S18_MoE,
  S19_Dense,
  S20_Router,
  S21_SixB,
  S22_Company,
  S24_Rooms,
  S25_Caching,
  S26_CacheMeaning,
  S27_Bench4090,
  S28_OnlyParts,
  S29_Sparse,
  S30_Subscribe,
} from "./ch3";
import {
  S31_QuantIntro,
  S32_Bits,
  S33_JPEG,
  S34_Levels,
  S35_Tradeoff,
  S36_TestMachine,
  S37_Speeds,
  S38_Prompt,
  S39_Caveats,
  S40_DualGPU,
} from "./ch4";
import {
  S41_ContextWindow,
  S42_KVCache,
  S43_Context128K,
  S44_Experimental,
  S45_Community256K,
  S46_LocalUI,
  S47_Compatible,
  S48_Requirements,
  S49_StartHere,
  S50_OutOfVRAM,
  S51_Limits,
} from "./ch5";
import {
  S52_Crowd,
  S53_SweetSpot,
  S54_BiggerStory,
  S55_PrivateMachine,
  S56_Tools,
  S57_Closing,
} from "./ch6";

export type SceneDef = {
  id: string;
  title: string;
  start: number;
  Component: React.FC<SceneProps>;
};

const s = (phrase: string, offset = 0.2) => Math.max(0, at(phrase) - offset);

export const SCENES: SceneDef[] = [
  {id: "S01", title: "The unwritten rule", start: 0, Component: S01_Rule},
  {id: "S02", title: "Model size tiers", start: 8.5, Component: S02_Tiers},
  {id: "S03", title: "Reddit speed posts", start: 26.2, Component: S03_Reddit},
  {id: "S04", title: "125B on a gaming PC", start: 33.4, Component: S04_125OnPC},
  {id: "S05", title: "Three reports", start: s("One person with two"), Component: S05_Reports},
  {id: "S06", title: "What changed", start: 53.5, Component: S06_WhatChanged},
  {id: "S07", title: "Strata", start: s("The project is called Strata"), Component: S07_Strata},
  {id: "S08", title: "Parameters", start: s("A model is basically"), Component: S08_Parameters},
  {id: "S09", title: "VRAM", start: s("The GPU keeps them"), Component: S09_VRAM},
  {id: "S10", title: "System RAM", start: 101.5, Component: S10_RAM},
  {id: "S11", title: "Does it fit", start: s("So the old question was simple", 0.3), Component: S11_Fit},
  {id: "S12", title: "What if", start: s("Strata tries something different"), Component: S12_WhatIf},
  {id: "S13", title: "Inference engine", start: 132.6, Component: S13_Inference},
  {id: "S14", title: "One model", start: s("Those two are general-purpose"), Component: S14_OneModel},
  {id: "S15", title: "The claim", start: s("The project’s claim"), Component: S15_Claim},
  {id: "S16", title: "Tokens", start: s("Quick note on that unit"), Component: S16_Token},
  {id: "S17", title: "Three ideas", start: 197.9, Component: S17_ThreeIdeas},
  {id: "S18", title: "Mixture of experts", start: 202.0, Component: S18_MoE},
  {id: "S19", title: "Dense model", start: s("In a normal"), Component: S19_Dense},
  {id: "S20", title: "Router", start: s("An M-O-E model is built differently"), Component: S20_Router},
  {id: "S21", title: "Six billion active", start: s("In this model, only about six billion"), Component: S21_SixB},
  {id: "S22", title: "The company", start: s("Say we run a company"), Component: S22_Company},
  {id: "S24", title: "Meeting room", start: s("Let’s stay with the company"), Component: S24_Rooms},
  {id: "S25", title: "Caching", start: s("Strata fills the meeting room"), Component: S25_Caching},
  {id: "S26", title: "Expert caching", start: 281.5, Component: S26_CacheMeaning},
  {id: "S27", title: "RTX 4090 benchmark", start: s("One community benchmark"), Component: S27_Bench4090},
  {id: "S28", title: "Only the parts", start: 307.3, Component: S28_OnlyParts},
  {id: "S29", title: "Sparse model", start: 314.75, Component: S29_Sparse},
  {id: "S30", title: "Subscribe", start: s("Quick note before we keep going"), Component: S30_Subscribe},
  {id: "S31", title: "Quantization", start: s("Even with caching"), Component: S31_QuantIntro},
  {id: "S32", title: "Bits", start: 348.7, Component: S32_Bits},
  {id: "S33", title: "JPEG", start: 356.6, Component: S33_JPEG},
  {id: "S34", title: "Quant levels", start: 367.4, Component: S34_Levels},
  {id: "S35", title: "Trade-off", start: 386.7, Component: S35_Tradeoff},
  {id: "S36", title: "Test machine", start: s("So how fast is it?"), Component: S36_TestMachine},
  {id: "S37", title: "Speeds", start: s("On short conversations"), Component: S37_Speeds},
  {id: "S38", title: "Prompt processing", start: s("It also reports prompt processing"), Component: S38_Prompt},
  {id: "S39", title: "Caveats", start: s("Those numbers come from"), Component: S39_Caveats},
  {id: "S40", title: "Dual GPU", start: 449.4, Component: S40_DualGPU},
  {id: "S41", title: "Context window", start: s("Another thing Strata cares about"), Component: S41_ContextWindow},
  {id: "S42", title: "KV cache", start: 483.0, Component: S42_KVCache},
  {id: "S43", title: "128K context", start: 494.9, Component: S43_Context128K},
  {id: "S44", title: "Experimental context", start: s("Its docs also describe"), Component: S44_Experimental},
  {id: "S45", title: "256K community", start: 512.6, Component: S45_Community256K},
  {id: "S46", title: "Local UI", start: 526.4, Component: S46_LocalUI},
  {id: "S47", title: "Compatible tools", start: 539.9, Component: S47_Compatible},
  {id: "S48", title: "Requirements", start: s("It runs on Windows ten and eleven"), Component: S48_Requirements},
  {id: "S49", title: "start-here.bat", start: 573.6, Component: S49_StartHere},
  {id: "S50", title: "Out of VRAM", start: s("And if we run out of V-RAM"), Component: S50_OutOfVRAM},
  {id: "S51", title: "Limits", start: s("Now for the limits"), Component: S51_Limits},
  {id: "S52", title: "One user vs crowd", start: 618.4, Component: S52_Crowd},
  {id: "S53", title: "Sweet spot", start: 639.2, Component: S53_SweetSpot},
  {id: "S54", title: "The bigger story", start: s("We think the bigger story"), Component: S54_BiggerStory},
  {id: "S55", title: "Private AI machine", start: 665.0, Component: S55_PrivateMachine},
  {id: "S56", title: "Local tools", start: 678.1, Component: S56_Tools},
  {id: "S57", title: "The next question", start: 686.0, Component: S57_Closing},
];

export const TOTAL_DURATION = AUDIO_DURATION + 2.8;

SCENES.forEach((sc, i) => {
  const end = i === SCENES.length - 1 ? TOTAL_DURATION : SCENES[i + 1].start;
  if (end - sc.start < 2) console.warn(`Scene ${sc.id} is only ${(end - sc.start).toFixed(2)}s`);
});
