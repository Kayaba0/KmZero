import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import MapEmbed from "@/components/MapEmbed";
import ProductCard from "@/components/ProductCard";
import { producers } from "@/lib/data/producers";

export default function ProducerDetailPage({ params }: { params: { slug: string } }) {
  const producer = producers.find((p) => p.slug === params.slug);

  if (!producer) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-4 py-14">
          <div
            className="rounded-3xl border p-8 text-center"
            style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
          >
            <div className="text-sm font-semibold">Produttore non trovato</div>
            <Link href="/producers" className="mt-4 inline-flex text-sm font-semibold hover:opacity-80" style={{ color: "var(--accent2)" }}>
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

        {/* TOP: Info (60%) + Mappa (40%) */}
        <div className="grid gap-6 md:grid-cols-10 items-stretch">
          <section
            className="overflow-hidden rounded-3xl border md:col-span-6 h-full flex flex-col"
            style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
          >
            <img src={producer.coverImage} alt="" className="h-56 w-full object-cover" />

            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Produttore
              </div>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight">{producer.name}</h1>
              <p className="mt-2 text-sm font-semibold" style={{ color: "var(--accent2)" }}>
                {producer.tagline}
              </p>

              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {producer.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {producer.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{ borderColor: "var(--line)", color: "var(--muted)", background: "transparent" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

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
                    Ritiro: {producer.pickup ? producer.pickupDays?.join(" · ") : "—"} • Consegna: {producer.delivery ? "Sì" : "No"}
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold hover:opacity-90"
                  style={{
                    borderColor: "var(--line)",
                    background: "linear-gradient(135deg, var(--brand), var(--brand2))",
                    color: "rgba(253,251,240,.96)",
                  }}
                >
                  Prenota (coming soon) <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </section>

          <aside className="md:col-span-4 h-full">
            <MapEmbed lat={producer.lat} lng={producer.lng} label={`Zona: ${producer.location}`} />
          </aside>
        </div>

        {/* CATALOGO */}
        <section
          className="mt-10 overflow-hidden rounded-3xl border"
          style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
        >
          <div className="p-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight">Prodotti disponibili</h2>
              <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                * Dati demo
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {producer.products.map((p) => (
              <ProductCard
                key={p.name}
                name={p.name}
                price={p.price}
                description={p.description}
                availability={p.availability}
                imageSrc={p.image}
                tags={p.tags}
              />
            ))}
            </div>

            <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
              Prezzi e disponibilità dei prodotti possono variare. Contattaci per informazioni aggiornate.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
