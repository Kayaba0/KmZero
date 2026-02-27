"use client";

const ADMIN_KEYS = ["kmzero_demo_auth", "kmzero_auth", "kmzero_demo_user"];

export function isAdminClient(): boolean {
  if (typeof window === "undefined") return false;

  // check localStorage markers
  for (const k of ADMIN_KEYS) {
    const v = window.localStorage.getItem(k);
    if (!v) continue;
    if (v === "admin") return true;
    try {
      const parsed = JSON.parse(v);
      if (parsed === "admin") return true;
      if (parsed?.role === "admin" || parsed?.user === "admin" || parsed?.username === "admin") return true;
    } catch {}
  }

  // check cookie markers (if your fake login uses cookies)
  try {
    const cookie = document.cookie || "";
    if (cookie.includes("kmzero_auth=admin")) return true;
    if (cookie.includes("kmzero_demo_auth=admin")) return true;
  } catch {}

  return false;
}

export function setAdminClient(enabled: boolean) {
  if (typeof window === "undefined") return;
  if (enabled) {
    window.localStorage.setItem("kmzero_demo_auth", "admin");
  } else {
    window.localStorage.removeItem("kmzero_demo_auth");
  }
}
