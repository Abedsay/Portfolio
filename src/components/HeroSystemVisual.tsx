import { useState } from "react";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

const NODES = [
  { key: "app", label: "Application", detail: "Interfaces and workflows people use", angle: -90 },
  { key: "api", label: "API / Backend", detail: "Services and data connections", angle: -38 },
  { key: "ai", label: "AI / ML", detail: "Models, chatbots, and agent systems", angle: 14 },
  { key: "evaluation", label: "Evaluation", detail: "Accuracy, relevance, and edge cases", angle: 66 },
  { key: "automation", label: "Automation", detail: "Repeatable engineering workflows", angle: 118 },
  { key: "testing", label: "Testing", detail: "Validation before release", angle: 170 },
  { key: "feedback", label: "Feedback", detail: "Findings returned to developers", angle: 222 },
];

const CX = 260;
const CY = 220;
const R = 154;

function point(angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
}

export function HeroSystemVisual() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState("app");
  const points = NODES.map((node) => ({ ...node, ...point(node.angle) }));
  const selected = points.find((node) => node.key === active) ?? points[0];

  return (
    <div className="w-full max-w-xl">
      <svg viewBox="0 0 520 440" className="w-full" role="group" aria-label="Interactive engineering system. Select a node to learn how it connects to the work.">
        <defs>
          <radialGradient id="hero-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>
        {points.map((node, index) => {
          const next = points[(index + 1) % points.length];
          const connected = node.key === active || next.key === active;
          return (
            <g key={`edge-${node.key}`}>
              <line x1={node.x} y1={node.y} x2={next.x} y2={next.y} stroke={connected ? "#22d3ee" : "#23282f"} strokeOpacity={connected ? 0.8 : 1} strokeWidth={connected ? 2 : 1.5} />
              {!reduced && connected && <circle r="2.8" fill="#22d3ee"><animateMotion dur="2.8s" repeatCount="indefinite" path={`M${node.x},${node.y} L${next.x},${next.y}`} /></circle>}
            </g>
          );
        })}
        {points.map((node) => <line key={`spoke-${node.key}`} x1={CX} y1={CY} x2={node.x} y2={node.y} stroke={node.key === active ? "#22d3ee" : "#1a1e24"} strokeOpacity={node.key === active ? 0.55 : 1} />)}
        <circle cx={CX} cy={CY} r="70" fill="url(#hero-core-glow)" />
        <circle cx={CX} cy={CY} r="34" fill="#0e1114" stroke="#22d3ee" strokeWidth="1.5" />
        <text x={CX} y={CY - 3} textAnchor="middle" fill="#f2f3f0" fontSize="12" fontWeight={600}>AJ</text>
        <text x={CX} y={CY + 12} textAnchor="middle" fill="#8b929c" fontSize="7">engineering loop</text>
        {points.map((node) => {
          const isActive = node.key === active;
          const labelY = node.y + (node.angle > -15 && node.angle < 190 ? 20 : -12);
          return (
            <g
              key={node.key}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`${node.label}: ${node.detail}`}
              className="cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
              onClick={() => setActive(node.key)}
              onFocus={() => setActive(node.key)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(node.key);
                }
              }}
            >
              <circle cx={node.x} cy={node.y} r={isActive ? 9 : 6} fill="#0e1114" stroke={isActive ? "#22d3ee" : "#5b6169"} strokeWidth={isActive ? 2 : 1.5} />
              <text x={node.x} y={labelY} textAnchor="middle" fill={isActive ? "#f2f3f0" : "#8b929c"} fontSize="10" className="font-mono">{node.label}</text>
            </g>
          );
        })}
      </svg>
      <div className="mx-auto -mt-5 max-w-sm rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-surface)] px-4 py-3 text-center" aria-live="polite">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-accent)] uppercase">{selected.label}</p>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{selected.detail}</p>
      </div>
    </div>
  );
}
