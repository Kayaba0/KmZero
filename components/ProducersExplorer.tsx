"use client";

import { useMemo, useState } from "react";
import type { Producer } from "@/lib/types";
import Link from "next/link";

function ProducerCard({ p }: { p: Producer }) {
  return (
    <Link
      href={`/producers/${p.slug}`}
      className="group overflow-hidden rounded-3xl border"
      style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
    >
      <img src={p.coverImage} alt="" className="h-44 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">{p.name}</div>
            <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              {p.tagline}
            </div>
          </div>
          <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            {p.distanceKm} km
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent2)" }}>
          Vedi dettagli <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

export default function ProducersExplorer({ producers }: { producers: Producer[] }) {
  const [q, setQ] = useState("");  

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return producers
      .filter((p) => {
        if (!query) return true;
        return (
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [producers, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Produttori
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Una selezione dalla tua zona
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Cerca tra i produttori locali e scopri prodotti a km zero.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-[360px]">
          <label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Cerca
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Es. ortaggi, frutta, Bologna..."
            className="w-full rounded-2xl border px-4 py-3 text-sm outline-none"
            style={{ borderColor: "var(--line)", background: "var(--surface2)", color: "var(--ink)" }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {filtered.map((p) => (
          <ProducerCard key={p.slug} p={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-3xl border p-6 text-sm" style={{ borderColor: "var(--line)", background: "var(--surface2)", color: "var(--muted)" }}>
          Nessun risultato. Prova a cambiare ricerca.
        </div>
      )}
    </div>
  );
}
