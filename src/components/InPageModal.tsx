"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import skillsContent from "@/content/skills.json";

type ModalType = "data" | "dev";

type InPageModalProps = {
  isOpen: boolean;
  type: ModalType;
  title: string;
  label: string;
  url: string;
  stack: string[];
  modal: {
    headline: string;
    description: string;
    nav: string[];
    kpis: { label: string; value: string }[];
    features: string[];
    modules: { title: string; body: string; badge: string }[];
    milestones: { name: string; status: string }[];
  };
  onClose: () => void;
};

export default function InPageModal({
  isOpen,
  type,
  title,
  label,
  url,
  stack,
  modal,
  onClose,
}: InPageModalProps) {
  const isMobileViewport =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 900px)").matches;

  const activeSkills = skillsContent.items.find((item) => {
    if (!("label" in item)) return false;
    if (type === "data") return item.label === "Data Analytics";
    return item.label === "Software Development";
  });

  const marqueeSkillsDesktop =
    activeSkills &&
    "marqueeTopics" in activeSkills &&
    Array.isArray(activeSkills.marqueeTopics)
      ? activeSkills.marqueeTopics
      : [];

  const marqueeSkillsMobile =
    activeSkills &&
    "mobileMarqueeTopics" in activeSkills &&
    Array.isArray(activeSkills.mobileMarqueeTopics)
      ? activeSkills.mobileMarqueeTopics
      : [];

  const fallbackTopics =
    activeSkills && "topics" in activeSkills && Array.isArray(activeSkills.topics)
      ? activeSkills.topics.slice(0, 12)
      : [];

  const preferredSkills = isMobileViewport ? marqueeSkillsMobile : marqueeSkillsDesktop;
  const skillsToRender = (preferredSkills.length > 0 ? preferredSkills : fallbackTopics).slice(0, 14);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="inpage-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.section
            className={`inpage-modal-shell ${type === "data" ? "is-data" : "is-dev"}`}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} modal`}
          >
            <header className="inpage-modal-header">
              <div className="inpage-modal-title-wrap">
                <p className="inpage-modal-label">{label}</p>
                <h3 className="inpage-modal-title">{title}</h3>
              </div>

              <div className="inpage-modal-skill-slot" aria-label={`${title} skills`}>
                <div className="inpage-modal-skill-rail">
                  <div className="inpage-modal-skill-track">
                    {[...skillsToRender, ...skillsToRender].map((skill, index) => (
                      <span key={`${skill}-${index}`} className="inpage-modal-skill-item">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="inpage-modal-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="inpage-modal-close"
                  aria-label="Close modal"
                  title="Close"
                >
                  <span aria-hidden="true">x</span>
                </button>
              </div>
            </header>

            <div className="inpage-modal-content">
              <section className="inpage-modal-frame-shell">
                <iframe
                  src={url}
                  title={`${title} live page`}
                  className="inpage-modal-iframe"
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </section>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
