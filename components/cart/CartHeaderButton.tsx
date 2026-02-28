"use client";

import * as React from "react";
import { useOptionalCart } from "./CartContext";

function CartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.5 6.5H21L19.3 14.2C19.1 15 18.4 15.5 17.6 15.5H8.1C7.3 15.5 6.6 14.9 6.5 14.1L5.4 4.8C5.3 4 4.6 3.5 3.8 3.5H2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 20.2C9.66 20.2 10.2 19.66 10.2 19C10.2 18.34 9.66 17.8 9 17.8C8.34 17.8 7.8 18.34 7.8 19C7.8 19.66 8.34 20.2 9 20.2Z"
        fill="currentColor"
      />
      <path
        d="M17 20.2C17.66 20.2 18.2 19.66 18.2 19C18.2 18.34 17.66 17.8 17 17.8C16.34 17.8 15.8 18.34 15.8 19C15.8 19.66 16.34 20.2 17 20.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CartHeaderButton() {
  const cart = useOptionalCart();

  const count = cart ? cart.state.items.reduce((s, x) => s + x.qty, 0) : 0;
  const toggle = cart ? cart.toggle : () => {};

  const [bump, setBump] = React.useState(false);
  const prevCount = React.useRef(count);

  React.useEffect(() => {
    // animate only when count increases
    if (count > prevCount.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 220);
      return () => window.clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  React.useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <button
      type="button"
      onClick={() => {
        if (!cart) return;
        setBump(true);
        window.setTimeout(() => setBump(false), 160);
        toggle();
      }}
      disabled={!cart}
      className={[
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-150",
        bump ? "scale-[1.06]" : "scale-100",
        !cart ? "opacity-60" : "",
      ].join(" ")}
      style={{ borderColor: "var(--line)", background: "transparent", color: "var(--ink)" }}
      aria-label="Apri carrello"
    >
      <span
        className={[
          "transition-transform duration-200",
          bump ? "scale-[1.10]" : "scale-100",
        ].join(" ")}
      >
        <CartIcon size={20} />
      </span>

      {count > 0 && (
        <span
          className={[
            "absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold",
            "transition-transform duration-200",
            bump ? "scale-[1.12]" : "scale-100",
          ].join(" ")}
          style={{ background: "var(--brand)", color: "#ffffff", border: "1px solid var(--line)" }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
