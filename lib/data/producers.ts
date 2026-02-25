import type { Producer } from "../types";

export const producers: Producer[] = [
  {
    slug: "azienda-agricola-rossi",
    name: "Azienda Agricola Rossi",
    tagline: "Ortaggi freschi e cassette settimanali",
    distanceKm: 4,
    tags: ["Bio", "Km Zero"],
    categories: ["Ortaggi", "Erbe aromatiche"],
    pickup: true,
    delivery: true,
    coverImage: "/producers/farm.svg",
    location: "Milano • Navigli",
    // coordinate fittizie (Milano)
    lat: 45.4536,
    lng: 9.1736,
    description:
      "Produzione a ciclo stagionale con disponibilità reale aggiornata. Ideale per cassette miste e verdure da foglia.",
    opening: "Mar–Sab 8:00–13:00 • 15:30–19:00",

    pickupDays: ["Mar", "Gio", "Sab"],
    status: "Aperto",
    products: [
      { name: "Insalata gentile", price: "€2,20 / cespo", availability: "Disponibile" },
      { name: "Zucchine", price: "€2,90 / kg", availability: "Disponibile" },
      { name: "Cassetta mista (5kg)", price: "€16,00", availability: "Su richiesta" },
    ],
  },
  {
    slug: "frutteto-del-sole",
    name: "Frutteto del Sole",
    tagline: "Frutta di stagione raccolta al punto giusto",
    distanceKm: 7,
    tags: ["Stagionale", "Km Zero"],
    categories: ["Frutta"],
    pickup: true,
    delivery: false,
    coverImage: "/producers/orchard.svg",
    location: "Milano • Isola",
    // coordinate fittizie (Milano)
    lat: 45.484,
    lng: 9.1886,
    description:
      "Frutta selezionata, maturazione naturale e lotti piccoli. Prenota e ritira in azienda o ai punti convenzionati.",
    opening: "Mer–Sab 9:00–12:30",

    pickupDays: ["Mer", "Ven", "Sab"],
    status: "Su prenotazione",
    products: [
      { name: "Mele (varietà del mese)", price: "€2,60 / kg", availability: "Disponibile" },
      { name: "Pere", price: "€2,90 / kg", availability: "Disponibile" },
      { name: "Confettura artigianale", price: "€5,50", availability: "Su richiesta" },
    ],
  },
  {
    slug: "mercato-verde",
    name: "Mercato Verde",
    tagline: "Selezione locale multi-produttore",
    distanceKm: 2,
    tags: ["Selezione locale"],
    categories: ["Ortaggi", "Frutta", "Pane"],
    pickup: true,
    delivery: true,
    coverImage: "/producers/market.svg",
    location: "Milano • Porta Romana",
    // coordinate fittizie (Milano)
    lat: 45.453,
    lng: 9.2043,
    description:
      "Una vetrina curata di produttori della zona: ordina online e ritira in giornata. Consegna su alcune zone.",
    opening: "Lun–Sab 8:30–19:30",

    pickupDays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
    status: "Aperto",
    products: [
      { name: "Pomodori da insalata", price: "€3,20 / kg", availability: "Disponibile" },
      { name: "Pane integrale", price: "€3,80", availability: "Disponibile" },
      { name: "Uova (6 pz)", price: "€2,90", availability: "Su richiesta" },
    ],
  },
];
