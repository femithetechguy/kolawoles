"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 40, stiffness: 150 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* outer trail ring */}
      <motion.div
        style={{ x: trailX, y: trailY, zIndex: 220 }}
        className="pointer-events-none fixed top-0 left-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 mix-blend-difference"
      />
      {/* soft halo */}
      <motion.div
        style={{ x, y, zIndex: 221 }}
        className="pointer-events-none fixed top-0 left-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 mix-blend-difference"
      />
      {/* cursor dot */}
      <motion.div
        style={{ x, y, zIndex: 222 }}
        className="pointer-events-none fixed top-0 left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-black/40 mix-blend-difference"
      />
    </>
  );
}
