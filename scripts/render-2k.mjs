#!/usr/bin/env node
/**
 * Render Strata in 2K (2560x1440) with realtime machine-readable progress.
 *
 * Usage:
 *   node scripts/render-2k.mjs [output.mp4] [scale] [concurrency]
 *
 * Progress lines:
 *   @@BUNDLE@@  <percent>
 *   @@META@@    <json>
 *   @@PROGRESS@@<json>
 *   @@DONE@@    <json>
 *   @@ERROR@@   <json>
 */
import {bundle} from "@remotion/bundler";
import {ensureBrowser, renderMedia, selectComposition} from "@remotion/renderer";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [, , outputArg, scaleArg, concurrencyArg] = process.argv;
const output = path.resolve(outputArg || "out/strata-2k.mp4");
const rawScale = scaleArg ? Number(scaleArg) : 2560 / 1920;
// 1080p -> 1440p scale must stay exact so the stitcher gets integer dimensions.
const scale = Math.abs(rawScale - 4 / 3) < 1e-6 ? 4 / 3 : rawScale;
const concurrency = concurrencyArg
  ? Number(concurrencyArg)
  : Math.max(1, Math.min(4, os.cpus().length));
const compositionId = process.env.REMOTION_COMPOSITION || "StrataExplainer";
const frameRange = process.env.FRAME_RANGE
  ? process.env.FRAME_RANGE.split("-").map((n) => Number(n.trim()))
  : null;
const muted = process.env.MUTED === "1";
const progressFile = process.env.RENDER_PROGRESS_FILE || `${output}.progress.json`;

fs.mkdirSync(path.dirname(output), {recursive: true});

const writeProgress = (data) => {
  try {
    fs.writeFileSync(progressFile, JSON.stringify(data, null, 2));
  } catch (err) {
    // Progress logging must never kill the render.
  }
};

const fmtEta = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "--";
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m ${sec}s`;
};

async function main() {
  console.log(`[render] output=${output}`);
  console.log(`[render] scale=${scale.toFixed(6)}`);
  console.log(`[render] concurrency=${concurrency}`);
  console.log(`[render] composition=${compositionId}`);
  if (frameRange) console.log(`[render] frameRange=${frameRange.join("-")}`);
  if (muted) console.log("[render] audio muted");

  console.log("[browser] ensuring Remotion headless browser...");
  const browser = await ensureBrowser();
  console.log(`[browser] ${browser.type}${browser.path ? ` (${browser.path})` : ""}`);

  let lastBundle = -10;
  console.log("[bundle] bundling project...");
  const serveUrl = await bundle({
    entryPoint: path.resolve("src/index.ts"),
    publicDir: path.resolve("public"),
    onProgress: (value) => {
      const pct = Math.round(value <= 1 ? value * 100 : value);
      if (pct >= lastBundle + 10 || pct === 100) {
        console.log(`@@BUNDLE@@ ${pct}`);
        lastBundle = pct;
      }
    },
  });
  console.log(`[bundle] ready: ${serveUrl}`);

  const composition = await selectComposition({serveUrl, id: compositionId});
  const totalFrames = composition.durationInFrames;
  const outWidth = Math.round(composition.width * scale);
  const outHeight = Math.round(composition.height * scale);

  console.log(
    `[render] ${composition.width}x${composition.height} -> ${outWidth}x${outHeight} @ ${composition.fps}fps, ${totalFrames} frames`,
  );
  console.log(
    `@@META@@${JSON.stringify({
      output,
      compositionId,
      sourceWidth: composition.width,
      sourceHeight: composition.height,
      width: outWidth,
      height: outHeight,
      fps: composition.fps,
      durationInFrames: totalFrames,
      scale,
      concurrency,
    })}`,
  );

  const startedAt = Date.now();
  let lastLoggedAt = 0;
  let lastPct = -1;

  const report = (p) => {
    const now = Date.now();
    const pct = Math.max(0, Math.min(100, p.progress * 100));
    const elapsed = (now - startedAt) / 1000;
    const renderFps = p.renderedFrames > 0 ? p.renderedFrames / Math.max(elapsed, 1) : 0;
    const eta = renderFps > 0 ? (totalFrames - p.renderedFrames) / renderFps : null;
    const payload = {
      progress: p.progress,
      percent: Number(pct.toFixed(2)),
      renderedFrames: p.renderedFrames,
      encodedFrames: p.encodedFrames,
      totalFrames,
      renderFps: Number(renderFps.toFixed(2)),
      etaSeconds: eta === null ? null : Number(eta.toFixed(1)),
      eta: fmtEta(eta),
      stage: p.stitchStage,
      elapsedSeconds: Number(elapsed.toFixed(1)),
    };

    if (pct - lastPct >= 0.2 || now - lastLoggedAt >= 2500 || pct >= 99.95) {
      console.log(`@@PROGRESS@@${JSON.stringify(payload)}`);
      writeProgress({...payload, updatedAt: new Date().toISOString()});
      lastLoggedAt = now;
      lastPct = pct;
    }
  };

  await renderMedia({
    composition,
    serveUrl,
    outputLocation: output,
    codec: "h264",
    scale,
    concurrency,
    crf: 18,
    x264Preset: "fast",
    pixelFormat: "yuv420p",
    imageFormat: "jpeg",
    jpegQuality: 90,
    audioCodec: "aac",
    audioBitrate: "320k",
    overwrite: true,
    muted,
    frameRange,
    timeoutInMilliseconds: 120000,
    onProgress: report,
  });

  const stat = fs.statSync(output);
  const done = {
    output,
    bytes: stat.size,
    megabytes: Number((stat.size / 1024 / 1024).toFixed(1)),
    width: outWidth,
    height: outHeight,
    fps: composition.fps,
    durationInFrames: totalFrames,
    elapsedSeconds: Number(((Date.now() - startedAt) / 1000).toFixed(1)),
  };
  console.log(`@@DONE@@${JSON.stringify(done)}`);
}

main().catch((err) => {
  const message = err?.stack || String(err);
  console.error(`@@ERROR@@${JSON.stringify({message})}`);
  process.exitCode = 1;
});
