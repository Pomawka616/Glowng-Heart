"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "low" | "medium" | "high";

export function useDeviceTier(reducedMotion: boolean): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("medium");

  useEffect(() => {
    if (reducedMotion) {
      setTier("low");
      return;
    }

    const memory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    const mobile = window.innerWidth < 768;

    if (memory <= 4 || cores <= 4 || mobile) {
      setTier(mobile ? "low" : "medium");
      return;
    }

    setTier("high");
  }, [reducedMotion]);

  return tier;
}
