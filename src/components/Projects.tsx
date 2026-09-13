import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import { projects, type Project, type ProjectCategory } from "../data/content";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ProjectModal } from "./ProjectModal";
import { ProjectVisual } from "./ProjectVisual";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Software Engineering", "AI / ML", "Systems"];

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter as ProjectCategory))),
    [filter]
  );

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Selected Projects"
      intro="Curated from coursework and internship work, spanning full-stack systems, applied machine learning, and performance engineering."
    >
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors focus-visible:border-[var(--color-accent)] ${
              filter === f
                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-paper)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filter === "All" ? (
          <motion.div
            key="curated"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="space-y-6"
          >
            <FeaturedCard project={projects[0]} onOpen={(project, trigger) => { triggerRef.current = trigger; setActive(project); }} />
            <div className="grid gap-6 lg:grid-cols-2">
              <SplitCard project={projects[1]} onOpen={(project, trigger) => { triggerRef.current = trigger; setActive(project); }} />
              <RowCard project={projects[2]} onOpen={(project, trigger) => { triggerRef.current = trigger; setActive(project); }} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <CompactCard project={projects[3]} onOpen={(project, trigger) => { triggerRef.current = trigger; setActive(project); }} />
              <CompactCard project={projects[4]} onOpen={(project, trigger) => { triggerRef.current = trigger; setActive(project); }} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="filtered"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {filtered.map((p) => (
              <CompactCard key={p.slug} project={p} onOpen={(project, trigger) => { triggerRef.current = trigger; setActive(project); }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} returnFocusRef={triggerRef} />}
      </AnimatePresence>
    </Section>
  );
}

function CategoryTags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.categories.map((c) => (
        <span
          key={c}
          className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[var(--color-muted-2)] uppercase"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

type OpenProject = (project: Project, trigger: HTMLButtonElement) => void;

function FeaturedCard({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  return (
    <Reveal>
      <button
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`Open case study: ${project.name}`}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface-raised)] to-[var(--color-surface)] p-8 text-left transition-colors hover:border-[var(--color-accent)]/50 focus-visible:border-[var(--color-accent)] sm:p-12"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-muted-2)]">01 · Featured</span>
          <Layers size={14} className="text-[var(--color-accent)]" />
        </div>
        <h3 className="mt-4 font-display text-2xl text-[var(--color-paper)] sm:text-3xl">{project.name}</h3>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">{project.tagline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{project.description}</p>
        <div className="mt-6 border-y border-[var(--color-border-soft)] py-3">
          <ProjectVisual project={project} />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <CategoryTags project={project} />
          <CardCta />
        </div>
      </button>
    </Reveal>
  );
}

function CardCta() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted-2)] transition-colors group-hover:text-[var(--color-accent)]">
      View details <ExternalLink size={12} />
    </span>
  );
}

function SplitCard({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  return (
    <Reveal>
      <button
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`Open case study: ${project.name}`}
        className="group block h-full w-full cursor-pointer rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-7 text-left transition-colors hover:border-[var(--color-accent)]/40 focus-visible:border-[var(--color-accent)]"
      >
        <span className="font-mono text-xs text-[var(--color-muted-2)]">02</span>
        <h3 className="mt-3 font-display text-xl text-[var(--color-paper)]">{project.name}</h3>
        <p className="mt-2 text-sm text-[var(--color-accent)]">{project.tagline}</p>
        <div className="mt-4">
          <ProjectVisual project={project} compact />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] text-[var(--color-muted)]">
                {t}
              </span>
            ))}
          </div>
          <CardCta />
        </div>
      </button>
    </Reveal>
  );
}

function RowCard({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  return (
    <Reveal delay={0.05}>
      <button
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`Open case study: ${project.name}`}
        className="group flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-7 text-left transition-colors hover:border-[var(--color-accent)]/40 focus-visible:border-[var(--color-accent)]"
      >
        <div>
          <span className="font-mono text-xs text-[var(--color-muted-2)]">03</span>
          <h3 className="mt-3 font-display text-xl text-[var(--color-paper)]">{project.name}</h3>
          <p className="mt-2 text-sm text-[var(--color-accent)]">{project.tagline}</p>
          <div className="mt-4">
            <ProjectVisual project={project} compact />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] text-[var(--color-muted)]">
                {t}
              </span>
            ))}
          </div>
          <CardCta />
        </div>
      </button>
    </Reveal>
  );
}

function CompactCard({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  return (
    <Reveal delay={0.05}>
      <button
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`Open case study: ${project.name}`}
        className="group block h-full w-full cursor-pointer rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 text-left transition-colors hover:border-[var(--color-accent)]/40 focus-visible:border-[var(--color-accent)]"
      >
        <CategoryTags project={project} />
        <h3 className="mt-3 font-display text-lg text-[var(--color-paper)]">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{project.tagline}</p>
        <div className="mt-3">
          <ProjectVisual project={project} compact />
        </div>
        <div className="mt-4">
          <CardCta />
        </div>
      </button>
    </Reveal>
  );
}
