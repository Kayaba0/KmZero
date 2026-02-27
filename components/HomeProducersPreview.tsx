"use client";

import * as React from "react";
import Link from "next/link";
import type { Producer } from "@/lib/types";
import { loadProducersClient } from "@/lib/data/producersStore";

export default function HomeProducersPreview() {
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
    <>
      {producers.slice(0, 3).map((p) => (
        <Link
          key={p.slug}
          href={`/producers/${p.slug}`}
          className="group rounded-3xl border p-4 transition"
          style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.03)" }}
        >
          <div className="text-lg font-semibold">{p.name}</div>
          <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {p.tags?.[0] ? `${p.tags[0]} • ` : ""}
            {p.distanceKm} km • {p.categories?.[0] ?? "Prodotti"}
          </div>
          <div className="mt-3 text-sm font-semibold" style={{ color: "var(--accent)" }}>
            Visita profilo →
          </div>
        </Link>
      ))}
    </>
  );
}
