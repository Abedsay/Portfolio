import { ArrowDown, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/content";
import { HeroSystemVisual } from "./HeroSystemVisual";
import { Reveal } from "./Reveal";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16 sm:px-10 lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#8b929c 1px, transparent 1px), linear-gradient(90deg, #8b929c 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs text-[var(--color-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Currently: {profile.currentRole} · Building toward {profile.buildingToward}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] text-[var(--color-paper)] sm:text-5xl lg:text-6xl">
              Abdullah Jrad
            </h1>
            <p className="mt-4 font-mono text-sm tracking-[0.16em] text-[var(--color-accent)] uppercase">
              Software Engineering · AI · Automation
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">
              I build software, work with AI systems, and automate engineering workflows — with a strong focus on how systems actually behave once real users touch them.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted-2)]">
              Computer Science graduate working in QA and test automation, moving toward{" "}
              <span className="text-[var(--color-paper)]">Software Development Engineering in Test</span> and{" "}
              <span className="text-[var(--color-paper)]">AI Engineering</span>.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
              >
                Explore My Work
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <GithubIcon size={16} /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </a>
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Download size={16} /> CV
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex items-center justify-center">
          <HeroSystemVisual />
        </Reveal>
      </div>
    </section>
  );
}
