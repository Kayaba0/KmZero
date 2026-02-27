"use client";

import Link from "next/link";
import { isAdminClient } from "@/lib/auth/demoAuth";

export default function AdminLink() {
  const admin = isAdminClient();
  if (!admin) return null;

  return (
    <Link
      href="/admin"
      className="rounded-full border px-3 py-1.5 text-sm font-semibold"
      style={{ borderColor: "var(--line)", color: "var(--ink)" }}
    >
      Admin
    </Link>
  );
}
