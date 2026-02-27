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
    coverImage: "/producers/real_1.jpg",
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
      {
        name: "Pomodori",
        price: "€2,50 / kg",
        availability: "Disponibile",
        image: "/products/tomatoes.jpg",
        description: "Deliziosi pomodori rossi coltivati biologicamente e raccolti a maturazione.",
        tags: ["Vegetale", "Biologico", "Locale"],
      },
      {
        name: "Insalata gentile",
        price: "€1,20 / cespo",
        availability: "Disponibile",
        image: "/products/lettuce.jpg",
        description: "Insalata fresca e croccante coltivata localmente senza pesticidi.",
        tags: ["Vegetale", "Biologico", "Locale"],
      },
      {
        name: "Carote",
        price: "€2,00 / kg",
        availability: "Disponibile",
        image: "/products/carrots.jpg",
        description: "Carote dolci e croccanti cresciute senza l'uso di sostanze chimiche.",
        tags: ["Vegetale", "Biologico", "Locale"],
      },
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
    coverImage: "/producers/real_2.jpg",
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
      { name: "Mele (varietà del mese)", price: "€2,60 / kg", availability: "Disponibile", image: "/products/apple.svg", description: "Croccanti e profumate, maturazione naturale.", tags: ["Stagionale"] },
      { name: "Pere", price: "€2,90 / kg", availability: "Disponibile", image: "/products/pear.svg", description: "Polpa succosa e dolcezza equilibrata.", tags: ["Km Zero"] },
      { name: "Confettura artigianale", price: "€5,50", availability: "Su richiesta", image: "/products/jam.svg", description: "Solo frutta, cottura lenta e vasetti piccoli.", tags: ["Bio"] },
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
    coverImage: "/producers/real_3.jpg",
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
      { name: "Pomodori da insalata", price: "€3,20 / kg", availability: "Disponibile", image: "/products/tomatoes.jpg", description: "Sodi e saporiti, ideali per caprese e insalate.", tags: ["Km Zero"] },
      { name: "Pane integrale", price: "€3,80", availability: "Disponibile", image: "/products/bread.svg", description: "Lievitazione naturale, farina macinata a pietra.", tags: ["Selezione locale"] },
      { name: "Uova (6 pz)", price: "€2,90", availability: "Su richiesta", image: "/products/eggs.svg", description: "Da allevamenti locali, lotti limitati.", tags: ["Km Zero"] },
    ],
  },
];
