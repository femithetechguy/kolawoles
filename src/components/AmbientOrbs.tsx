"use client";

import { motion } from "framer-motion";

type Props = {
  hoverState: "data" | "dev" | "none";
};

export default function AmbientOrbs({ hoverState }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Data orb — top left */}
      <motion.div
        animate={{
          opacity: hoverState === "data" ? 0.28 : 0.1,
          scale: hoverState === "data" ? 1.2 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "#1a6cf5",
          filter: "blur(100px)",
          top: "-200px",
          left: "-150px",
        }}
      />

      {/* Dev orb — bottom right */}
      <motion.div
        animate={{
          opacity: hoverState === "dev" ? 0.28 : 0.1,
          scale: hoverState === "dev" ? 1.2 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#f07040",
          filter: "blur(90px)",
          bottom: "-120px",
          right: "-100px",
        }}
      />

      {/* subtle center glow */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(240,237,230,0.015)",
          filter: "blur(60px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
