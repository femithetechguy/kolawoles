"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    kpis: { label: string; value: string }[];
    features: string[];
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
              <div>
                <p className="inpage-modal-label">{label}</p>
                <h3 className="inpage-modal-title">{title}</h3>
              </div>
              <div className="inpage-modal-actions">
                <a href={url} target="_blank" rel="noreferrer" className="inpage-modal-link">
                  Open in New Tab
                </a>
                <button type="button" onClick={onClose} className="inpage-modal-close">
                  Close
                </button>
              </div>
            </header>

            <div className="inpage-modal-content">
              <p className="inpage-modal-status">Live in-page render</p>
              <h4 className="inpage-modal-headline">{modal.headline}</h4>
              <p className="inpage-modal-copy">{modal.description}</p>

              <div className="inpage-modal-kpis">
                {modal.kpis.map((kpi) => (
                  <div key={kpi.label} className="inpage-modal-kpi-card">
                    <span className="inpage-modal-kpi-value">{kpi.value}</span>
                    <span className="inpage-modal-kpi-label">{kpi.label}</span>
                  </div>
                ))}
              </div>

              <ul className="inpage-modal-feature-list">
                {modal.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="inpage-modal-stack">
                {stack.map((item) => (
                  <span key={item} className="inpage-modal-chip">
                    {item}
                  </span>
                ))}
              </div>

              <p className="inpage-modal-note">
                Target URL: {url}
              </p>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
