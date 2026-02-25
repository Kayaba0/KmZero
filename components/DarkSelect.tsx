"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

export default function DarkSelect({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const current = useMemo(() => options.find((o) => o.value === value), [options, value]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-2 text-sm font-semibold"
        style={{
          borderColor: "var(--line)",
          background: "rgba(70,89,64,.18)",
          color: "var(--ink)",
        }}
      >
        <span className="truncate" style={{ color: current ? "var(--ink)" : "var(--muted)" }}>
          {current?.label ?? placeholder ?? "Seleziona"}
        </span>
        <span aria-hidden className="text-xs" style={{ color: "var(--muted)" }}>
          ▾
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-3xl border"
          style={{
            borderColor: "var(--line)",
            background: "#223027",
            boxShadow: "var(--shadow2)",
          }}
        >
          <div className="max-h-64 overflow-auto p-1">
            {options.map((o) => {
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm"
                  style={{
                    background: active ? "rgba(253,251,240,.08)" : "transparent",
                    color: "rgba(253,251,240,.92)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget.style.background = active
                      ? "rgba(253,251,240,.08)"
                      : "rgba(253,251,240,.06)");
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget.style.background = active ? "rgba(253,251,240,.08)" : "transparent");
                  }}
                >
                  <span className="truncate">{o.label}</span>
                  {active && <span aria-hidden>✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
