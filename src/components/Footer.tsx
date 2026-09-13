import { profile } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-[var(--color-muted-2)] sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono">Built with React, TypeScript & Tailwind</p>
      </div>
    </footer>
  );
}
