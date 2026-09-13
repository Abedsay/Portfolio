import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, RefObject } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "../data/content";
import { ProjectVisual } from "./ProjectVisual";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

export function ProjectModal({ project, onClose, returnFocusRef }: { project: Project; onClose: () => void; returnFocusRef: RefObject<HTMLButtonElement | null> }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    const trigger = returnFocusRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [onClose, returnFocusRef]);

  return createPortal(
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.2 }}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative z-[10000] flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] outline-none sm:max-h-[calc(100dvh-3rem)]"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/90 text-[var(--color-muted)] backdrop-blur transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-paper)] sm:top-5 sm:right-5"
        >
          <X size={20} />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-2xl p-6 pt-14 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {project.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[var(--color-muted)] uppercase"
              >
                {c}
              </span>
            ))}
          </div>

          <h3 id="project-modal-title" className="mt-4 font-display text-2xl text-[var(--color-paper)]">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-accent)]">{project.tagline}</p>

          <p className="mt-5 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>

          <CaseStudySection title="Problem / goal">
            <p className="text-sm leading-relaxed text-[var(--color-paper)]/85">{project.problem}</p>
          </CaseStudySection>

          <div className="mt-5 border-y border-[var(--color-border-soft)] py-4">
            <ProjectVisual project={project} />
          </div>

          <CaseStudySection title="Approach">
            <ul className="mt-3 space-y-2">
              {project.approach.map((a) => (
                <li key={a} className="flex gap-2 text-sm leading-relaxed text-[var(--color-paper)]/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {a}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          {project.architecture && (
            <CaseStudySection title="Technical flow">
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {project.architecture.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1.5 font-mono text-xs text-[var(--color-paper)]">
                      {step}
                    </span>
                    {i < project.architecture!.length - 1 && (
                      <span className="text-[var(--color-muted-2)]">→</span>
                    )}
                  </span>
                ))}
              </div>
            </CaseStudySection>
          )}

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <CaseStudyList title="Engineering decisions" items={project.decisions} />
            <CaseStudyList title="Results" items={project.results} />
          </div>

          <CaseStudyList title="Lessons" items={project.lessons} className="mt-6" />

          <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted-2)] uppercase">My contribution</p>
              <p className="mt-2 leading-relaxed text-[var(--color-muted)]">{project.contribution}</p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted-2)] uppercase">Status</p>
              <p className="mt-2 text-[var(--color-muted)]">{project.status}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted-2)] uppercase">Technologies</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-paper)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {l.label}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function CaseStudySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted-2)] uppercase">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CaseStudyList({ title, items, className = "" }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted-2)] uppercase">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
