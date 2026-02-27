import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import MapEmbed from "@/components/MapEmbed";
import ProductCard from "@/components/ProductCard";
import CartShell from "@/components/cart/CartShell";
import { producers } from "@/lib/data/producers";

export default function ProducerDetailPage({ params }: { params: { slug: string } }) {
  const producer = producers.find((p) => p.slug === params.slug);

  if (!producer) {
    return (
      <main>
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-2xl font-semibold">Produttore non trovato</h1>
          <Link href="/producers" className="mt-4 inline-flex" style={{ color: "var(--accent)" }}>
            Torna ai produttori →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <CartShell>
      <main>
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link href="/producers" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
            ← Tutti i produttori
          </Link>

          {/* TOP: Info (60%) + Mappa (40%) */}
          <div className="mt-6 grid gap-6 lg:grid-cols-10">
            <section className="lg:col-span-6 rounded-[32px] border overflow-hidden" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.03)" }}>
              <div className="relative h-48 w-full overflow-hidden">
                {/* cover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={producer.coverImage} alt={producer.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.65))" }} />
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  Produttore
                </div>
                <h1 className="mt-1 text-3xl font-semibold">{producer.name}</h1>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  {producer.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {producer.description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                      Zona
                    </div>
                    <div className="mt-1 font-semibold">{producer.location}</div>
                    <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                      {producer.distanceKm} km
                    </div>
                  </div>

                  <div className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                      Orari
                    </div>
                    <div className="mt-1 font-semibold">{producer.opening}</div>
                    <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                      Ritiro: {producer.pickup ? producer.pickupDays?.join(" · ") : "—"} • Consegna:{" "}
                      {producer.delivery ? "Sì" : "No"}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="rounded-2xl border px-5 py-3 text-sm font-semibold"
                    style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.06)" }}
                    type="button"
                  >
                    Prenota (coming soon) →
                  </button>
                </div>
              </div>
            </section>

            <section className="lg:col-span-4">
              <MapEmbed lat={producer.lat} lng={producer.lng} label={producer.location} />
            </section>
          </div>

          {/* CATALOGO */}
          <section className="mt-10 rounded-[32px] border p-6" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-2xl font-semibold">Prodotti disponibili</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {producer.products.map((p) => (
                <ProductCard
                  key={p.name}
                  producerSlug={producer.slug}
                  producerName={producer.name}
                  name={p.name}
                  price={p.price}
                  description={p.description}
                  imageSrc={p.image}
                  availability={p.availability}
/>
              ))}
            </div>

            <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
              Prezzi e disponibilità dei prodotti possono variare. Contattaci per informazioni aggiornate.
            </p>
          </section>
        </div>
      </main>
    </CartShell>
  );
}
