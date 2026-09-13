import { certifications, education, languages } from "../data/content";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { GraduationCap, Award, Languages } from "lucide-react";

export function Education() {
  return (
    <Section id="education" eyebrow="Background" title="Education, certifications & languages">
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
            <GraduationCap className="text-[var(--color-accent)]" size={20} />
            <h3 className="mt-4 font-display text-lg text-[var(--color-paper)]">{education.degree}</h3>
            <p className="mt-1 text-sm text-[var(--color-accent)]">{education.school}</p>
            <p className="text-xs text-[var(--color-muted-2)]">
              {education.period} · {education.location} · {education.note}
            </p>
            <p className="mt-4 font-mono text-xs tracking-[0.2em] text-[var(--color-muted-2)] uppercase">
              Key courses
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-muted)]">
              {education.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
            <Award className="text-[var(--color-accent)]" size={20} />
            <h3 className="mt-4 font-display text-lg text-[var(--color-paper)]">Certifications</h3>
            <p className="mt-1 text-xs text-[var(--color-muted-2)]">As listed on LinkedIn</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-paper)]/90">
              {certifications.map((c) => (
                <li key={c.name} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
            <Languages className="text-[var(--color-accent)]" size={20} />
            <h3 className="mt-4 font-display text-lg text-[var(--color-paper)]">Languages</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between">
                  <span className="text-[var(--color-paper)]">{l.name}</span>
                  <span className="text-xs text-[var(--color-muted-2)]">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
