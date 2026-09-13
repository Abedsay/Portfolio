import { skills } from "../data/content";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools grounded in actual project work">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
              <h3 className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted-2)] uppercase">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-paper)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
