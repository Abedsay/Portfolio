import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 120): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When the user reaches the bottom of the page,
      // always activate the final section.
      if (scrollTop + viewportHeight >= documentHeight - 8) {
        setActive(ids[ids.length - 1] ?? "");
        return;
      }

      let current = ids[0] ?? "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;

        if (top - offset <= 0) {
          current = id;
        }
      }

      setActive(current);
    };

    handler();

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids, offset]);

  return active;
}