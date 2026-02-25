import SiteHeader from "@/components/SiteHeader";
import type { ReactNode } from "react";

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition hover:opacity-95"
      style={{
        background: "linear-gradient(135deg, var(--brand), var(--brand2))",
        color: "rgba(253,251,240,.96)",
        boxShadow: "var(--shadow)",
      }}
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border px-7 py-3 text-sm font-semibold transition hover:opacity-95"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface)",
        color: "var(--ink)",
      }}
    >
      {children}
    </a>
  );
}

function ServiceCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <article
      className="rounded-2xl border p-5 transition hover:-translate-y-0.5"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface2)",
        boxShadow: "var(--shadow2)",
      }}
    >
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {desc}
      </p>
      <a
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--accent2)" }}
      >
        Scopri di più <span aria-hidden>→</span>
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

{/* HERO — centered, NO pills/boxes */}
      <section className="relative pb-24">
        <div
          className="absolute inset-0"
          style={{
            background: "#465940", 
			/*background: `
  radial-gradient(1100px 520px at 50% 35%, rgba(114,129,86,.32), transparent 60%),
  radial-gradient(900px 520px at 20% 10%, rgba(70,89,64,.30), transparent 62%),
  linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.35) 35%, rgba(0,0,0,.05) 75%, transparent),
  #465940`,*/
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center md:py-20">
          <h1
            className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
            style={{ color: "var(--ink)" }}
          >
            Cibo locale, prenotabile.
            <span className="block" style={{ color: "var(--muted)" }}>
              Semplice, pulito, affidabile.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "var(--muted)" }}>
            Trova produttori della tua zona e prenota ortaggi, frutta e cassette settimanali.
            Trasparenza su origine, disponibilità e ritiro/consegna.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <PrimaryButton href="/producers">Scopri i produttori</PrimaryButton>
            <SecondaryButton href="#services">Come funziona</SecondaryButton>
          </div>
        </div>
      </section>

      
{/* CONTENT SHEET (double-layer) */}
<div
  className="relative z-10 md:-mt-24 -mt-20"
  style={{
    borderColor: "var(--line)",
    background: "var(--bg)",
    
  }}
>
  <div className="pt-0">
{/* SERVICES */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Servizi
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Come ti aiutiamo</h2>
          </div>
          <a
            href="#"
            className="hidden rounded-full border px-4 py-2 text-sm font-semibold md:inline-flex"
            style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
          >
            Tutti i servizi
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <ServiceCard
            title="Prenotazione rapida"
            desc="Seleziona prodotti e invia una richiesta in pochi passaggi."
            href="/services/prenotazione-rapida"
          />
          <ServiceCard
            title="Cassette settimanali"
            desc="Piani flessibili con contenuto stagionale e tracciabile."
            href="/services/cassette-settimanali"
          />
          <ServiceCard
            title="Ritiro o consegna"
            desc="Scegli punto di ritiro o consegna (se disponibile)."
            href="/services/ritiro-o-consegna"
          />
          <ServiceCard
            title="Preferiti & storico"
            desc="Salva produttori e riordina senza perdere tempo."
            href="/services/preferiti-e-storico"
          />
        </div>
      </section>

      {/* ABOUT — use provided PNG inside a rounded card */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Chi siamo
            </div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">
              Un modo migliore di comprare,
              <span className="block" style={{ color: "var(--accent2)" }}>senza complicazioni.</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              L’obiettivo è connettere persone e produttori locali con un’esperienza pulita:
              disponibilità reale, filiera chiara e opzioni pratiche di ritiro/consegna.
            </p>

            <a
              href="/producers"
              className="mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-95"
              style={{
                background: "linear-gradient(135deg, var(--brand), var(--brand2))",
                color: "rgba(253,251,240,.96)",
                boxShadow: "var(--shadow2)",
              }}
            >
              Vedi produttori
            </a>
          </div>

          <div>
            <div
              className="rounded-3xl border p-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface2)",
                boxShadow: "var(--shadow2)",
              }}
            >
              <img src="/about/about.png" alt="Chi siamo" className="mx-auto block w-full max-w-[520px] h-auto max-h-[360px] md:max-h-[420px] object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" className="mx-auto max-w-6xl px-4 pb-16">
        <div
          className="grid gap-6 rounded-3xl border px-6 py-7 md:grid-cols-4"
          style={{
            borderColor: "var(--line)",
            background: "linear-gradient(135deg, var(--brand2), var(--brand))",
            color: "rgba(253,251,240,.92)",
            boxShadow: "var(--shadow)",
          }}
        >
          <div className="md:col-span-1">
            <div className="text-sm font-semibold">Cosa abbiamo fatto finora</div>
            <div className="mt-2 text-xs text-white/75">Numeri demo.</div>
			<div className="mt-2 text-xs text-white/75">(Da aggiornare appena abbiamo dati reali).</div>
          </div>
          {[
            { n: "350+", t: "prodotti disponibili" },
            { n: "12+", t: "produttori attivi" },
            { n: "5+", t: "zone coperte" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl bg-white/10 px-5 py-4">
              <div className="text-2xl font-semibold">{x.n}</div>
              <div className="mt-1 text-xs text-white/75">{x.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCERS — with reference images */}
      <section id="producers" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Produttori
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Una selezione dalla tua zona</h2>
          </div>
          <a
            href="/producers"
            className="hidden rounded-full border px-4 py-2 text-sm font-semibold md:inline-flex"
            style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
          >
            Tutti i produttori
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { slug: "azienda-agricola-rossi", title: "Azienda Agricola Rossi", meta: "Bio • 4 km • Ortaggi", img: "/producers/farm.svg" },
            { slug: "frutteto-del-sole", title: "Frutteto del Sole", meta: "Stagionale • 7 km • Frutta", img: "/producers/orchard.svg" },
            { slug: "mercato-verde", title: "Mercato Verde", meta: "Selezione locale • 2 km", img: "/producers/market.svg" },
          ].map((p) => (
            <a
              key={p.title}
              href={`/producers/${p.slug}`}
              className="group overflow-hidden rounded-3xl border"
              style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
            >
              <img src={p.img} alt="Immagine di riferimento" className="h-44 w-full object-cover" />
              <div className="p-5">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{p.meta}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent2)" }}>
                  Visita profilo <span aria-hidden>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-semibold">KmZero</div>
              <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Se vuoi, personalizziamo testi e contenuti con i tuoi dati reali.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
              <div>
                <div className="font-semibold">Prodotto</div>
                <ul className="mt-2 space-y-2" style={{ color: "var(--muted)" }}>
                  <li><a href="/producers" className="hover:underline">Produttori</a></li>
                  <li><a href="#services" className="hover:underline">Servizi</a></li>
                  <li><a href="#numbers" className="hover:underline">Numeri</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Azienda</div>
                <ul className="mt-2 space-y-2" style={{ color: "var(--muted)" }}>
                  <li><a href="#about" className="hover:underline">Chi siamo</a></li>
                  <li><a href="#" className="hover:underline">Partner</a></li>
                  <li><a href="#" className="hover:underline">Contatti</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Legale</div>
                <ul className="mt-2 space-y-2" style={{ color: "var(--muted)" }}>
                  <li><a href="#" className="hover:underline">Privacy</a></li>
                  <li><a href="#" className="hover:underline">Cookie</a></li>
                  <li><a href="#" className="hover:underline">Termini</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} KmZero
          </div>
        </div>
      </footer>
  </div>
</div>
    </div>
  );
}
