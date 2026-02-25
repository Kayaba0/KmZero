"use client";

import { useEffect, useRef, useState } from "react";

export default function LoginButton() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

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
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border px-4 py-2 text-sm font-semibold"
        style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
      >
        Login
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              className="w-full max-w-md rounded-3xl border p-6"
              style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">Accedi</div>
                  <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                    Per ora è solo una demo (nessuna logica di autenticazione).
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border px-3 py-1 text-sm font-semibold"
                  style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
                  aria-label="Chiudi"
                >
                  ✕
                </button>
              </div>

              <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="nome@esempio.com"
                    className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl px-4 py-3 text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, var(--brand), var(--brand2))", color: "rgba(253,251,240,.96)", boxShadow: "var(--shadow2)" }}
                >
                  Entra
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
