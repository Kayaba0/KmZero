import Image from "next/image";

type Props = {
  imageSrc?: string;
  name: string;
  price: string;
  description?: string;
  availability?: string; // "Disponibile" | "Terminato" | "Su richiesta" | ...
  tags?: string[];
};

export default function ProductCard({
  imageSrc,
  name,
  price,
  description,
  availability,
  tags = [],
}: Props) {
  const isAvailable = availability === "Disponibile";

  return (
    <article
      className="overflow-hidden rounded-2xl border shadow-sm"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        background: isAvailable ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.06)",
      }}
    >
      {/* Immagine (immutata anche se non disponibile) */}
      <div className="relative w-full aspect-[16/9]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm opacity-70">
            Nessuna immagine
          </div>
        )}
      </div>

      {/* Contenuto: grigiato se non disponibile */}
      <div className={"p-4 " + (!isAvailable ? "opacity-60" : "")}>
        <div className="text-xl font-semibold leading-tight">{name}</div>

        <div className="mt-1 text-lg font-semibold" style={{ color: "var(--accent2)" }}>
          {price}
        </div>

        {/* Tag: molto più piccoli, 1 riga, no wrap */}
        {tags.length ? (
          <div className="mt-3 flex flex-nowrap items-center gap-2 overflow-hidden">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] leading-none font-semibold whitespace-nowrap"
                style={{
                  borderColor: "rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.05)",
                }}
                title={t}
              >
                <span aria-hidden>🍃</span>
                <span>{t}</span>
              </span>
            ))}
          </div>
        ) : null}

        {description ? <p className="mt-3 text-sm opacity-80">{description}</p> : null}

        <button
          type="button"
          className="mt-4 w-full rounded-xl border px-3 py-3 flex items-center justify-center gap-2 font-medium"
          style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)" }}
        >
          <Image src="/icons/shopping-cart.png" alt="" width={18} height={18} className="h-4 w-4" />
          Aggiungi al carrello
        </button>
      </div>
    </article>
  );
}
