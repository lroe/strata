import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from "remotion";
import React from "react";
import {loadFont} from "@remotion/fonts";
import {C, FPS} from "./theme";
import {SCENES, TOTAL_DURATION} from "./scenes";
import {clamp} from "./timing";

loadFont({
  family: "Caveat",
  url: staticFile("fonts/Caveat.ttf"),
  weight: "400 700",
  format: "truetype",
}).catch((e) => console.error("Caveat font failed", e));

loadFont({
  family: "Patrick Hand",
  url: staticFile("fonts/PatrickHand.ttf"),
  weight: "400",
  format: "truetype",
}).catch((e) => console.error("Patrick Hand font failed", e));

const SceneFade: React.FC<{duration: number; children: React.ReactNode; first?: boolean}> = ({
  duration,
  children,
  first,
}) => {
  const f = useCurrentFrame();
  const fin = first ? 1 : clamp(f / 3, 0, 1);
  const fout = clamp((duration - f) / 3, 0, 1);
  return (
    <AbsoluteFill style={{opacity: Math.min(fin, fout)}}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        style={{position: "absolute", inset: 0}}
      >
        {children}
      </svg>
    </AbsoluteFill>
  );
};

export const StrataVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <Audio src={staticFile("audio.wav")} />
    {SCENES.map((s, i) => {
      const from = Math.round(s.start * FPS);
      const to = Math.round((i === SCENES.length - 1 ? TOTAL_DURATION : SCENES[i + 1].start) * FPS);
      const dur = Math.max(1, to - from);
      return (
        <Sequence key={s.id} from={from} durationInFrames={dur} name={`${s.id} ${s.title}`}>
          <SceneFade duration={dur} first={i === 0}>
            <s.Component t0={s.start} />
          </SceneFade>
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
