import { motion } from "framer-motion";
import { engineeringDirection } from "../data/content";
import { Section } from "./Section";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

export function EngineeringDirection() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section
      id="direction"
      eyebrow="Engineering Direction"
      title="A progression built through systems and quality"
      intro="Software development, quality, and automation form the foundation for the next engineering directions."
    >
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5 sm:p-8">
        <div className="relative">
          <div className="absolute top-16 right-[9%] left-[9%] hidden h-px bg-[var(--color-accent)]/45 md:block" aria-hidden />
          <div className="grid gap-3 md:grid-cols-5">
          {engineeringDirection.stages.map((stage, index) => (
            <div key={stage} className="relative flex items-center gap-3">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="relative z-10 min-h-24 flex-1 border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 md:min-h-32"
              >
                <span className="font-mono text-[10px] text-[var(--color-muted-2)]">0{index + 1}</span>
                <p className="mt-4 font-display text-sm text-[var(--color-paper)]">{stage}</p>
              </motion.div>
              {index < engineeringDirection.stages.length - 1 && <span className="text-[var(--color-accent)] md:hidden" aria-hidden>↓</span>}
            </div>
          ))}
          </div>
        </div>
        <div className="relative mx-auto h-10 max-w-3xl" aria-hidden>
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--color-accent)]/70" />
          <div className="absolute right-1/4 bottom-0 left-1/4 h-px bg-[var(--color-accent)]/70" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {engineeringDirection.destinations.map((destination, index) => (
            <motion.div
              key={destination}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + index * 0.1, duration: 0.35 }}
              className="border border-[var(--color-accent)]/35 bg-[var(--color-accent-soft)] p-5"
            >
              <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-accent)] uppercase">Building toward</p>
              <p className="mt-2 font-display text-lg text-[var(--color-paper)]">{destination}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
