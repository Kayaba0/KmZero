"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "kmzero_demo_auth";

export default function LoginButton() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      setIsAuthed(v === "admin");
    } catch {
      // ignore
    }
  }, []);

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

  function logout() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsAuthed(false);
    setOpen(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const u = username.trim();
    if (u === "admin" && password === "admin") {
      try {
        window.localStorage.setItem(STORAGE_KEY, "admin");
      } catch {
        // ignore
      }
      setIsAuthed(true);
      setOpen(false);
      setPassword("");
      return;
    }

    setError("Credenziali non valide. Usa admin / admin.");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border px-4 py-2 text-sm font-semibold"
        style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
      >
        {isAuthed ? "Admin" : "Login"}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[1000]">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

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
                    Login demo (solo test). Credenziali: <span className="font-semibold">admin / admin</span>.
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

              {isAuthed ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }}>
                    Sei loggato come <span className="font-semibold">admin</span>.
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full rounded-2xl px-4 py-3 text-sm font-semibold"
                    style={{ background: "linear-gradient(135deg, var(--brand), var(--brand2))", color: "rgba(253,251,240,.96)", boxShadow: "var(--shadow2)" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                    />
                  </div>

                  {error && (
                    <div className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(221,73,73,.35)", background: "rgba(221,73,73,.10)", color: "rgba(253,251,240,.92)" }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-2xl px-4 py-3 text-sm font-semibold"
                    style={{ background: "linear-gradient(135deg, var(--brand), var(--brand2))", color: "rgba(253,251,240,.96)", boxShadow: "var(--shadow2)" }}
                  >
                    Entra
                  </button>
                </form>
              )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
