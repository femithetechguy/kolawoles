"use client";

import { motion } from "framer-motion";

type PortalProps = {
  type: "data" | "dev";
  label: string;
  title: string;
  stack: string[];
  onOpen: () => void;
  onHover: (state: "data" | "dev" | "none") => void;
  delay?: number;
};

function DataPortalIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="11" width="3" height="6" rx="0.8" fill={color} />
      <rect x="8.5" y="8" width="3" height="9" rx="0.8" fill={color} />
      <rect x="14.5" y="5" width="3" height="12" rx="0.8" fill={color} />
      <path d="M3 9.3 7 6.8 10 7.6 15.8 3.7" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.8" cy="3.7" r="1.35" fill={color} />
    </svg>
  );
}

function DevPortalIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 5 3 10l4 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m13 5 4 5-4 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m11.5 4-3 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const accentMap = {
  data: {
    label: "#5b9cf6",
    glow: "rgba(26, 108, 245, 0.08)",
    border: "rgba(26, 108, 245, 0.35)",
    borderDefault: "rgba(240, 237, 230, 0.08)",
  },
  dev: {
    label: "#f09070",
    glow: "rgba(240, 112, 64, 0.08)",
    border: "rgba(240, 112, 64, 0.35)",
    borderDefault: "rgba(240, 237, 230, 0.08)",
  },
};

export default function Portal({
  type,
  label,
  title,
  stack,
  onOpen,
  onHover,
  delay = 0,
}: PortalProps) {
  const accent = accentMap[type];
  const iconColor = type === "data" ? "rgba(160, 202, 255, 0.98)" : "rgba(255, 190, 160, 0.98)";

  return (
    <motion.button
      type="button"
      aria-label={`Open ${title}`}
      onClick={onOpen}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover("none")}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ y: -1, scale: 0.995 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="portal-card group"
      style={{
        position: "relative",
        padding: "1.6rem 2rem",
        borderRadius: "10px",
        width: "min(320px, calc(100vw - 3rem))",
        overflow: "hidden",
        border: `1px solid ${accent.borderDefault}`,
        background:
          "linear-gradient(180deg, rgba(26, 30, 42, 0.88) 0%, rgba(16, 18, 28, 0.94) 56%, rgba(8, 8, 12, 0.98) 100%)",
        boxShadow:
          "0 16px 28px rgba(0,0,0,0.42), 0 6px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {/* hover bg */}
      <motion.div
        className="portal-card-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${accent.glow}, transparent)`,
          borderRadius: "10px",
          border: `0.5px solid ${accent.border}`,
          zIndex: 2,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* label */}
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accent.label,
            marginBottom: "0.5rem",
            fontWeight: 400,
          }}
        >
          {label}
        </p>

        {/* title */}
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "28px",
            fontWeight: 800,
            lineHeight: 1,
            color: "#f0ede6",
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h2>

        {/* stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {stack.map((item) => (
            <span
              key={item}
              style={{
                fontSize: "10px",
                padding: "3px 8px",
                borderRadius: "3px",
                background: "rgba(240,237,230,0.06)",
                color: "rgba(240,237,230,0.45)",
                letterSpacing: "0.05em",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* semantic icon */}
        <span
          className={`portal-icon-wrap ${type === "data" ? "portal-icon-data" : "portal-icon-dev"}`}
          style={{ color: iconColor }}
        >
          {type === "data" ? <DataPortalIcon color="currentColor" /> : <DevPortalIcon color="currentColor" />}
        </span>
      </div>
    </motion.button>
  );
}
