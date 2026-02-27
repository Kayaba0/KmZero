"use client";

import * as React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import type { Producer } from "@/lib/types";
import { loadProducersClient } from "@/lib/data/producersStore";

function ProducerCard({ p }: { p: Producer }) {
  return (
    <Link
      href={`/producers/${p.slug}`}
      className="group block overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--line)", background: "var(--card)" }}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={p.coverImage}
          alt={p.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold">{p.name}</div>
            <div className="mt-1 truncate text-sm" style={{ color: "var(--muted)" }}>
              {p.tagline}
            </div>
          </div>
          <div className="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: "var(--line)" }}>
            {p.distanceKm} km
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProducersPage() {
  const [producers, setProducers] = React.useState<Producer[]>([]);

  React.useEffect(() => {
    setProducers(loadProducersClient());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "kmzero_producers_v1") setProducers(loadProducersClient());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Produttori
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Trova chi produce vicino a te</h1>
            <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--muted)" }}>
              Sfoglia e apri la scheda per dettagli, orari e prodotti disponibili.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {producers.map((p) => (
            <ProducerCard key={p.slug} p={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
