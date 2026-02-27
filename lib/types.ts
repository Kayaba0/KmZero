export type ProducerTag = "Bio" | "Stagionale" | "Km Zero" | "Selezione locale";

export type Producer = {
  slug: string;
  name: string;
  tagline: string;
  distanceKm: number;
  tags: ProducerTag[];
  categories: string[]; // e.g. ["Ortaggi", "Frutta", "Uova"]
  pickup: boolean;
  delivery: boolean;
  coverImage: string; // public path
  location: string;
  // coordinate per mappa
  lat: number;
  lng: number;

  description: string;
  opening: string; // human-friendly

  // info “vetrina”
  pickupDays: string[]; // es. ["Mar", "Gio", "Sab"]
  status: "Aperto" | "Chiuso" | "Su prenotazione";

  products: Array<{
    name: string;
    price: string;
    availability: "Disponibile" | "Su richiesta" | "Terminato";
    description?: string;
    image?: string; // public path (es. /products/tomato.svg)
    tags?: string[];
  }>;
};
