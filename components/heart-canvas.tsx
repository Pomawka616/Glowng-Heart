"use client";

import { useEffect, useRef } from "react";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { createHeartScene } from "@/lib/heart-scene";

type HeartCanvasProps = {
  reducedMotion: boolean;
};

export function HeartCanvas({ reducedMotion }: HeartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tier = useDeviceTier(reducedMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const scene = createHeartScene(canvas, {
      reducedMotion,
      tier
    });

    scene.start();
    return () => scene.dispose();
  }, [reducedMotion, tier]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
      aria-hidden="true"
    />
  );
}
