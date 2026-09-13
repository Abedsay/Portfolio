import { useState } from "react";
import { motion } from "framer-motion";
import { aiEngineeringFlow } from "../data/content";
import { Section } from "./Section";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

export function AIQuality() {
  const reduced = usePrefersReducedMotion();
  const [selected, setSelected] = useState("evaluation");
  const active = aiEngineeringFlow.find((stage) => stage.key === selected) ?? aiEngineeringFlow[0];

  return (
    <Section
      id="ai-quality"
      eyebrow="AI / ML & Systems"
      title="Applied machine learning, performance, and evaluation"
      intro="Classical ML modeling, parallel performance engineering, and the day-to-day evaluation of LLM-based systems in production."
    >
      <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5 sm:p-7">
        <div className="relative">
          <div className="absolute top-12 right-[8%] left-[8%] hidden h-px bg-[var(--color-border)] lg:block" aria-hidden />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {aiEngineeringFlow.map((stage, index) => {
              const isActive = stage.key === selected;
              return (
                <div key={stage.key} className="relative min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelected(stage.key)}
                    aria-pressed={isActive}
                    className={`relative z-10 min-h-24 w-full cursor-pointer rounded-xl border p-3 text-left transition-colors focus-visible:border-[var(--color-accent)] ${isActive
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface-raised)] hover:border-[var(--color-muted-2)]"
                      }`}
                  >
                    <span className="font-mono text-[10px] text-[var(--color-muted-2)]">0{index + 1}</span>
                    <span className="mt-2 block font-display text-sm text-[var(--color-paper)]">{stage.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <motion.div
          key={active.key}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 grid gap-4 border-t border-[var(--color-border-soft)] pt-5 sm:grid-cols-[auto_1fr]"
          aria-live="polite"
        >
          <p className="font-mono text-xs tracking-[0.16em] text-[var(--color-accent)] uppercase">{active.label}</p>
          <div>
            <p className="text-sm leading-relaxed text-[var(--color-paper)]">{active.detail}</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Evidence: {active.evidence}</p>
          </div>
        </motion.div>
      </div>

      <p className="mt-5 text-sm text-[var(--color-muted)]">Current Noema work focuses on evaluating LLM chatbot and agent-system behavior, then sharing structured findings with developers.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Evidence title="Applied ML" body="Sentiment analysis using TF-IDF, Logistic Regression, and Random Forest — including model comparison, runtime comparison, and failure-case analysis." />
        <Evidence title="Performance engineering" body="LeNet-5 acceleration work across MPI, OpenMP, and CUDA C, measured against a sequential baseline and validated for correctness." />
        <Evidence title="AI system evaluation" body="At Noema: scenarios for accuracy, relevance, consistency, edge cases, and system behavior, with structured feedback for developers." />
      </div>
    </Section>
  );
}

function Evidence({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l border-[var(--color-accent)]/45 pl-4">
      <h3 className="font-display text-base text-[var(--color-paper)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{body}</p>
    </div>
  );
}
