import React, {useMemo} from "react";
import rough from "roughjs";
import type {Drawable, Options} from "roughjs/bin/core";
import {spring, useCurrentFrame, useVideoConfig} from "remotion";
import {C, FPS} from "../theme";

const generator = rough.generator();

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const ramp = (t: number, start: number, dur = 0.45) =>
  clamp01((t - start) / Math.max(0.001, dur));

type Common = {
  start?: number;
  dur?: number;
  progress?: number;
  seed?: number;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  roughness?: number;
  bowing?: number;
  dash?: boolean;
  fillStart?: number;
};

const useProgress = (start = -1, dur = 0.45, progress?: number) => {
  const frame = useCurrentFrame();
  return progress !== undefined ? progress : ramp(frame / FPS, start, dur);
};

const optionsFor = (o: Common, extra?: Partial<Options>): Options => ({
  roughness: o.roughness ?? 1.25,
  bowing: o.bowing ?? 1.1,
  stroke: o.stroke ?? C.fg,
  strokeWidth: o.strokeWidth ?? 3.5,
  seed: o.seed ?? 7,
  preserveVertices: true,
  ...extra,
});

const RenderPaths: React.FC<{
  paths: ReturnType<typeof generator.toPaths>;
  draw: number;
  fillProgress?: number;
  opacity?: number;
}> = ({paths, draw, fillProgress = 1, opacity = 1}) => (
  <>
    {paths.map((p, i) => {
      const isFill = !!p.fill && p.fill !== "none" && p.fill !== "";
      if (isFill) {
        return (
          <path
            key={i}
            d={p.d}
            fill={p.fill}
            stroke="none"
            opacity={fillProgress * opacity}
          />
        );
      }
      return (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
          opacity={opacity}
        />
      );
    })}
  </>
);

export const SketchRect: React.FC<
  Common & {x: number; y: number; w: number; h: number; fill?: string; fillStyle?: "solid" | "hachure" | "cross-hatch"; radius?: number}
> = ({x, y, w, h, fill, fillStyle = "solid", radius, fillStart, ...o}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const fillP = useProgress(fillStart ?? (o.start ?? 0) + (o.dur ?? 0.45) * 0.45, 0.3, undefined);
  const paths = useMemo(
    () =>
      generator.toPaths(
        radius
          ? generator.path(
              roundedRectPath(x, y, w, h, radius),
              optionsFor(o, {fill, fillStyle}),
            )
          : generator.rectangle(x, y, w, h, optionsFor(o, {fill, fillStyle})),
      ),
    [x, y, w, h, radius, fill, fillStyle, o.seed, o.stroke, o.strokeWidth, o.roughness, o.bowing],
  );
  return <RenderPaths paths={paths} draw={p} fillProgress={fillP} opacity={o.opacity} />;
};

export const SketchLine: React.FC<Common & {x1: number; y1: number; x2: number; y2: number}> = ({
  x1,
  y1,
  x2,
  y2,
  ...o
}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const paths = useMemo(
    () => generator.toPaths(generator.line(x1, y1, x2, y2, optionsFor(o))),
    [x1, y1, x2, y2, o.seed, o.stroke, o.strokeWidth, o.roughness, o.bowing],
  );
  return <RenderPaths paths={paths} draw={p} opacity={o.opacity} />;
};

export const SketchCircle: React.FC<
  Common & {x: number; y: number; d: number; fill?: string; fillStart?: number}
> = ({x, y, d, fill, fillStart, ...o}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const fillP = useProgress(fillStart ?? (o.start ?? 0) + (o.dur ?? 0.45) * 0.45, 0.3);
  const paths = useMemo(
    () => generator.toPaths(generator.circle(x, y, d, optionsFor(o, {fill, fillStyle: "solid"}))),
    [x, y, d, fill, o.seed, o.stroke, o.strokeWidth, o.roughness, o.bowing],
  );
  return <RenderPaths paths={paths} draw={p} fillProgress={fillP} opacity={o.opacity} />;
};

export const SketchEllipse: React.FC<
  Common & {x: number; y: number; w: number; h: number; fill?: string; fillStart?: number}
> = ({x, y, w, h, fill, fillStart, ...o}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const fillP = useProgress(fillStart ?? (o.start ?? 0) + (o.dur ?? 0.45) * 0.45, 0.3);
  const paths = useMemo(
    () => generator.toPaths(generator.ellipse(x, y, w, h, optionsFor(o, {fill, fillStyle: "solid"}))),
    [x, y, w, h, fill, o.seed, o.stroke, o.strokeWidth, o.roughness, o.bowing],
  );
  return <RenderPaths paths={paths} draw={p} fillProgress={fillP} opacity={o.opacity} />;
};

export const SketchPolygon: React.FC<
  Common & {points: [number, number][]; fill?: string; fillStart?: number; close?: boolean}
> = ({points, fill, fillStart, close = true, ...o}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const fillP = useProgress(fillStart ?? (o.start ?? 0) + (o.dur ?? 0.45) * 0.45, 0.3);
  const paths = useMemo(
    () =>
      generator.toPaths(
        generator.polygon(points, optionsFor(o, {fill, fillStyle: "solid"})),
      ),
    [points, fill, o.seed, o.stroke, o.strokeWidth, o.roughness, o.bowing],
  );
  return <RenderPaths paths={paths} draw={p} fillProgress={fillP} opacity={o.opacity} />;
};

export const SketchArc: React.FC<
  Common & {x: number; y: number; w: number; h: number; startAngle: number; stopAngle: number}
> = ({x, y, w, h, startAngle, stopAngle, ...o}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const paths = useMemo(
    () =>
      generator.toPaths(
        generator.arc(x, y, w, h, startAngle, stopAngle, true, optionsFor(o)),
      ),
    [x, y, w, h, startAngle, stopAngle, o.seed, o.stroke, o.strokeWidth, o.roughness, o.bowing],
  );
  return <RenderPaths paths={paths} draw={p} opacity={o.opacity} />;
};

export const SketchPath: React.FC<Common & {d: string; fill?: string; fillStart?: number}> = ({
  d,
  fill,
  fillStart,
  ...o
}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const fillP = useProgress(fillStart ?? (o.start ?? 0) + (o.dur ?? 0.45) * 0.45, 0.3);
  const paths = useMemo(
    () => generator.toPaths(generator.path(d, optionsFor(o, {fill, fillStyle: "solid"}))),
    [d, fill, o.seed, o.stroke, o.strokeWidth, o.roughness, o.bowing],
  );
  return <RenderPaths paths={paths} draw={p} fillProgress={fillP} opacity={o.opacity} />;
};

const roundedRectPath = (x: number, y: number, w: number, h: number, r: number) =>
  `M ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} ` +
  `L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} ` +
  `L ${x + r} ${y + h} Q ${x} ${y + h} ${x} ${y + h - r} ` +
  `L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;

/* ---------- composite primitives ---------- */

export const Groundline: React.FC<{y: number; from?: number; to?: number; start?: number; stroke?: string}> = ({
  y,
  from = 180,
  to = 1740,
  start = -1,
  stroke = C.line,
}) => (
  <SketchLine
    x1={from}
    y1={y}
    x2={to}
    y2={y}
    start={start}
    dur={0.7}
    strokeWidth={4}
    stroke={stroke}
    roughness={1}
    bowing={1.6}
    seed={91}
  />
);

export const Arrow: React.FC<
  Common & {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    curve?: number;
    head?: number;
    headStart?: number;
  }
> = ({x1, y1, x2, y2, curve = 0, head = 18, headStart, ...o}) => {
  const p = useProgress(o.start, o.dur, o.progress);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const mx = (x1 + x2) / 2 + (curve ? -uy * curve : 0);
  const my = (y1 + y2) / 2 + (curve ? ux * curve : 0);
  const tip = {x: x2, y: y2};
  const a1 = Math.atan2(y2 - my, x2 - mx);
  const hx1 = x2 - head * Math.cos(a1 - 0.5);
  const hy1 = y2 - head * Math.sin(a1 - 0.5);
  const hx2 = x2 - head * Math.cos(a1 + 0.5);
  const hy2 = y2 - head * Math.sin(a1 + 0.5);
  const hp = ramp(useCurrentFrame() / FPS, headStart ?? (o.start ?? 0) + (o.dur ?? 0.45) * 0.8, 0.18);
  return (
    <g opacity={o.opacity}>
      <SketchPath d={`M ${x1} ${y1} Q ${mx} ${my} ${tip.x} ${tip.y}`} start={o.start} dur={o.dur} progress={p} stroke={o.stroke} strokeWidth={o.strokeWidth ?? 3.5} seed={o.seed ?? 31} roughness={o.roughness} />
      <SketchLine x1={tip.x} y1={tip.y} x2={hx1} y2={hy1} progress={hp} stroke={o.stroke} strokeWidth={o.strokeWidth ?? 3.5} seed={(o.seed ?? 31) + 1} />
      <SketchLine x1={tip.x} y1={tip.y} x2={hx2} y2={hy2} progress={hp} stroke={o.stroke} strokeWidth={o.strokeWidth ?? 3.5} seed={(o.seed ?? 31) + 2} />
    </g>
  );
};

export const Label: React.FC<{
  text: string | string[];
  x: number;
  y: number;
  size?: number;
  color?: string;
  weight?: number;
  align?: "center" | "left" | "right";
  start?: number;
  dur?: number;
  fade?: number;
  opacity?: number;
  maxWidth?: number;
  font?: "Caveat" | "Patrick Hand";
  letterSpacing?: number;
  lineHeight?: number;
  drift?: number;
  bg?: string;
}> = ({
  text,
  x,
  y,
  size = 48,
  color = C.fg,
  weight = 600,
  align = "center",
  start = 0,
  dur = 0.45,
  fade = 1,
  opacity = 1,
  font = "Caveat",
  letterSpacing = 0,
  lineHeight = 0.95,
  drift = 12,
  bg,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - start * fps, fps, config: {damping: 200, stiffness: 240, mass: 0.55}});
  const o = ramp(frame / fps, start, dur) * opacity * fade;
  const lines = Array.isArray(text) ? text : [text];
  const anchor = align === "center" ? "middle" : align === "left" ? "start" : "end";
  const sc = 0.96 + clamp01(s) * 0.04;
  const ty = y + (1 - clamp01(s)) * drift;
  const startY = y - ((lines.length - 1) * size * lineHeight) / 2;
  return (
    <g
      opacity={o}
      transform={`translate(${x} ${ty}) scale(${sc}) translate(${-x} ${-y})`}
    >
      <text
        x={x}
        y={startY}
        fill={color}
        stroke={bg ?? "none"}
        strokeWidth={bg ? Math.max(4, size * 0.1) : 0}
        paintOrder="stroke"
        strokeLinejoin="round"
        fontFamily={font}
        fontSize={size}
        fontWeight={weight}
        letterSpacing={letterSpacing}
        textAnchor={anchor}
        dominantBaseline="middle"
        style={{whiteSpace: "pre"}}
      >
        {lines.map((l, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : size * lineHeight}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export const Pop: React.FC<{
  start: number;
  children: React.ReactNode;
  x?: number;
  y?: number;
  scaleFrom?: number;
  duration?: number;
  opacity?: number;
}> = ({start, children, x = 0, y = 0, scaleFrom = 0.85, duration = 0.5, opacity = 1}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({
    frame: frame - start * fps,
    fps,
    config: {damping: 13, stiffness: 170, mass: 0.6},
    durationInFrames: Math.round(duration * fps),
  });
  const p = clamp01(s);
  const sc = scaleFrom + (1 - scaleFrom) * p;
  return (
    <g
      opacity={p * opacity}
      transform={`translate(${x} ${y}) scale(${sc}) translate(${-x} ${-y})`}
    >
      {children}
    </g>
  );
};
