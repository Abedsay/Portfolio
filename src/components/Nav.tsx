import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { nav, profile } from "../data/content";
import { useScrollSpy } from "../hooks/useScrollSpy";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const active = useScrollSpy(nav.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusables = () => Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    const first = focusables()[0];
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const trigger = menuTriggerRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-300 ${scrolled
        ? "border-[var(--color-border-soft)] bg-[var(--color-ink)]/70 backdrop-blur-md"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <button
          onClick={() => goTo("top")}
          className="cursor-pointer font-display text-sm font-semibold tracking-wide text-[var(--color-paper)]"
          aria-label="Back to top"
        >
          AJ<span className="text-[var(--color-accent)]">.</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              aria-current={active === item.id ? "page" : undefined}
              className={`relative text-sm transition-colors ${active === item.id ? "text-[var(--color-paper)]" : "text-[var(--color-muted)] hover:text-[var(--color-paper)]"
                }`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-paper)]"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-paper)]"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={profile.cvPath}
            download
            className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Download CV
          </a>
        </div>

        <button
          ref={menuTriggerRef}
          className="cursor-pointer text-[var(--color-paper)] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[60px] z-[100] isolate flex flex-col overflow-y-auto bg-[#080b0e] px-6 py-10 opacity-100 backdrop-blur-none md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                aria-current={active === item.id ? "page" : undefined}
                className={`min-h-12 cursor-pointer border-b border-[var(--color-border-soft)] py-4 text-left text-lg transition-colors ${active === item.id ? "text-[var(--color-accent)]" : "text-[var(--color-paper)]"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 flex items-center gap-6">
            <a href={profile.github} target="_blank" rel="noreferrer" className="cursor-pointer text-[var(--color-muted)] transition-colors hover:text-[var(--color-paper)]" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="cursor-pointer text-[var(--color-muted)] transition-colors hover:text-[var(--color-paper)]" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          </div>
          <a
            href={profile.cvPath}
            download
            className="mt-6 cursor-pointer rounded-full border border-[var(--color-accent)] px-5 py-3 text-center text-sm text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]"
          >
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
