Skip to content
Pomawka616
Glowng-Heart
Repository navigation
Code
Issues
Pull requests
Actions
Projects
Wiki
Security and quality
Insights
Settings
Files
Go to file
t
T
.github/workflows
animations
app
components
hooks
lib
cn.ts
heart-math.ts
heart-scene.ts
public
styles
.eslintrc.json
.gitignore
README.md
next-env.d.ts
next.config.ts
package-lock.json
package.json
postcss.config.js
tailwind.config.ts
tsconfig.json
video_2026-05-15_22-47-03.mp4
Glowng-Heart/lib
/
heart-scene.ts
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

No wrap
Editing heart-scene.ts file contents
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
import type { DeviceTier } from "@/hooks/use-device-tier";
import { createHeartContour, createHeartFill } from "@/lib/heart-math";

type SceneOptions = {
  reducedMotion: boolean;
  tier: DeviceTier;
};

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  randomX: number;
  randomY: number;
  size: number;
  alpha: number;
  depth: number;
  phase: number;
  speed: number;
  rotation: number;
  targetAlpha: number;
  text: string;
};

type Spark = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
};

const QUALITY_MAP: Record<DeviceTier, { textCount: number; sparks: number }> = {
  low: { textCount: 180, sparks: 12 },
  medium: { textCount: 260, sparks: 16 },
  high: { textCount: 380, sparks: 20 }
};

const COPY = ["I love you"];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function createHeartScene(
  canvas: HTMLCanvasElement,
  options: SceneOptions
) {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context is required.");
  }
  const ctx = context;

  const quality = QUALITY_MAP[options.tier];

  let width = 0;
  let height = 0;
  let raf = 0;
  let startTime = 0;

Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
 
