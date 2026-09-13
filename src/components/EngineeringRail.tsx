import { useScrollSpy } from "../hooks/useScrollSpy";

const STAGES = [
  { id: "top", label: "Hero" },
  { id: "experience", label: "Experience" },
  { id: "ai-quality", label: "AI" },
  { id: "projects", label: "Projects" },
  { id: "direction", label: "Direction" },
  { id: "contact", label: "Contact" },
];

const STAGE_IDS = STAGES.map((stage) => stage.id);

export function EngineeringRail() {
  const active = useScrollSpy(STAGE_IDS, 220);
  const activeIndex = Math.max(
    0,
    STAGES.findIndex((stage) => stage.id === active)
  );
  const progress = (activeIndex / (STAGES.length - 1)) * 100;

  const goTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section progress"
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex h-52 flex-col justify-between">
        {/* Rail aligned with the center of the dots */}
        <div
          className="absolute top-1 bottom-1 left-[4px] w-px bg-[var(--color-border)]"
          aria-hidden
        />

        {/* Active progress */}
        <div
          className="absolute top-1 left-[4px] w-px bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)] transition-[height] duration-300"
          style={{
            height: `calc(${progress}% - ${progress === 0 ? "0px" : "2px"
              })`,
          }}
          aria-hidden
        />

        {STAGES.map((stage, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = stage.id === active;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => goTo(stage.id)}
              aria-current={isCurrent ? "location" : undefined}
              className="group relative -ml-2 flex w-fit cursor-pointer items-center gap-2.5 rounded-full py-1 pl-2 pr-3 transition-colors"
            >
              <span
                className={`relative z-10 h-2 w-2 shrink-0 rounded-full border transition-all duration-200 group-hover:scale-125 group-focus-visible:scale-125 ${isActive
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                    : "border-[var(--color-muted-2)] bg-[var(--color-ink)] group-hover:border-[var(--color-accent)]"
                  }`}
                aria-hidden
              />

              <span
                className={`whitespace-nowrap font-mono text-[9px] tracking-[0.12em] uppercase transition-colors ${isCurrent
                    ? "text-[var(--color-paper)]"
                    : "text-[var(--color-muted-2)] group-hover:text-[var(--color-muted)]"
                  }`}
              >
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}