import React from "react";
import {Composition} from "remotion";
import {StrataVideo} from "./Video";
import {FPS, H, W} from "./theme";
import {TOTAL_DURATION} from "./scenes";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="StrataExplainer"
    component={StrataVideo}
    durationInFrames={Math.ceil(TOTAL_DURATION * FPS)}
    fps={FPS}
    width={W}
    height={H}
  />
);
