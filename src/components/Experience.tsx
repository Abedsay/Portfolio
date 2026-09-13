import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import {
  experience,
  type ExperienceItem as ExperienceItemData,
} from "../data/content";
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
        {/* Base timeline track */}
        <div
          className="absolute top-0 bottom-0 left-[7px] hidden w-px bg-[var(--color-border)] sm:block"
          aria-hidden
        />

        {/* Scroll-linked timeline fill */}
        <motion.div
          className="absolute top-0 left-[7px] hidden w-px origin-top bg-[var(--color-accent)] sm:block"
          style={
            reduced
              ? { height: "100%" }
              : { scaleY: scrollYProgress, height: "100%" }
          }
          aria-hidden
        />

        <div className="space-y-10">
          {experience.map((role, i) => (
            <ExperienceRow
              key={role.role + role.company}
              role={role}
              index={i}
              isActive={reduced || i <= activeIndex}
              onActivate={() =>
                setActiveIndex((prev) => Math.max(prev, i))
              }
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
  const inView = useInView(nodeRef, {
    margin: "-45% 0px -45% 0px",
  });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (inView) onActivate();
  }, [inView, onActivate]);

  return (
    <Reveal delay={index * 0.06}>
      <div ref={nodeRef} className="relative sm:pl-10">
        <span
          className={`absolute top-1.5 left-0 hidden h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 sm:block ${isActive
            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/30"
            : "border-[var(--color-border)] bg-[var(--color-ink)]"
            }`}
          aria-hidden
        />

        <div
          className={`rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${isActive
            ? "border-[var(--color-border-soft)] bg-[var(--color-surface)]"
            : "border-[var(--color-border-soft)]/60 bg-[var(--color-surface)]/60"
            }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl text-[var(--color-paper)]">
              {role.role}
            </h3>

            <span className="font-mono text-xs text-[var(--color-muted-2)]">
              {role.period}
            </span>
          </div>

          <p className="mt-1 text-sm text-[var(--color-accent)]">
            {role.company}
          </p>

          <p className="text-xs text-[var(--color-muted-2)]">
            {role.location}
          </p>

          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
            {role.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-muted-2)]" />
                {b}
              </li>
            ))}
          </ul>

          {role.highlight && (
            <TelemetryHighlightCard
              highlight={role.highlight}
              reduced={reduced}
            />
          )}
        </div>
      </div>
    </Reveal>
  );
}

/**
 * AI/LLM highlight card with a continuous energy-beam signal traveling
 * around the complete rounded perimeter.
 *
 * Normal motion:
 *   3.5s = one continuous, uninterrupted lap.
 *   Intensity breathes smoothly across the lap (no hard stop/restart) —
 *   stroke-dashoffset always advances at a constant rate, so the beam
 *   never appears motionless even while dim.
 */
function TelemetryHighlightCard({
  highlight,
  reduced,
}: {
  highlight: NonNullable<ExperienceItemData["highlight"]>;
  reduced: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();

      setSize({
        width: rect.width,
        height: rect.height,
      });
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);

      return () => {
        window.removeEventListener("resize", update);
      };
    }

    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const { width, height } = size;

  const cornerRadius = 12;
  const ready = width > 0 && height > 0;

  const r = ready
    ? Math.min(cornerRadius, width / 2, height / 2)
    : 0;

  /*
   * Real rounded-rectangle path based on the actual rendered card size.
   * This keeps the pulse aligned correctly on desktop and mobile.
   */
  const path = ready
    ? `M ${r} 0
       H ${width - r}
       A ${r} ${r} 0 0 1 ${width} ${r}
       V ${height - r}
       A ${r} ${r} 0 0 1 ${width - r} ${height}
       H ${r}
       A ${r} ${r} 0 0 1 0 ${height - r}
       V ${r}
       A ${r} ${r} 0 0 1 ${r} 0
       Z`
    : "";

  // Continuous single-lap cycle — no pause segment, no endpoint jump.
  const cycleDuration = 3.5;

  // Smooth breathing opacity across the full lap: dim at the loop seam,
  // bright through the middle. Value at 0 and 1 match, so the loop is
  // seamless — the beam keeps moving throughout, it just breathes.
  const opacityKeyTimes = "0;0.35;0.65;1";

  return (
    <div
      ref={wrapRef}
      className="relative mt-5 overflow-hidden rounded-xl"
    >
      {ready && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
        >
          <defs>
            {/*
              A single filter, applied to a single path, so the soft halo
              and the bright core are mathematically the same shape at
              every frame — there is no second animated element that can
              ever drift out of phase and read as a separate line.
              Pipeline: blur the shape's alpha twice (wide + tight),
              recolor each blurred layer, then stack the crisp original
              stroke on top for the bright core.
            */}
            <filter
              id="ai-telemetry-beam"
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="wideAlpha" />
              <feFlood floodColor="var(--color-accent)" floodOpacity="0.55" result="wideColor" />
              <feComposite in="wideColor" in2="wideAlpha" operator="in" result="wideHalo" />

              <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="tightAlpha" />
              <feFlood floodColor="#67e8f9" floodOpacity="0.85" result="tightColor" />
              <feComposite in="tightColor" in2="tightAlpha" operator="in" result="tightGlow" />

              <feMerge>
                <feMergeNode in="wideHalo" />
                <feMergeNode in="tightGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Clips the beam (and its filter bleed) to the card's own
                rounded boundary so the glow never spills into the page
                background past the border. */}
            <clipPath id="ai-telemetry-clip">
              <path d={path} />
            </clipPath>
          </defs>

          <g clipPath="url(#ai-telemetry-clip)">
            {/* Quiet permanent perimeter */}
            <path
              d={path}
              pathLength={1}
              fill="none"
              stroke="var(--color-accent)"
              strokeOpacity="0.14"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {!reduced ? (
              /* One beam: bright near-white cyan core, with the halo and
                 secondary glow generated from it by the filter above —
                 soft outer edge, bright center, single continuous shape. */
              <path
                d={path}
                pathLength={1}
                fill="none"
                stroke="#a5f3fc"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.22 0.78"
                filter="url(#ai-telemetry-beam)"
                vectorEffect="non-scaling-stroke"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-1"
                  keyTimes="0;1"
                  dur={`${cycleDuration}s`}
                  repeatCount="indefinite"
                />

                <animate
                  attributeName="stroke-opacity"
                  values="0;1;1;0"
                  keyTimes={opacityKeyTimes}
                  dur={`${cycleDuration}s`}
                  repeatCount="indefinite"
                />
              </path>
            ) : (
              /* Reduced motion: calm static perimeter */
              <path
                d={path}
                pathLength={1}
                fill="none"
                stroke="var(--color-accent)"
                strokeOpacity="0.24"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        </svg>
      )}

      {/* Card content */}
      <div className="relative m-px rounded-[11px] border border-[var(--color-accent)]/20 bg-[var(--color-accent-soft)] p-5">
        <p className="font-mono text-xs tracking-wide text-[var(--color-accent)] uppercase">
          {highlight.title}
        </p>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-paper)]/90">
          {highlight.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
