"use client";

import * as React from "react";

export type CartItem = {
  id: string; // unique per producer+product
  producerSlug: string;
  producerName: string;
  productName: string;
  price: string;
  imageSrc?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartApi = {
  state: CartState;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const CartContext = React.createContext<CartApi | null>(null);

const STORAGE_KEY = "kmzero_cart_v1";

function safeLoad(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CartItem[];
    return [];
  } catch {
    return [];
  }
}

function safeSave(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setItems(safeLoad());
  }, []);

  React.useEffect(() => {
    safeSave(items);
  }, [items]);

  const api = React.useMemo<CartApi>(() => {
    return {
      state: { items, isOpen },
      addItem: (incoming) => {
        setItems((prev) => {
          const idx = prev.findIndex((x) => x.id === incoming.id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
            return copy;
          }
          return [...prev, { ...incoming, qty: 1 }];
        });
        if (typeof window !== "undefined") {
          try {
            if (window.matchMedia("(min-width: 768px)").matches) setIsOpen(true);
          } catch {}
        }
      },
      removeItem: (id) => setItems((prev) => prev.filter((x) => x.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
        ),
      clear: () => setItems([]),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useOptionalCart() {
  return React.useContext(CartContext);
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
