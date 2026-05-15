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
  hueShift: number;
  phase: number;
  speed: number;
  rotation: number;
  targetAlpha: number;
  glow: number;
  text: string;
};

type Spark = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
  drift: number;
};

type Ripple = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
};

const QUALITY_MAP: Record<DeviceTier, { textCount: number; sparks: number; pixelRatio: number }> = {
  low: { textCount: 260, sparks: 18, pixelRatio: 1.15 },
  medium: { textCount: 430, sparks: 28, pixelRatio: 1.35 },
  high: { textCount: 640, sparks: 36, pixelRatio: 1.55 }
};

const COPY = ["I love you", "I love you", "I love you", "I love you"];

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function createHeartScene(canvas: HTMLCanvasElement, options: SceneOptions) {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("2D canvas context is required.");
  }

  const ctx = context;

  const quality = QUALITY_MAP[options.tier];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let resizeFrame = 0;
  let startTime = 0;

  const pointer = {
    x: 0,
    y: 0,
    active: false,
    strength: 0
  };

  const contour = createHeartContour(Math.max(quality.textCount, 320));
  const fill = createHeartFill(quality.textCount);
  const particles: Particle[] = fill.map((point, index) => {
    const contourPoint = contour[index % contour.length];
    const anchor = index % 4 === 0 ? contourPoint : point;
    return {
      x: (Math.random() * 2 - 1) * 1.45,
      y: (Math.random() * 2 - 1) * 1.45,
      baseX: anchor.x,
      baseY: anchor.y,
      randomX: (Math.random() * 2 - 1) * 0.06,
      randomY: (Math.random() * 2 - 1) * 0.06,
      size: 10 + Math.random() * 14 + (index % 4 === 0 ? 5 : 0),
      alpha: 0,
      depth: 0.4 + Math.random() * 0.9,
      hueShift: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.65 + Math.random() * 0.8,
      rotation: (Math.random() * 2 - 1) * 0.045,
      targetAlpha: 0.35 + Math.random() * 0.65,
      glow: 10 + Math.random() * 28,
      text: COPY[index % COPY.length]
    };
  });

  const sparks: Spark[] = Array.from({ length: quality.sparks }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: 0.6 + Math.random() * 2.4,
    speed: 0.2 + Math.random() * 0.7,
    alpha: 0.08 + Math.random() * 0.25,
    drift: (Math.random() * 2 - 1) * 0.08
  }));

  const ripples: Ripple[] = [];

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    dpr = Math.min(window.devicePixelRatio || 1, quality.pixelRatio);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function addRipple(clientX: number, clientY: number) {
    ripples.push({
      x: clientX,
      y: clientY,
      life: 0,
      maxLife: 58
    });
  }

  function updatePointer(clientX: number, clientY: number, active: boolean) {
    pointer.x = clientX;
    pointer.y = clientY;
    pointer.active = active;
    pointer.strength = active ? 1 : 0;
  }

  // The render loop avoids React state entirely so we keep motion silky on low-power devices too.
  function render(now: number) {
    if (!startTime) {
      startTime = now;
    }

    const elapsed = (now - startTime) / 1000;
    const intro = options.reducedMotion ? 1 : clamp(elapsed / 2.4, 0, 1);
    const breathe = Math.sin(elapsed * 1.45) * 0.035 + 1;
    const mobile = width < 768;
    const heartSize = Math.min(width, height) * (mobile ? 0.34 : 0.31);
    const centerX = width * 0.5;
    const centerY = height * (mobile ? 0.56 : 0.54);

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const aura = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      heartSize * 1.1
    );
    aura.addColorStop(0, `rgba(255, 72, 120, ${0.12 + intro * 0.08})`);
    aura.addColorStop(0.45, `rgba(255, 48, 94, ${0.08 + intro * 0.06})`);
    aura.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(centerX, centerY, heartSize * 1.1, 0, Math.PI * 2);
    ctx.fill();

    sparks.forEach((spark) => {
      spark.y -= spark.speed * (options.reducedMotion ? 0.0006 : 0.0016);
      spark.x += Math.sin(elapsed * spark.speed + spark.drift) * 0.0007;

      if (spark.y < -0.08) {
        spark.y = 1.08;
        spark.x = Math.random();
      }

      const sparkX = spark.x * width;
      const sparkY = spark.y * height;
      const radius = spark.radius * (mobile ? 0.9 : 1.2);

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 96, 132, ${spark.alpha * intro})`;
      ctx.shadowColor = "rgba(255, 72, 112, 0.8)";
      ctx.shadowBlur = 18;
      ctx.arc(sparkX, sparkY, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    particles.forEach((particle, index) => {
      const time = elapsed * particle.speed + particle.phase;
      const driftX = Math.cos(time * 1.4) * 0.04 * particle.depth + particle.randomX;
      const driftY = Math.sin(time) * 0.05 * particle.depth + particle.randomY;
      const targetX = particle.baseX * breathe + driftX;
      const targetY = particle.baseY * breathe + driftY;
      const assembleRate = options.reducedMotion ? 0.22 : 0.04;
      const scatterRate = options.reducedMotion ? 0.1 : 0.028;

      particle.x = lerp(
        particle.x,
        intro > 0.96 ? targetX : lerp(particle.x, targetX, intro),
        intro < 1 ? scatterRate + intro * assembleRate : 0.08
      );
      particle.y = lerp(
        particle.y,
        intro > 0.96 ? targetY : lerp(particle.y, targetY, intro),
        intro < 1 ? scatterRate + intro * assembleRate : 0.08
      );
      particle.alpha = lerp(
        particle.alpha,
        particle.targetAlpha * (0.66 + Math.sin(time * 1.3 + index) * 0.08),
        0.08
      );

      const canvasX = centerX + particle.x * heartSize;
      const canvasY = centerY - particle.y * heartSize;

      let pointerForce = 0;
      if (pointer.active) {
        const deltaX = canvasX - pointer.x;
        const deltaY = canvasY - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);
        const radius = mobile ? 120 : 180;
        if (distance < radius) {
          pointerForce = (1 - distance / radius) * 18;
          particle.x += (deltaX / Math.max(distance, 1)) * 0.0015 * pointerForce;
          particle.y -= (deltaY / Math.max(distance, 1)) * 0.0015 * pointerForce;
        }
      }

      const fontSize = particle.size * (mobile ? 0.85 : 1);
      const flicker = 0.88 + Math.sin(time * 2.4 + index * 0.12) * 0.12;
      const alpha = clamp(particle.alpha * flicker + pointerForce * 0.006, 0.18, 0.96);

      ctx.save();
      ctx.translate(canvasX, canvasY);
      ctx.rotate(particle.rotation + Math.sin(time * 0.5) * 0.018);
      ctx.font = `600 ${fontSize}px Inter, Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle =
        particle.hueShift > 0.6
          ? `rgba(255, 118, 180, ${alpha})`
          : `rgba(255, 72, 103, ${alpha})`;
      ctx.shadowColor =
        particle.hueShift > 0.6
          ? "rgba(255, 108, 178, 0.92)"
          : "rgba(255, 56, 96, 0.95)";
      ctx.shadowBlur = particle.glow + pointerForce;
      ctx.fillText(particle.text, 0, 0);
      ctx.restore();
    });

    for (let index = ripples.length - 1; index >= 0; index -= 1) {
      const ripple = ripples[index];
      ripple.life += 1;
      const progress = ripple.life / ripple.maxLife;
      const alpha = (1 - progress) * 0.2;
      const radius = 18 + progress * (mobile ? 90 : 120);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 108, 164, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 26;
      ctx.shadowColor = "rgba(255, 86, 128, 0.7)";
      ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
      ctx.stroke();

      if (progress >= 1) {
        ripples.splice(index, 1);
      }
    }

    ctx.restore();
    raf = window.requestAnimationFrame(render);
  }

  const onResize = () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(resize);
  };

  const onPointerMove = (event: PointerEvent) => {
    updatePointer(event.clientX, event.clientY, true);
  };

  const onPointerLeave = () => {
    updatePointer(width * 0.5, height * 0.5, false);
  };

  const onPointerDown = (event: PointerEvent) => {
    addRipple(event.clientX, event.clientY);
    updatePointer(event.clientX, event.clientY, true);
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    addRipple(touch.clientX, touch.clientY);
    updatePointer(touch.clientX, touch.clientY, true);
  };

  return {
    start() {
      resize();
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      raf = window.requestAnimationFrame(render);
    },
    dispose() {
      window.cancelAnimationFrame(raf);
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchstart", onTouchStart);
    }
  };
}
