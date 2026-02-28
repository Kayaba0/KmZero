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

const STORAGE_KEY_BASE = "kmzero_cart_v1";
const USER_KEY = "kmzero_user_v1";

function getActiveUser(): string {
  if (typeof window === "undefined") return "guest";
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return "guest";
    const parsed = JSON.parse(raw);
    const u = typeof parsed === "string" ? parsed : parsed?.username;
    return (u && String(u).trim()) ? String(u).trim() : "guest";
  } catch {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw && raw.trim() ? raw.trim() : "guest";
  }
}

function storageKeyForUser(username: string) {
  return `${STORAGE_KEY_BASE}_${username}`;
}


function safeLoad(username: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKeyForUser(username));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CartItem[];
    return [];
  } catch {
    return [];
  }
}

function safeSave(username: string, items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKeyForUser(username), JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [username, setUsername] = React.useState<string>("guest");

  React.useEffect(() => {
    const u = getActiveUser();
    setUsername(u);
    setItems(safeLoad(u));

    function onStorage(e: StorageEvent) {
      if (e.key !== USER_KEY) return;
      const next = getActiveUser();
      setUsername(next);
      setItems(safeLoad(next));
      setIsOpen(false);
    }
    function onUserChange() {
      const next = getActiveUser();
      setUsername(next);
      setItems(safeLoad(next));
      setIsOpen(false);
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("kmzero_user_change", onUserChange as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kmzero_user_change", onUserChange as EventListener);
    };
  }, []);

  React.useEffect(() => {
    safeSave(username, items);
  }, [items, username]);

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
