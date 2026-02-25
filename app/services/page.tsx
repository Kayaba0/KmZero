import SiteHeader from "@/components/SiteHeader";
import { SERVICES } from "@/lib/data/services";
import Link from "next/link";

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
          Servizi
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">Come ti aiutiamo</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "var(--muted)" }}>
          Una panoramica delle funzionalità principali (versione demo).
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-3xl border p-6 transition hover:-translate-y-0.5"
              style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
            >
              <div className="text-sm font-semibold">{s.title}</div>
              <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {s.subtitle}
              </div>
              <div className="mt-4 text-sm font-semibold" style={{ color: "var(--accent2)" }}>
                Apri dettaglio →
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
