import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-20 sm:px-10 sm:py-28 lg:px-16 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl sm:mb-16">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs tracking-[0.2em] text-[var(--color-accent)] uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance font-display text-3xl font-medium text-[var(--color-paper)] sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
