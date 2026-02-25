export type Service = {
  slug: string;
  title: string;
  subtitle: string;
  bullets: string[];
  faq?: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "prenotazione-rapida",
    title: "Prenotazione rapida",
    subtitle: "Seleziona prodotti e invia una richiesta in pochi passaggi.",
    bullets: [
      "Ricerca prodotti per categoria o produttore.",
      "Aggiungi al carrello e invia la richiesta in 1 click.",
      "Ricevi conferma (o alternative) dal produttore.",
    ],
    faq: [
      { q: "È un acquisto immediato?", a: "Per ora è una prenotazione: il produttore conferma disponibilità e ritiro/consegna." },
      { q: "Posso modificare l’ordine?", a: "Sì, prima della conferma puoi aggiornare la richiesta." },
    ],
  },
  {
    slug: "cassette-settimanali",
    title: "Cassette settimanali",
    subtitle: "Piani flessibili con contenuto stagionale e tracciabile.",
    bullets: [
      "Scegli formato (piccola/media/grande) e frequenza.",
      "Contenuto variabile in base alla stagione.",
      "Trasparenza su origine e disponibilità reale.",
    ],
    faq: [{ q: "Cosa succede se un prodotto manca?", a: "Viene proposto un sostituto simile o una variazione della cassetta." }],
  },
  {
    slug: "ritiro-o-consegna",
    title: "Ritiro o consegna",
    subtitle: "Scegli il modo più comodo per ricevere i prodotti.",
    bullets: [
      "Ritiro in azienda o in punto dedicato (se disponibile).",
      "Consegna a domicilio in fasce orarie (dove prevista).",
      "Costi e tempi chiari prima della conferma.",
    ],
    faq: [{ q: "La consegna è sempre disponibile?", a: "Dipende dal produttore e dalla zona. Ogni scheda indica chiaramente le opzioni." }],
  },
  {
    slug: "preferiti-e-storico",
    title: "Preferiti & storico",
    subtitle: "Salva produttori e riordina senza perdere tempo.",
    bullets: [
      "Aggiungi produttori ai preferiti.",
      "Rivedi ordini passati e ripeti in pochi secondi.",
      "Notifiche (in futuro) su disponibilità e novità.",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
