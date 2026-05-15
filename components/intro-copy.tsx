"use client";

import { motion } from "framer-motion";
import { fadeRise, revealLine } from "@/animations/intro";

type IntroCopyProps = {
  reducedMotion: boolean;
};

export function IntroCopy({ reducedMotion }: IntroCopyProps) {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center text-center"
      initial={reducedMotion ? { opacity: 0 } : fadeRise.initial}
      animate={reducedMotion ? { opacity: 1 } : fadeRise.animate}
      transition={{
        duration: reducedMotion ? 0.35 : 1.8,
        delay: reducedMotion ? 0 : 0.28,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <motion.div
        className="mb-5 h-px w-28 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        initial={revealLine.initial}
        animate={revealLine.animate}
        transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
      />

      <motion.h1
        className="chromatic-text relative text-[clamp(3rem,9vw,7rem)] font-semibold tracking-[-0.06em] text-white"
        data-text="Love you."
        animate={
          reducedMotion
            ? {}
            : {
                y: [0, -4, 0],
                scale: [1, 1.008, 1]
              }
        }
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
        style={{
          textShadow:
            "0 0 12px rgba(255,255,255,0.18), 0 0 35px rgba(255,58,112,0.12)"
        }}
      >
        Love you.
      </motion.h1>

      <motion.p
        className="mt-4 max-w-md text-[0.72rem] uppercase tracking-[0.48em] text-white/40 sm:text-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 1.2, ease: "easeOut" }}
      >
        digital heart experience
      </motion.p>
    </motion.div>
  );
}
