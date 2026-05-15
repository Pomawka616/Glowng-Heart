"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AmbientOverlays } from "@/components/ambient-overlays";
import { HeartCanvas } from "@/components/heart-canvas";
import { IntroCopy } from "@/components/intro-copy";
import { LoadingCurtain } from "@/components/loading-curtain";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";

export function LandingExperience() {
  const reducedMotion = useReducedMotion();
  const { x, y, rotateX, rotateY } = usePointerParallax();

  return (
    <main className="scene-shell relative min-h-screen overflow-hidden bg-canvas">
      <LoadingCurtain />
      <HeartCanvas reducedMotion={Boolean(reducedMotion)} />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          x,
          y,
          rotateX,
          rotateY,
          transformPerspective: 1600
        }}
      >
        <AmbientOverlays />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <IntroCopy reducedMotion={Boolean(reducedMotion)} />
        </div>
      </motion.div>
    </main>
  );
}
