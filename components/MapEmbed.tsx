type Props = {
  lat: number;
  lng: number;
  label?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function MapEmbed({ lat, lng, label = "Posizione" }: Props) {
  // Google Maps embed (senza API key per un semplice q=lat,lng)
  const q = encodeURIComponent(`${lat},${lng}`);
  const src = `https://www.google.com/maps?q=${q}&z=14&hl=it&output=embed`;
  const href = `https://www.google.com/maps?q=${q}&z=14&hl=it`;

  return (
    <div
      className="overflow-hidden rounded-3xl border h-full flex flex-col"
      style={{ borderColor: "var(--line)", background: "var(--surface2)", boxShadow: "var(--shadow2)" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
        <div className="text-sm font-semibold">{label}</div>
        <a
          className="text-sm font-semibold hover:opacity-80"
          style={{ color: "var(--accent2)" }}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          Apri su Google Maps →
        </a>
      </div>
      <iframe
        title={label}
        src={src}
        className="w-full flex-1 min-h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
