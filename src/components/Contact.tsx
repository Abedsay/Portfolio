import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/content";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <Section id="contact" className="border-t border-[var(--color-border-soft)]">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-3xl font-medium text-[var(--color-paper)] sm:text-4xl">
            Looking for someone who cares how software actually behaves?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            I'm open to SDET, QA engineering, and AI-application roles — in Lebanon, remote, or in Europe.
            Happy to talk through where I could fit.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} /> {profile.email}
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-paper)]"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-paper)]"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
