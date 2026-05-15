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

  const contour = createHeartContour(
    Math.max(quality.textCount, 240)
  );
  const fill = createHeartFill(quality.textCount);

  const particles: Particle[] = fill.map((p, i) => {
    const anchor = contour[i % contour.length];
    return {
      x: (Math.random() * 2 - 1) * 1.4,
      y: (Math.random() * 2 - 1) * 1.4,
      baseX: anchor.x,
      baseY: anchor.y,
      randomX: (Math.random() * 2 - 1) * 0.05,
      randomY: (Math.random() * 2 - 1) * 0.05,
      size: 10 + Math.random() * 10,
      alpha: 0,
      depth: 0.5 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.6,
      rotation: (Math.random() * 2 - 1) * 0.03,
      targetAlpha: 0.5 + Math.random() * 0.5,
      text: COPY[0]
    };
  });

  const sparks: Spark[] = Array.from({ length: quality.sparks }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: 1 + Math.random() * 2,
    speed: 0.2 + Math.random() * 0.4,
    alpha: 0.1 + Math.random() * 0.2
  }));

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;

    canvas.width = width;
    canvas.height = height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function render(now: number) {
    if (!startTime) startTime = now;

    const t = (now - startTime) / 1000;
    const breathe = 1 + Math.sin(t * 1.5) * 0.03;

    const mobile = width < 768;
    const heartSize = Math.min(width, height) * (mobile ? 0.34 : 0.31);
    const centerX = width * 0.5;
    const centerY = height * 0.55;

    ctx.clearRect(0, 0, width, height);

    ctx.globalCompositeOperation = "lighter";

    sparks.forEach((s) => {
      s.y -= s.speed * 0.0015;
      if (s.y < 0) s.y = 1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,80,120,${s.alpha})`;
      ctx.arc(s.x * width, s.y * height, s.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    particles.forEach((p) => {
      const time = t * p.speed + p.phase;

      const targetX =
        p.baseX * breathe + Math.cos(time) * 0.04 * p.depth;
      const targetY =
        p.baseY * breathe + Math.sin(time) * 0.04 * p.depth;

      p.x = lerp(p.x, targetX, 0.08);
      p.y = lerp(p.y, targetY, 0.08);
      p.alpha = lerp(p.alpha, p.targetAlpha, 0.05);

      const x = centerX + p.x * heartSize;
      const y = centerY - p.y * heartSize;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.rotation);

      ctx.font = `600 ${p.size}px Inter, Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `rgba(255,70,110,${clamp(p.alpha, 0.2, 1)})`;

      ctx.shadowBlur = 0;

      ctx.fillText(p.text, 0, 0);
      ctx.restore();
    });

    raf = requestAnimationFrame(render);
  }

  return {
    start() {
      resize();
      window.addEventListener("resize", resize);
      raf = requestAnimationFrame(render);
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    }
  };
}
