import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import MapEmbed from "@/components/MapEmbed";
import { producers } from "@/lib/data/producers";

export default function ProducerDetailPage({ params }: { params: { slug: string } }) {
  const producer = producers.find((p) => p.slug === params.slug);

  if (!producer) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-4 py-14">
          <div className="rounded-3xl border p-8 text-center" style={{ borderColor: "var(--line)", background: "var(--surface2)" }}>
            <div className="text-sm font-semibold">Produttore non trovato</div>
            <Link href="/producers" className="mt-4 inline-flex text-sm font-semibold" style={{ color: "var(--accent2)" }}>
              Torna ai produttori →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6">
          <Link href="/producers" className="text-sm font-semibold hover:opacity-80" style={{ color: "var(--accent2)" }}>
            ← Tutti i produttori
          </Link>
        </div>

        {/* Main card */}
        <div className="grid gap-6 md:grid-cols-12">
          <section
            className="overflow-hidden rounded-3xl border md:col-span-7"
            style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
          >
            <img src={producer.coverImage} alt="" className="h-56 w-full object-cover" />
            <div className="p-6">
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Produttore
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">{producer.name}</h1>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {producer.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border px-4 py-3" style={{ borderColor: "var(--line)", background: "transparent" }}>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Zona
                  </div>
                  <div className="mt-1 text-sm font-semibold">{producer.location}</div>
                  <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                    {producer.distanceKm} km
                  </div>
                </div>

                <div className="rounded-2xl border px-4 py-3" style={{ borderColor: "var(--line)", background: "transparent" }}>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Orari
                  </div>
                  <div className="mt-1 text-sm font-semibold">{producer.opening}</div>
              <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                Ritiro: {producer.pickup ? (producer.pickupDays?.join(" · ") ?? "—") : "—"} • Consegna: {producer.delivery ? "Sì" : "No"}
              </div>
                </div>
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold"
                style={{ borderColor: "var(--line)", background: "linear-gradient(135deg, var(--brand), var(--brand2))", color: "rgba(253,251,240,.96)" }}>
                Prenota (coming soon)
                <span aria-hidden>→</span>
              </div>
            </div>
          </section>

          {/* Products */}
          <aside className="md:col-span-5">
            <div className="rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Prodotti
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Disponibilità</h2>

              <div className="mt-6 space-y-3">
                {producer.products.map((pr) => (
                  <div
                    key={pr.name}
                    className="rounded-2xl border px-4 py-3"
                    style={{ borderColor: "var(--line)", background: "transparent" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{pr.name}</div>
                        <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                          {pr.price}
                        </div>
                      </div>
                      <div className="text-xs font-semibold" style={{ color: pr.availability === "Disponibile" ? "var(--accent2)" : "var(--muted)" }}>
                        {pr.availability}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
                * Dati demo. Nella prossima fase aggiungiamo inventario reale, quantità e prenotazione.
              </p>
            </div>
          </aside>
        </div>

        {/* Map under the main card */}
        <div className="mt-6">
          <MapEmbed lat={producer.lat} lng={producer.lng} label={`Zona: ${producer.location}`} />
        </div>
      </main>
    </div>
  );
}
