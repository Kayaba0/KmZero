"use client";

import * as React from "react";
import SiteHeader from "@/components/SiteHeader";
import { isAdminClient } from "@/lib/auth/demoAuth";
import { loadProducersClient, saveProducersClient, resetProducersClient, slugify } from "@/lib/data/producersStore";
import type { Producer } from "@/lib/types";

type ProductRow = Producer["products"][number];

function emptyProducer(): Producer {
  return {
    slug: "",
    name: "",
    tagline: "",
    distanceKm: 0,
    categories: [],
    pickup: true,
    delivery: false,
    coverImage: "/producers/real-1.jpg",
    location: "",
    lat: 0,
    lng: 0,
    description: "",
    opening: "",
    pickupDays: [],
    status: "Su prenotazione",
    products: [],
  };
}

function parseCommaList(v: string) {
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toComma(list: string[]) {
  return list.join(", ");
}

export default function AdminPage() {
  const [mounted, setMounted] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  const [list, setList] = React.useState<Producer[]>([]);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<Producer>(() => emptyProducer());
  const [imagePreview, setImagePreview] = React.useState<string>("");

  React.useEffect(() => {
    setMounted(true);
    const ok = isAdminClient();
    setAdmin(ok);
    setList(loadProducersClient());
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    saveProducersClient(list);
  }, [list, mounted]);

  function startNew() {
    const p = emptyProducer();
    setDraft(p);
    setImagePreview(p.coverImage);
    setEditingIndex(null);
  }

  function startEdit(i: number) {
    const p = list[i];
    setDraft(JSON.parse(JSON.stringify(p)));
    setImagePreview(p.coverImage);
    setEditingIndex(i);
  }

  function remove(i: number) {
    if (!confirm("Eliminare questo produttore?")) return;
    setList((prev) => prev.filter((_, idx) => idx !== i));
  }

  function saveDraft() {
    const next = { ...draft };
    if (!next.slug) next.slug = slugify(next.name || "produttore");
    if (!next.name) {
      alert("Nome obbligatorio");
      return;
    }
    if (!next.tagline) next.tagline = "Prodotti locali e stagionali";
    if (!next.coverImage) next.coverImage = "/producers/real-1.jpg";

    // enforce numeric fields
    next.distanceKm = Number(next.distanceKm || 0);
    next.lat = Number(next.lat || 0);
    next.lng = Number(next.lng || 0);

    if (editingIndex === null) {
      // avoid duplicate slug
      if (list.some((p) => p.slug === next.slug)) {
        alert("Slug già esistente. Modifica lo slug.");
        return;
      }
      setList((prev) => [next, ...prev]);
    } else {
      setList((prev) => prev.map((p, idx) => (idx === editingIndex ? next : p)));
    }
    setEditingIndex(null);
  }

  function onFile(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || "");
      setDraft((d) => ({ ...d, coverImage: url }));
      setImagePreview(url);
    };
    reader.readAsDataURL(file);
  }

  function resetAll() {
    if (!confirm("Ripristinare l'elenco produttori originale?")) return;
    resetProducersClient();
    setList(loadProducersClient());
    setEditingIndex(null);
    startNew();
  }

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
        <SiteHeader />
      </div>
    );
  }

  if (!admin) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold">Accesso admin richiesto</h1>
          <p className="mt-3" style={{ color: "var(--muted)" }}>
            Effettua il login con admin/admin per accedere alla gestione contenuti.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Gestione contenuti</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              Produttori (aggiungi / modifica / elimina). I dati vengono salvati in locale (demo).
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
              onClick={startNew}
              type="button"
            >
              + Nuovo
            </button>
            <button
              className="rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
              onClick={resetAll}
              type="button"
            >
              Ripristina
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* List */}
          <section className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
            <div className="text-sm font-semibold">Produttori</div>
            <div className="mt-3 divide-y" style={{ borderColor: "var(--line)" }}>
              {list.map((p, i) => (
                <div key={p.slug} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{p.name}</div>
                    <div className="truncate text-sm" style={{ color: "var(--muted)" }}>
                      {p.location} · {p.status}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      className="rounded-full border px-3 py-1.5 text-sm font-semibold"
                      style={{ borderColor: "var(--line)" }}
                      onClick={() => startEdit(i)}
                      type="button"
                    >
                      Modifica
                    </button>
                    <button
                      className="rounded-full border px-3 py-1.5 text-sm font-semibold"
                      style={{ borderColor: "var(--line)" }}
                      onClick={() => remove(i)}
                      type="button"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Editor */}
          <section className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{editingIndex === null ? "Nuovo produttore" : "Modifica produttore"}</div>
              <button
                className="rounded-full border px-3 py-1.5 text-sm font-semibold"
                style={{ borderColor: "var(--line)" }}
                onClick={saveDraft}
                type="button"
              >
                Salva
              </button>
            </div>

            <div className="mt-4 grid gap-3">

              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  Categorie (comma)
                </span>
                <input
                  value={toComma(draft.categories)}
                  onChange={(e) => setDraft((d) => ({ ...d, categories: parseCommaList(e.target.value) }))}
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  Giorni ritiro (comma)
                </span>
                <input
                  value={toComma(draft.pickupDays)}
                  onChange={(e) => setDraft((d) => ({ ...d, pickupDays: parseCommaList(e.target.value) }))}
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  Orari
                </span>
                <input
                  value={draft.opening}
                  onChange={(e) => setDraft((d) => ({ ...d, opening: e.target.value }))}
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  Descrizione
                </span>
                <textarea
                  value={draft.description}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                  rows={4}
                />
              </label>

              <div className="mt-2 rounded-xl border p-3" style={{ borderColor: "var(--line)", background: "rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Prodotti</div>
                  <button
                    className="rounded-full border px-3 py-1.5 text-sm font-semibold"
                    style={{ borderColor: "var(--line)" }}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        products: [...d.products, { name: "", price: "", availability: "Disponibile" }],
                      }))
                    }
                    type="button"
                  >
                    + Aggiungi
                  </button>
                </div>

                <div className="mt-3 grid gap-2">
                  {draft.products.map((row: ProductRow, idx) => (
                    <div key={idx} className="grid gap-2 sm:grid-cols-4 sm:items-center">
                      <input
                        value={row.name}
                        onChange={(e) =>
                          setDraft((d) => {
                            const next = [...d.products];
                            next[idx] = { ...next[idx], name: e.target.value };
                            return { ...d, products: next };
                          })
                        }
                        className="rounded-xl border px-3 py-2"
                        style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                        placeholder="Nome"
                      />
                      <input
                        value={row.price}
                        onChange={(e) =>
                          setDraft((d) => {
                            const next = [...d.products];
                            next[idx] = { ...next[idx], price: e.target.value };
                            return { ...d, products: next };
                          })
                        }
                        className="rounded-xl border px-3 py-2"
                        style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                        placeholder="Prezzo"
                      />
                      <select
                        value={row.availability}
                        onChange={(e) =>
                          setDraft((d) => {
                            const next = [...d.products];
                            next[idx] = { ...next[idx], availability: e.target.value as any };
                            return { ...d, products: next };
                          })
                        }
                        className="rounded-xl border px-3 py-2"
                        style={{ borderColor: "var(--line)", background: "var(--bg)", color: "var(--ink)" }}
                      >
                        <option value="Disponibile">Disponibile</option>
                        <option value="Su richiesta">Su richiesta</option>
                        <option value="Terminato">Terminato</option>
                      </select>
                      <button
                        className="rounded-full border px-3 py-1.5 text-sm font-semibold"
                        style={{ borderColor: "var(--line)" }}
                        onClick={() =>
                          setDraft((d) => ({ ...d, products: d.products.filter((_, j) => j !== idx) }))
                        }
                        type="button"
                      >
                        Rimuovi
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
