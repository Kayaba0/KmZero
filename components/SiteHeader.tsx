import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: "var(--line)", background: "var(--surface)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="KmZero"
              className="h-9 w-9"
              style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,.25))" }}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">KmZero</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                Produttori locali • Prenotazioni
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: "var(--muted)" }}>
          <Link href="/#services" className="hover:opacity-80">
            Servizi
          </Link>
          <Link href="/#about" className="hover:opacity-80">
            Chi siamo
          </Link>
          <Link href="/#numbers" className="hover:opacity-80">
            Numeri
          </Link>
          <Link href="/producers" className="hover:opacity-80">
            Produttori
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden rounded-full border px-4 py-2 text-sm font-semibold md:inline-flex"
            style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
          >
            Contatti
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
