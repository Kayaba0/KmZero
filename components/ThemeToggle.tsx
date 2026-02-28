"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "kmzero_theme";

function apply(theme: Theme) {
  const html = document.documentElement;
  // add a tiny fade during theme switch
  html.classList.add("theme-transition");
  if (theme === "light") html.classList.add("light");
  else html.classList.remove("light");
  window.setTimeout(() => html.classList.remove("theme-transition"), 260);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "dark";
      setTheme(saved);
      apply(saved);
    } catch {
      // ignore
    }
  }, []);

  const isLight = theme === "light";

  function toggle() {
    const next: Theme = isLight ? "dark" : "light";
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  // Invert icons as requested:
  // - Dark mode shows Sun icon
  // - Light mode shows Moon icon
  const iconSrc = isLight ? "/icons/moon.png" : "/icons/sun.png";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Passa al tema scuro" : "Passa al tema chiaro"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:opacity-90"
      style={{ borderColor: "var(--line)", background: "transparent" }}
    >
      <Image src={iconSrc} alt="" width={18} height={18} priority className="block" />
    </button>
  );
}
