import SiteHeader from "@/components/SiteHeader";
import { getServiceBySlug, SERVICES } from "@/lib/data/services";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return notFound();

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
          Servizi
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{service.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "var(--muted)" }}>
          {service.subtitle}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}>
              <div className="text-sm font-semibold">In pratica</div>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--muted)" }}>
                {service.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden style={{ color: "var(--accent2)" }}>
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.faq?.length ? (
              <div className="mt-6 rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}>
                <div className="text-sm font-semibold">Domande frequenti</div>
                <div className="mt-4 space-y-4">
                  {service.faq.map((f) => (
                    <div key={f.q} className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                      <div className="text-sm font-semibold">{f.q}</div>
                      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                        {f.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="md:col-span-1">
            <div className="rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}>
              <div className="text-sm font-semibold">Prossimi step</div>
              <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Qui possiamo aggiungere:
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>selettori reali (zona, ritiro/consegna)</li>
                  <li>flussi di prenotazione</li>
                  <li>area profilo e storico ordini</li>
                </ul>
              </div>

              <Link
                href="/#services"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, var(--brand), var(--brand2))", color: "rgba(253,251,240,.96)", boxShadow: "var(--shadow2)" }}
              >
                Torna ai servizi
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
