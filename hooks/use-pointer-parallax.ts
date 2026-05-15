"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function usePointerParallax() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(useTransform(rawX, [-1, 1], [-12, 12]), {
    stiffness: 110,
    damping: 20,
    mass: 0.2
  });
  const y = useSpring(useTransform(rawY, [-1, 1], [-12, 12]), {
    stiffness: 110,
    damping: 20,
    mass: 0.2
  });
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [5, -5]), {
    stiffness: 110,
    damping: 20,
    mass: 0.2
  });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-5, 5]), {
    stiffness: 110,
    damping: 20,
    mass: 0.2
  });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const nextX = (event.clientX / window.innerWidth) * 2 - 1;
      const nextY = (event.clientY / window.innerHeight) * 2 - 1;
      rawX.set(nextX);
      rawY.set(nextY);
    };

    const onPointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    const onDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) {
        return;
      }

      rawX.set(Math.max(-1, Math.min(1, event.gamma / 30)));
      rawY.set(Math.max(-1, Math.min(1, event.beta / 45)));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("deviceorientation", onDeviceOrientation, {
      passive: true
    });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    };
  }, [rawX, rawY]);

  return { x, y, rotateX, rotateY };
}
