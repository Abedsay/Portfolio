import { Section } from "./Section";
import { Reveal } from "./Reveal";

const pillars = [
  {
    title: "Who I am",
    body: "A Computer Science graduate from the Lebanese American University, currently working as a Quality Assurance Consultant. My background sits across software engineering, testing, and hands-on machine learning and high-performance computing work.",
  },
  {
    title: "What I work on",
    body: "Day to day, that means manual and automated testing, regression and release validation, and most notably taking QA responsibility for an AI project built around LLM-based chatbots and agent systems: designing scenarios, evaluating responses, and writing the guidelines that improve consistency.",
  },
  {
    title: "What I'm becoming",
    body: "QA gave me a close-up view of how software actually breaks. I'm building on that toward two connected directions: Software Development Engineer in Test, and AI Engineering. Combining automation, testing infrastructure, and AI-powered application development.",
  },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Software engineering, seen from the inside of QA">
      <div className="grid gap-8 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-lg text-[var(--color-paper)]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
