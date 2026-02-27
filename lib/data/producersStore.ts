"use client";

import { producers as defaultProducers } from "./producers";
import type { Producer } from "../types";

const STORAGE_KEY = "kmzero_producers_v1";

export function loadProducersClient(): Producer[] {
  if (typeof window === "undefined") return defaultProducers;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProducers;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Producer[];
    return defaultProducers;
  } catch {
    return defaultProducers;
  }
}

export function saveProducersClient(list: Producer[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function resetProducersClient() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
