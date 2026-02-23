"use client";

import * as React from "react";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return "dark"; // default dark
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    // Light theme = html.light. Dark theme = default (no class).
    document.documentElement.classList.toggle("light", t === "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    window.localStorage.setItem("theme", next);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Passa al tema scuro" : "Passa al tema chiaro"}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition hover:opacity-95"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface2)",
        color: "var(--ink)",
        boxShadow: "var(--shadow2)",
      }}
    >
      <span
        className="relative inline-flex h-5 w-9 items-center rounded-full border"
        style={{
          borderColor: "var(--line)",
          background: isLight
            ? "linear-gradient(135deg, rgba(15,26,16,.16), rgba(70,89,64,.22))"
            : "linear-gradient(135deg, var(--brand), var(--brand2))",
        }}
        aria-hidden
      >
        <span
          className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full transition"
          style={{
            transform: `translateX(${isLight ? "16px" : "0px"})`,
            background: isLight ? "var(--brand2)" : "rgba(253,251,240,.92)",
          }}
        />
      </span>
      <span style={{ color: "var(--muted)" }}>{isLight ? "Chiaro" : "Scuro"}</span>
    </button>
  );
}
