import Image from "next/image";

type Props = {
  imageSrc?: string;
  name: string;
  price: string;
  description?: string;
  availability?: string;
  tags?: string[];
};

export default function ProductCard({ imageSrc, name, price, description, availability, tags = [] }: Props) {
  const badgeColor =
    availability === "Disponibile" ? "var(--accent2)" : availability === "Terminato" ? "rgba(239,68,68,.9)" : "var(--muted)";

  return (
    <div
      className="h-full overflow-hidden rounded-3xl border"
      style={{ borderColor: "var(--line)", background: "var(--surface)", boxShadow: "var(--shadow2)" }}
    >
      {/* Immagine */}
      <div className="relative h-[190px] w-full">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm" style={{ color: "var(--muted)" }}>
            Nessuna immagine
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-2xl font-semibold tracking-tight">{name}</div>
        <div className="mt-1 text-lg font-semibold" style={{ color: "var(--accent2)" }}>
          {price}
        </div>

        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                style={{ borderColor: "var(--line)", color: "var(--muted)", background: "rgba(255,255,255,.03)" }}
              >
                <span aria-hidden>🍃</span>
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {description ? (
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {description}
          </p>
        ) : null}

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold hover:opacity-90"
          style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.04)" }}
        >
          <span aria-hidden>🛍️</span> Aggiungi al carrello
        </button>

        {availability ? (
          <div className="mt-4 text-xs font-semibold" style={{ color: badgeColor }}>
            {availability}
          </div>
        ) : null}
      </div>
    </div>
  );
}
