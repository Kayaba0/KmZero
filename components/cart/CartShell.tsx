"use client";

import * as React from "react";
import { CartProvider } from "./CartContext";
import CartFab from "./CartFab";
import CartDrawer from "./CartDrawer";

export default function CartShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartFab />
      <CartDrawer />
    </CartProvider>
  );
}
