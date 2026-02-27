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
        <main className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-2xl font-semibold">Produttore non trovato</h1>
          <Link className="mt-4 inline-flex underline opacity-80" href="/producers">
            Torna ai produttori →
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-8">
        <Link href="/producers" className="inline-flex items-center gap-2 opacity-80 hover:opacity-100">
          ← Tutti i produttori
        </Link>

        {/* TOP: Info (60%) + Mappa (40%) — lasciato invariato */}
        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
              <img src={producer.coverImage} alt={producer.name} className="h-full w-full object-cover" />
            </div>

            <div className="p-8">
              <div className="text-xs uppercase tracking-wider opacity-70">Produttore</div>
              <h1 className="mt-2 text-4xl font-semibold leading-tight">{producer.name}</h1>
              <p className="mt-3 text-lg opacity-80">{producer.tagline}</p>
              <p className="mt-3 opacity-70">{producer.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {producer.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-wider opacity-70">Zona</div>
                  <div className="mt-2 font-medium">{producer.location}</div>
                  <div className="opacity-70">{producer.distanceKm} km</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-wider opacity-70">Orari</div>
                  <div className="mt-2 font-medium">{producer.opening}</div>
                  <div className="opacity-70">
                    Ritiro: {producer.pickup ? producer.pickupDays?.join(" · ") : "—"} • Consegna:{" "}
                    {producer.delivery ? "Sì" : "No"}
                  </div>
                </div>
              </div>

              <button
                className="mt-7 inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold"
                style={{ background: "var(--accent)", color: "white" }}
              >
                Prenota (coming soon) →
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              <div className="font-semibold">{producer.location}</div>
              <a
                className="text-sm opacity-80 hover:opacity-100 underline"
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps?q=${producer.lat},${producer.lng}`}
              >
                Apri su Google Maps →
              </a>
            </div>
            <div className="h-[420px]">
              <MapEmbed lat={producer.lat} lng={producer.lng} />
            </div>
          </div>
        </section>

        {/* CATALOGO */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-3xl font-semibold">Prodotti disponibili</h2>

          {/* 4 colonne su desktop */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {producer.products.map((p) => (
              <ProductCard
                key={p.name}
                imageSrc={p.image}
                name={p.name}
                price={p.price}
                description={p.description}
                availability={p.availability}
                tags={p.tags}
              />
            ))}
          </div>

          <p className="mt-6 text-sm opacity-70">
            Prezzi e disponibilità dei prodotti possono variare. Contattaci per informazioni aggiornate.
          </p>
        </section>
      </main>
    </div>
  );
}
