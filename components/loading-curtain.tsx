"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1650);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
        >
          <motion.div
            className="h-px w-28 overflow-hidden rounded-full bg-white/15"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-white/0 via-white to-white/0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
