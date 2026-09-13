import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import { experience, type ExperienceItem as ExperienceItemData } from "../data/content";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.35"],
  });

  return (
    <Section id="experience" eyebrow="Experience" title="Professional Experience">
      <div ref={containerRef} className="relative">
        {/* base track */}
        <div className="absolute top-0 bottom-0 left-[7px] hidden w-px bg-[var(--color-border)] sm:block" aria-hidden />
        {/* scroll-linked fill */}
        <motion.div
          className="absolute top-0 left-[7px] hidden w-px origin-top bg-[var(--color-accent)] sm:block"
          style={reduced ? { height: "100%" } : { scaleY: scrollYProgress, height: "100%" }}
          aria-hidden
        />
        <div className="space-y-10">
          {experience.map((role, i) => (
            <ExperienceRow
              key={role.role + role.company}
              role={role}
              index={i}
              isActive={reduced || i <= activeIndex}
              onActivate={() => setActiveIndex((prev) => Math.max(prev, i))}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ExperienceRow({
  role,
  index,
  isActive,
  onActivate,
}: {
  role: ExperienceItemData;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActivate();
  }, [inView, onActivate]);

  return (
    <Reveal delay={index * 0.06}>
      <div ref={nodeRef} className="relative sm:pl-10">
        <span
          className={`absolute top-1.5 left-0 hidden h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 sm:block ${
            isActive
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/30"
              : "border-[var(--color-border)] bg-[var(--color-ink)]"
          }`}
          aria-hidden
        />
        <div
          className={`rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${
            isActive ? "border-[var(--color-border-soft)] bg-[var(--color-surface)]" : "border-[var(--color-border-soft)]/60 bg-[var(--color-surface)]/60"
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl text-[var(--color-paper)]">{role.role}</h3>
            <span className="font-mono text-xs text-[var(--color-muted-2)]">{role.period}</span>
          </div>
          <p className="mt-1 text-sm text-[var(--color-accent)]">{role.company}</p>
          <p className="text-xs text-[var(--color-muted-2)]">{role.location}</p>

          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
            {role.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-muted-2)]" />
                {b}
              </li>
            ))}
          </ul>

          {role.highlight && (
            <div className="mt-5 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent-soft)] p-5">
              <p className="font-mono text-xs tracking-wide text-[var(--color-accent)] uppercase">{role.highlight.title}</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-paper)]/90">
                {role.highlight.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
