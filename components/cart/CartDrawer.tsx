"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useCart } from "./CartContext";

function groupByProducer(items: ReturnType<typeof useCart>["state"]["items"]) {
  const map = new Map<string, { producerName: string; producerSlug: string; items: typeof items }>();
  for (const it of items) {
    const key = it.producerSlug;
    const cur = map.get(key);
    if (cur) cur.items.push(it);
    else map.set(key, { producerName: it.producerName, producerSlug: it.producerSlug, items: [it] });
  }
  return Array.from(map.values());
}

export default function CartDrawer() {
  const { state, close, removeItem, setQty, clear } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  if (!mounted) return null;

  const groups = groupByProducer(state.items);
  const totalCount = state.items.reduce((s, x) => s + x.qty, 0);

  return createPortal(
    <div
      aria-hidden={!state.isOpen}
      className={[
        "fixed inset-0 z-[80] transition",
        state.isOpen ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      <div
        onClick={close}
        className={["absolute inset-0 transition", state.isOpen ? "opacity-100" : "opacity-0"].join(" ")}
        style={{ background: "rgba(0,0,0,.55)" }}
      />
      <aside
        className={[
          "absolute right-0 top-0 h-full w-full max-w-md transition-transform",
          state.isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        style={{
          background: "var(--panel)",
          borderLeft: "1px solid var(--line)",
          color: "var(--ink)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Carrello (demo)
            </div>
            <div className="text-xl font-semibold">Totale articoli: {totalCount}</div>
          </div>
          <button
            onClick={close}
            className="rounded-full border px-3 py-1 text-sm font-semibold"
            style={{ borderColor: "var(--line)" }}
          >
            Chiudi
          </button>
        </div>

        <div className="h-[calc(100%-56px-64px)] overflow-auto px-5 py-4">
          {state.items.length === 0 ? (
            <div className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
              Nessun prodotto nel carrello. Aggiungi qualcosa dalla scheda produttore.
            </div>
          ) : (
            <div className="space-y-5">
              {groups.map((g) => (
                <section key={g.producerSlug} className="rounded-2xl border p-4" style={{ borderColor: "var(--line)" }}>
                  <div className="mb-3">
                    <div className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                      Produttore
                    </div>
                    <div className="text-lg font-semibold">{g.producerName}</div>
                  </div>

                  <div className="space-y-3">
                    {g.items.map((it) => (
                      <div
                        key={it.id}
                        className="flex gap-3 rounded-xl border p-3"
                        style={{ borderColor: "var(--line)", background: "var(--bg)" }}
                      >
                        <div className="h-14 w-14 overflow-hidden rounded-xl" style={{ border: "1px solid var(--line)" }}>
                          {it.imageSrc ? (
                            <Image src={it.imageSrc} alt={it.productName} width={56} height={56} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: "var(--muted)" }}>
                              —
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="truncate font-semibold">{it.productName}</div>
                              <div className="text-sm" style={{ color: "var(--muted)" }}>
                                {it.price}
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(it.id)}
                              className="rounded-full border px-2 py-1 text-xs font-semibold"
                              style={{ borderColor: "var(--line)", color: "var(--muted)" }}
                            >
                              Rimuovi
                            </button>
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => setQty(it.id, it.qty - 1)}
                              className="h-8 w-8 rounded-full border text-lg leading-none"
                              style={{ borderColor: "var(--line)" }}
                              aria-label="Diminuisci quantità"
                            >
                              −
                            </button>
                            <div className="min-w-[32px] text-center font-semibold">{it.qty}</div>
                            <button
                              onClick={() => setQty(it.id, it.qty + 1)}
                              className="h-8 w-8 rounded-full border text-lg leading-none"
                              style={{ borderColor: "var(--line)" }}
                              aria-label="Aumenta quantità"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderTop: "1px solid var(--line)" }}>
          <button
            onClick={clear}
            className="rounded-full border px-4 py-2 text-sm font-semibold"
            style={{ borderColor: "var(--line)", color: "var(--muted)" }}
            disabled={state.items.length === 0}
          >
            Svuota
          </button>
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            Demo UI: niente pagamenti
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}
