import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { profile } from "../data/content";
import { Reveal } from "./Reveal";

export function GithubCTA() {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-16">
      <Reveal>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-8 py-10 text-center transition-colors hover:border-[var(--color-accent)]/40 sm:flex-row sm:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)]">
              <GithubIcon className="text-[var(--color-paper)]" size={22} />
            </div>
            <div>
              <p className="font-display text-lg text-[var(--color-paper)]">More on GitHub</p>
              <p className="text-sm text-[var(--color-muted)]">
                Project history, commits, and the code behind everything above.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)]">
            github.com/Abedsay <ArrowUpRight size={16} />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
