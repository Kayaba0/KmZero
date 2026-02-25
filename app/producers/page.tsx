"use client";

import * as React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { producers } from "@/lib/data/producers";
import type { Producer } from "@/lib/types";

type SortKey = "nome" | "distanza" | "stato";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
      style={{ borderColor: "var(--line)", background: "transparent", color: "var(--muted)" }}
    >
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: Producer["status"] }) {
  const bg =
    status === "Aperto" ? "rgba(114,129,86,.22)" : status === "Su prenotazione" ? "rgba(152,167,124,.18)" : "rgba(253,251,240,.08)";
  const color =
    status === "Aperto" ? "var(--accent2)" : status === "Su prenotazione" ? "var(--muted)" : "var(--muted)";

  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
      style={{ borderColor: "var(--line)", background: bg, color }}>
      {status}
    </span>
  );
}

export default function ProducersPage() {
  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState<string>("Tutte");
  const [onlyBio, setOnlyBio] = React.useState(false);
  const [onlyDelivery, setOnlyDelivery] = React.useState(false);
  const [sort, setSort] = React.useState<SortKey>("stato");

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    producers.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["Tutte", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = React.useMemo(() => {
    const text = q.trim().toLowerCase();
    return producers
      .filter((p) => {
        const matchesText =
          !text ||
          p.name.toLowerCase().includes(text) ||
          p.tagline.toLowerCase().includes(text) ||
          p.location.toLowerCase().includes(text) ||
          p.categories.some((c) => c.toLowerCase().includes(text));
        const matchesCategory = category === "Tutte" || p.categories.includes(category);
        const matchesBio = !onlyBio || p.tags.includes("Bio");
        const matchesDelivery = !onlyDelivery || p.delivery;
        return matchesText && matchesCategory && matchesBio && matchesDelivery;
      })
      .sort((a, b) => {
        if (sort === "nome") return a.name.localeCompare(b.name);
        if (sort === "distanza") return a.distanceKm - b.distanceKm;
        // stato: Aperto > Su prenotazione > Chiuso
        const rank = (s: Producer["status"]) => (s === "Aperto" ? 0 : s === "Su prenotazione" ? 1 : 2);
        return rank(a.status) - rank(b.status);
      });
  }, [q, category, onlyBio, onlyDelivery, sort]);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Produttori
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Una selezione dalla tua zona</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Cerca per categoria, filtra per consegna o bio e apri la scheda per vedere prodotti e disponibilità.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Ordina
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="select-dark rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ borderColor: "var(--line)" }}
            >
              <option value="stato">Disponibilità</option>
              <option value="distanza">Distanza</option>
              <option value="nome">Nome</option>
            </select>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 grid gap-3 rounded-3xl border p-4 md:grid-cols-12 md:items-center"
          style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}>
          <div className="md:col-span-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cerca produttori, zone o categorie…"
              className="w-full rounded-2xl border px-4 py-3 text-sm outline-none"
              style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select-dark w-full rounded-2xl border px-4 py-3 text-sm font-semibold"
              style={{ borderColor: "var(--line)" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex flex-wrap items-center justify-start gap-2 md:justify-end">
            <button
              onClick={() => setOnlyBio((v) => !v)}
              className="rounded-full border px-4 py-2 text-sm font-semibold"
              style={{
                borderColor: "var(--line)",
                background: onlyBio ? "rgba(114,129,86,.20)" : "transparent",
                color: "var(--ink)",
              }}
            >
              Solo Bio
            </button>
            <button
              onClick={() => setOnlyDelivery((v) => !v)}
              className="rounded-full border px-4 py-2 text-sm font-semibold"
              style={{
                borderColor: "var(--line)",
                background: onlyDelivery ? "rgba(114,129,86,.20)" : "transparent",
                color: "var(--ink)",
              }}
            >
              Consegna
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/producers/${p.slug}`}
              className="group overflow-hidden rounded-3xl border transition hover:-translate-y-0.5"
              style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
            >
              <img src={p.coverImage} alt="" className="h-44 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                      {p.location} • {p.distanceKm} km
                    </div>
                  </div>
                  <StatusPill status={p.status} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>

                <div className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
                  Ritiro: {p.pickup ? (p.pickupDays?.join(" · ") ?? "—") : "—"} • Consegna: {p.delivery ? "Sì" : "No"}
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent2)" }}>
                  Apri scheda <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border p-8 text-center"
            style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}>
            <div className="text-sm font-semibold">Nessun risultato</div>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Prova a cambiare filtri o a cercare per zona (es. “Navigli”, “Isola”).
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
