"use client";

import * as React from "react";
import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function CartRoot({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
