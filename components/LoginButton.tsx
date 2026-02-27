"use client";

import * as React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

function isAdmin(): boolean {
  if (typeof window === "undefined") return false;

  // localStorage markers used in the demo login
  const keys = ["kmzero_demo_auth", "kmzero_auth", "kmzero_demo_user"];
  for (const k of keys) {
    const v = window.localStorage.getItem(k);
    if (!v) continue;
    if (v === "admin") return true;
    try {
      const parsed = JSON.parse(v);
      if (parsed === "admin") return true;
      if (parsed?.role === "admin" || parsed?.user === "admin" || parsed?.username === "admin") return true;
    } catch {}
  }

  // cookie markers (if present)
  try {
    const cookie = document.cookie || "";
    if (cookie.includes("kmzero_auth=admin")) return true;
    if (cookie.includes("kmzero_demo_auth=admin")) return true;
  } catch {}

  return false;
}

function setAdmin(enabled: boolean) {
  if (typeof window === "undefined") return;
  if (enabled) window.localStorage.setItem("kmzero_demo_auth", "admin");
  else window.localStorage.removeItem("kmzero_demo_auth");
}

export default function LoginButton() {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const admin = mounted ? isAdmin() : false;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function login() {
    setError("");
    if (username === "admin" && password === "admin") {
      setAdmin(true);
      setOpen(false);
      setMenuOpen(true);
      setUsername("");
      setPassword("");
      return;
    }
    setError("Credenziali non valide (usa admin / admin)");
  }

  function logout() {
    setAdmin(false);
    setMenuOpen(false);
    setOpen(false);
  }

  // click outside to close menu
  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest?.("[data-kmzero-login-root]")) return;
      setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function openLogin() {
    setMenuOpen(false);
    setOpen(true);
  }

  return (
    <div className="relative" data-kmzero-login-root>
      <button
        type="button"
        onClick={() => (admin ? setMenuOpen((v) => !v) : openLogin())}
        className="rounded-full border px-4 py-2 text-sm font-semibold"
        style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
      >
        {admin ? "Admin" : "Login"}
      </button>

      {admin && menuOpen ? (
        <div
          className="absolute right-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-2xl border shadow-lg"
          style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        >
          <Link
            href="/admin"
            className="block px-4 py-3 text-sm font-semibold hover:opacity-80"
            style={{ color: "var(--ink)" }}
            onClick={() => setMenuOpen(false)}
          >
            Pannello di controllo
          </Link>
          <div className="h-px" style={{ background: "var(--line)" }} />
          <button
            type="button"
            onClick={logout}
            className="block w-full px-4 py-3 text-left text-sm font-semibold hover:opacity-80"
            style={{ color: "var(--ink)" }}
          >
            Logout
          </button>
        </div>
      ) : null}

      {open && mounted
        ? createPortal(
            <div className="fixed inset-0 z-[9999]">
              <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
                onClick={() => setOpen(false)}
              />
              <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2">
                <div
                  className="rounded-2xl border p-6 shadow-2xl"
                  style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">Accesso</div>
                      <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                        Demo: usa <span className="font-semibold" style={{ color: "var(--ink)" }}>admin</span> /{" "}
                        <span className="font-semibold" style={{ color: "var(--ink)" }}>admin</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-full border px-3 py-1 text-sm font-semibold"
                      style={{ borderColor: "var(--line)" }}
                      aria-label="Chiudi"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <label className="grid gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                        Username
                      </span>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2"
                        style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                        autoFocus
                      />
                    </label>

                    <label className="grid gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                        Password
                      </span>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2"
                        style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") login();
                        }}
                      />
                    </label>

                    {error ? (
                      <div className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "var(--line)" }}>
                        {error}
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={login}
                      className="mt-1 w-full rounded-xl px-4 py-2 text-sm font-semibold"
                      style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
                    >
                      Entra
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
