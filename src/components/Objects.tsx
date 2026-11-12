import React from "react";
import {C} from "../theme";
import {
  Arrow,
  Label,
  SketchArc,
  SketchCircle,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
} from "./Sketch";

/* ---------- reusable drawn objects ---------- */

export const GPU: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  fill?: string;
  fans?: number;
  label?: string;
  seed?: number;
}> = ({x, y, w = 300, h = 130, start = -1, color = C.fg, fill = C.panel, fans = 2, label, seed = 11}) => {
  const r = h * 0.22;
  const fanY = y + h / 2;
  const gap = w / (fans + 1);
  return (
    <g>
      <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.55} stroke={color} fill={fill} radius={10} seed={seed} strokeWidth={4} />
      {Array.from({length: fans}).map((_, i) => (
        <g key={i}>
          <SketchCircle x={x + gap * (i + 1)} y={fanY} d={h * 0.58} start={start + 0.18 + i * 0.1} dur={0.4} stroke={color} seed={seed + 3 + i} strokeWidth={3} />
          <SketchCircle x={x + gap * (i + 1)} y={fanY} d={h * 0.25} start={start + 0.3 + i * 0.1} dur={0.3} stroke={C.soft} seed={seed + 8 + i} strokeWidth={2.5} />
        </g>
      ))}
      <SketchLine x1={x + w - 14} y1={y + h - 14} x2={x + w - 14} y2={y + 14} start={start + 0.4} dur={0.3} stroke={C.soft} strokeWidth={4} seed={seed + 20} />
      {label ? (
        <Label text={label} x={x + w / 2} y={y - 26} size={42} color={C.soft} start={start + 0.35} />
      ) : null}
    </g>
  );
};

export const RAMSticks: React.FC<{
  x: number;
  y: number;
  count?: number;
  height?: number;
  start?: number;
  color?: string;
  fill?: string;
  seed?: number;
}> = ({x, y, count = 4, height = 210, start = -1, color = C.fg, fill = C.panel, seed = 41}) => (
  <g>
    {Array.from({length: count}).map((_, i) => (
      <SketchRect
        key={i}
        x={x + i * 34}
        y={y - i * 9}
        w={26}
        h={height}
        start={start + i * 0.09}
        dur={0.4}
        stroke={color}
        fill={fill}
        radius={4}
        seed={seed + i}
        strokeWidth={3}
      />
    ))}
  </g>
);

export const ModelStack: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  layers?: number;
  start?: number;
  color?: string;
  fill?: string;
  label?: string;
  labelSize?: number;
  seed?: number;
}> = ({x, y, w = 240, h = 260, layers = 5, start = -1, color = C.fg, fill = C.panel, label, labelSize = 64, seed = 61}) => {
  const gap = 12;
  const lh = (h - gap * (layers - 1)) / layers;
  return (
    <g>
      {Array.from({length: layers}).map((_, i) => (
        <SketchRect
          key={i}
          x={x + (i % 2 === 0 ? 0 : 5)}
          y={y + i * (lh + gap)}
          w={w - (i % 2 === 0 ? 0 : 10)}
          h={lh}
          start={start + i * 0.08}
          dur={0.35}
          stroke={color}
          fill={fill}
          radius={4}
          seed={seed + i}
          strokeWidth={3.2}
        />
      ))}
      {label ? (
        <Label text={label} x={x + w / 2} y={y + h / 2} size={labelSize} color={color} start={start + 0.35} bg={fill === "none" ? undefined : C.panel} />
      ) : null}
    </g>
  );
};

export const PCTower: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  fill?: string;
  label?: string;
  seed?: number;
}> = ({x, y, w = 220, h = 380, start = -1, color = C.fg, fill = C.panel, label, seed = 81}) => (
  <g>
    <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.55} stroke={color} fill={fill} radius={14} seed={seed} strokeWidth={4} />
    <SketchRect x={x + 24} y={y + 28} w={w - 48} h={h * 0.5} start={start + 0.2} dur={0.45} stroke={C.soft} fill={C.well} radius={6} seed={seed + 2} strokeWidth={2.5} />
    <SketchLine x1={x + 40} y1={y + 72} x2={x + w - 40} y2={y + 72} start={start + 0.35} dur={0.3} stroke={C.fg} strokeWidth={8} seed={seed + 5} />
    <SketchCircle x={x + w / 2} y={y + h * 0.72} d={54} start={start + 0.4} dur={0.35} stroke={C.soft} seed={seed + 7} strokeWidth={2.5} />
    <SketchCircle x={x + w / 2} y={y + h * 0.9} d={16} start={start + 0.5} dur={0.2} stroke={C.green} fill={C.green} seed={seed + 9} strokeWidth={2} />
    {label ? <Label text={label} x={x + w / 2} y={y - 30} size={42} color={C.soft} start={start + 0.3} /> : null}
  </g>
);

export const Building: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  fill?: string;
  rows?: number;
  cols?: number;
  door?: boolean;
  seed?: number;
}> = ({x, y, w = 420, h = 440, start = -1, color = C.fg, fill = C.panel, rows = 4, cols = 5, door = true, seed = 101}) => {
  const winW = Math.min(46, (w - 80) / cols - 18);
  const winH = winW * 0.8;
  const gapX = (w - 60 - winW * cols) / Math.max(1, cols - 1);
  const gapY = (h - 90 - winH * rows) / Math.max(1, rows);
  return (
    <g>
      <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.6} stroke={color} fill={fill} radius={4} seed={seed} strokeWidth={4} />
      {Array.from({length: rows}).map((_, r) =>
        Array.from({length: cols}).map((_, c) => (
          <SketchRect
            key={`${r}-${c}`}
            x={x + 30 + c * (winW + gapX)}
            y={y + 28 + r * (winH + gapY)}
            w={winW}
            h={winH}
            start={start + 0.25 + (r * cols + c) * 0.012}
            dur={0.25}
            stroke={C.soft}
            fill={C.well}
            seed={seed + 10 + r * cols + c}
            strokeWidth={2}
          />
        )),
      )}
      {door ? (
        <SketchRect x={x + w / 2 - 34} y={y + h - 88} w={68} h={88} start={start + 0.5} dur={0.3} stroke={C.fg} fill={C.well} seed={seed + 60} strokeWidth={3} />
      ) : null}
    </g>
  );
};

export const StickFigure: React.FC<{
  x: number;
  y: number;
  scale?: number;
  start?: number;
  color?: string;
  phone?: boolean;
  hat?: boolean;
  seed?: number;
}> = ({x, y, scale = 1, start = -1, color = C.fg, phone = false, hat = false, seed = 121}) => {
  const s = scale;
  const headR = 30 * s;
  const headY = y - 150 * s;
  const neckY = headY + headR + 4 * s;
  const hipY = y - 62 * s;
  const armY = y - 108 * s;
  return (
    <g>
      <SketchCircle x={x} y={headY} d={headR * 2} start={start + 0.12} dur={0.35} stroke={color} seed={seed} strokeWidth={3.4} />
      <SketchLine x1={x} y1={neckY} x2={x} y2={hipY} start={start + 0.24} dur={0.28} stroke={color} strokeWidth={3.4} seed={seed + 1} />
      <SketchLine x1={x} y1={armY} x2={x - 38 * s} y2={armY + 46 * s} start={start + 0.33} dur={0.25} stroke={color} strokeWidth={3.4} seed={seed + 2} />
      <SketchLine x1={x} y1={armY} x2={x + 38 * s} y2={armY + 46 * s} start={start + 0.38} dur={0.25} stroke={color} strokeWidth={3.4} seed={seed + 3} />
      <SketchLine x1={x} y1={hipY} x2={x - 28 * s} y2={y} start={start + 0.43} dur={0.25} stroke={color} strokeWidth={3.4} seed={seed + 4} />
      <SketchLine x1={x} y1={hipY} x2={x + 28 * s} y2={y} start={start + 0.47} dur={0.25} stroke={color} strokeWidth={3.4} seed={seed + 5} />
      <SketchCircle x={x - 10 * s} y={headY - 3 * s} d={3.2 * s} start={start + 0.4} dur={0.12} stroke={color} fill={color} seed={seed + 6} strokeWidth={1.6} />
      <SketchCircle x={x + 10 * s} y={headY - 3 * s} d={3.2 * s} start={start + 0.42} dur={0.12} stroke={color} fill={color} seed={seed + 7} strokeWidth={1.6} />
      {hat ? (
        <>
          <SketchLine x1={x - 34 * s} y1={headY - headR + 2 * s} x2={x + 34 * s} y2={headY - headR + 2 * s} start={start + 0.46} dur={0.2} stroke={color} strokeWidth={3} seed={seed + 8} />
          <SketchRect x={x - 22 * s} y={headY - headR - 26 * s} w={44 * s} h={28 * s} start={start + 0.48} dur={0.22} stroke={color} fill={C.panel} seed={seed + 9} strokeWidth={2.6} />
        </>
      ) : null}
      {phone ? (
        <SketchRect x={x + 34 * s} y={armY + 26 * s} w={22 * s} h={38 * s} start={start + 0.52} dur={0.2} stroke={C.cyan} fill={C.well} seed={seed + 10} strokeWidth={2} />
      ) : null}
    </g>
  );
};

export const Cloud: React.FC<{x: number; y: number; w?: number; h?: number; start?: number; color?: string; seed?: number}> = ({
  x,
  y,
  w = 240,
  h = 150,
  start = -1,
  color = C.soft,
  seed = 141,
}) => {
  const d =
    `M ${x + 0.18 * w} ${y + 0.78 * h} ` +
    `C ${x - 0.02 * w} ${y + 0.78 * h}, ${x - 0.02 * w} ${y + 0.42 * h}, ${x + 0.2 * w} ${y + 0.44 * h} ` +
    `C ${x + 0.12 * w} ${y + 0.08 * h}, ${x + 0.48 * w} ${y + 0.0 * h}, ${x + 0.54 * w} ${y + 0.3 * h} ` +
    `C ${x + 0.66 * w} ${y + 0.05 * h}, ${x + 0.94 * w} ${y + 0.16 * h}, ${x + 0.86 * w} ${y + 0.44 * h} ` +
    `C ${x + 1.02 * w} ${y + 0.48 * h}, ${x + 1.0 * w} ${y + 0.78 * h}, ${x + 0.82 * w} ${y + 0.78 * h} Z`;
  return <SketchPath d={d} start={start} dur={0.6} stroke={color} strokeWidth={3.4} seed={seed} fill={C.panel} fillStart={start + 0.3} />;
};

export const Cross: React.FC<{x: number; y: number; size?: number; start?: number; color?: string}> = ({
  x,
  y,
  size = 34,
  start = -1,
  color = C.red,
}) => (
  <g>
    <SketchLine x1={x - size / 2} y1={y - size / 2} x2={x + size / 2} y2={y + size / 2} start={start} dur={0.25} stroke={color} strokeWidth={5} seed={151} />
    <SketchLine x1={x + size / 2} y1={y - size / 2} x2={x - size / 2} y2={y + size / 2} start={start + 0.08} dur={0.25} stroke={color} strokeWidth={5} seed={152} />
  </g>
);

export const Check: React.FC<{x: number; y: number; size?: number; start?: number; color?: string}> = ({
  x,
  y,
  size = 34,
  start = -1,
  color = C.green,
}) => (
  <SketchPath
    d={`M ${x - size / 2} ${y} L ${x - size * 0.1} ${y + size * 0.45} L ${x + size / 2} ${y - size * 0.45}`}
    start={start}
    dur={0.35}
    stroke={color}
    strokeWidth={5}
    seed={161}
  />
);

export const Panel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  start?: number;
  fill?: string;
  stroke?: string;
  radius?: number;
  seed?: number;
  children?: React.ReactNode;
  opacity?: number;
}> = ({x, y, w, h, start = -1, fill = C.panel, stroke = C.line, radius = 12, seed = 171, children, opacity = 1}) => (
  <g opacity={opacity}>
    <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.5} stroke={stroke} fill={fill} radius={radius} seed={seed} strokeWidth={3} />
    {children}
  </g>
);

export const Bar: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  value: number; // 0..1
  start?: number;
  color?: string;
  track?: string;
  fill?: string;
}> = ({x, y, w, h = 26, value, start = -1, color = C.green, track = C.well, fill}) => {
  const v = Math.max(0, Math.min(1, value));
  return (
    <g>
      <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.4} stroke={C.line} fill={track} radius={h / 2} seed={181} strokeWidth={2.5} />
      {v > 0.01 ? (
        <SketchRect x={x + 3} y={y + 3} w={Math.max(6, (w - 6) * v)} h={h - 6} start={start + 0.2} dur={0.5} stroke={fill ? color : "none"} fill={fill ?? color} radius={(h - 6) / 2} seed={182} strokeWidth={2} />
      ) : null}
    </g>
  );
};

export const Gauge: React.FC<{
  x: number;
  y: number;
  r?: number;
  value: number; // 0..1
  start?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}> = ({x, y, r = 90, value, start = -1, color = C.green, label, sublabel}) => {
  const angle = -110 + Math.max(0, Math.min(1, value)) * 220;
  return (
    <g>
      <SketchArc x={x} y={y} w={r * 2} h={r * 2} startAngle={-200} stopAngle={20} start={start} dur={0.55} stroke={C.soft} strokeWidth={5} seed={191} />
      <SketchArc x={x} y={y} w={r * 2} h={r * 2} startAngle={-200} stopAngle={-200 + 220 * Math.max(0.02, Math.min(1, value))} start={start + 0.2} dur={0.6} stroke={color} strokeWidth={6} seed={192} />
      <g transform={`rotate(${angle} ${x} ${y})`}>
        <SketchLine x1={x} y1={y} x2={x + r * 0.72} y2={y} start={start + 0.35} dur={0.35} stroke={C.fg} strokeWidth={4} seed={193} />
      </g>
      <SketchCircle x={x} y={y} d={12} start={start + 0.3} dur={0.2} stroke={C.fg} fill={C.fg} seed={194} strokeWidth={2} />
      {label ? <Label text={label} x={x} y={y + r * 0.55} size={56} color={C.fg} start={start + 0.4} /> : null}
      {sublabel ? <Label text={sublabel} x={x} y={y + r * 0.55 + 54} size={38} color={C.soft} start={start + 0.5} /> : null}
    </g>
  );
};

export const WindowCard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title?: string;
  start?: number;
  seed?: number;
  children?: React.ReactNode;
}> = ({x, y, w, h, title, start = -1, seed = 201, children}) => (
  <g>
    <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.5} stroke={C.line} fill={C.well} radius={14} seed={seed} strokeWidth={3} />
    <SketchLine x1={x} y1={y + 52} x2={x + w} y2={y + 52} start={start + 0.2} dur={0.4} stroke={C.line} strokeWidth={2.5} seed={seed + 1} />
    {[0, 1, 2].map((i) => (
      <SketchCircle key={i} x={x + 28 + i * 26} y={y + 26} d={12} start={start + 0.25 + i * 0.05} dur={0.2} stroke={C.soft} fill={C.soft} seed={seed + 3 + i} strokeWidth={1.6} />
    ))}
    {title ? <Label text={title} x={x + 130} y={y + 28} size={38} color={C.soft} align="left" start={start + 0.3} /> : null}
    {children}
  </g>
);

export const LayersMotif: React.FC<{x: number; y: number; start?: number; color?: string}> = ({x, y, start = -1, color = C.purple}) => (
  <g>
    <SketchPolygon points={[[x, y + 70], [x + 90, y + 25], [x + 180, y + 70], [x + 90, y + 115]]} start={start} dur={0.5} stroke={color} fill={C.panel} seed={211} strokeWidth={3.5} />
    <SketchPolygon points={[[x, y + 110], [x + 90, y + 65], [x + 180, y + 110], [x + 90, y + 155]]} start={start + 0.12} dur={0.5} stroke={color} fill={C.panel} seed={212} strokeWidth={3.5} />
    <SketchPolygon points={[[x, y + 150], [x + 90, y + 105], [x + 180, y + 150], [x + 90, y + 195]]} start={start + 0.24} dur={0.5} stroke={color} fill={C.panel} seed={213} strokeWidth={3.5} />
  </g>
);

export const CloudCrossed: React.FC<{x: number; y: number; w?: number; start?: number; opacity?: number}> = ({x, y, w = 240, start = -1, opacity = 1}) => (
  <g opacity={opacity}>
    <Cloud x={x} y={y} w={w} start={start} color={C.soft} />
    <Cross x={x + w / 2} y={y + 70} size={80} start={start + 0.45} />
  </g>
);

export const MiniComputer: React.FC<{x: number; y: number; start?: number; color?: string}> = ({x, y, start = -1, color = C.fg}) => (
  <g>
    <SketchRect x={x} y={y} w={120} h={78} start={start} dur={0.4} stroke={color} fill={C.panel} radius={6} seed={221} strokeWidth={3} />
    <SketchRect x={x + 8} y={y + 8} w={104} h={62} start={start + 0.15} dur={0.3} stroke={C.soft} fill={C.well} seed={222} strokeWidth={2} />
    <SketchLine x1={x + 40} y1={y + 96} x2={x + 80} y2={y + 96} start={start + 0.3} dur={0.2} stroke={color} strokeWidth={3} seed={223} />
    <SketchLine x1={x + 60} y1={y + 78} x2={x + 60} y2={y + 96} start={start + 0.35} dur={0.2} stroke={color} strokeWidth={3} seed={224} />
  </g>
);

export const CardinalArrow: React.FC<{x: number; y: number; start?: number; dir?: "up" | "down" | "left" | "right"; color?: string}> = ({
  x,
  y,
  start = -1,
  dir = "right",
  color = C.fg,
}) => {
  const map = {
    right: [x - 26, y, x + 26, y],
    left: [x + 26, y, x - 26, y],
    up: [x, y + 26, x, y - 26],
    down: [x, y - 26, x, y + 26],
  }[dir];
  return <Arrow x1={map[0]} y1={map[1]} x2={map[2]} y2={map[3]} start={start} dur={0.3} stroke={color} strokeWidth={3.5} head={10} seed={231} />;
};
