"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Portal from "@/components/Portal";
import AmbientOrbs from "@/components/AmbientOrbs";
import GridBackground from "@/components/GridBackground";
import Cursor from "@/components/Cursor";
import InPageModal from "@/components/InPageModal";
import siteContent from "@/content/siteContent.json";

const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

type HoverState = "data" | "dev" | "none";
type PortalType = Exclude<HoverState, "none">;
type PortalModalContent = {
  headline: string;
  description: string;
  nav: string[];
  kpis: { label: string; value: string }[];
  features: string[];
  modules: { title: string; body: string; badge: string }[];
  milestones: { name: string; status: string }[];
};
type ActivePortal = {
  type: PortalType;
  label: string;
  title: string;
  href: string;
  stack: string[];
  modal: PortalModalContent;
};

const homeContent = siteContent.home;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  const [hoverState, setHoverState] = useState<HoverState>("none");
  const [activePortal, setActivePortal] = useState<ActivePortal | null>(null);

  return (
    <main
      className="home-shell"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* Layers */}
      <Cursor />
      <GridBackground />
      <AmbientOrbs hoverState={hoverState} />
      <Background hoverState={hoverState} />

      {/* Content */}
      <div
        className="home-content"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          className="home-eyebrow"
          {...fadeUp(0)}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(240,237,230,0.35)",
            marginBottom: "1.2rem",
          }}
        >
          {homeContent.eyebrow}
        </motion.p>

        {/* Name */}
        <motion.h1
          className="home-name"
          {...fadeUp(0.1)}
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(56px, 10vw, 104px)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: "#f0ede6",
          }}
        >
          {homeContent.name.primary}
          <span style={{ color: "rgba(240,237,230,0.15)" }}>
            {homeContent.name.secondary}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="home-tagline"
          {...fadeUp(0.2)}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "15px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(240,237,230,0.4)",
            marginTop: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          {homeContent.tagline}
        </motion.p>

        {/* Portals */}
        <div className="home-portals" style={{ display: "flex", gap: "16px", alignItems: "stretch" }}>
          {homeContent.portals.map((portal) => (
            <Portal
              key={portal.href}
              type={portal.type as PortalType}
              label={portal.label}
              title={portal.title}
              stack={portal.stack}
              onOpen={() =>
                setActivePortal({
                  type: portal.type as PortalType,
                  label: portal.label,
                  title: portal.title,
                  href: portal.href,
                  stack: portal.stack,
                  modal: portal.modal,
                })
              }
              onHover={setHoverState}
              delay={portal.delay}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="home-footer"
        {...fadeUp(0.6)}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0",
          zIndex: 10,
        }}
      >
        <span
          className="home-footer-text"
          style={{
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "rgba(240,237,230,0.2)",
            fontWeight: 300,
          }}
        >
          {homeContent.footerText}
        </span>
      </motion.footer>

      <InPageModal
        isOpen={activePortal !== null}
        type={activePortal?.type ?? "data"}
        label={activePortal?.label ?? ""}
        title={activePortal?.title ?? ""}
        url={activePortal?.href ?? ""}
        stack={activePortal?.stack ?? []}
        modal={
          activePortal?.modal ?? {
            headline: "",
            description: "",
            nav: [],
            kpis: [],
            features: [],
            modules: [],
            milestones: [],
          }
        }
        onClose={() => setActivePortal(null)}
      />
    </main>
  );
}
