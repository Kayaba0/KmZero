import SiteHeader from "@/components/SiteHeader";
import { cookies } from "next/headers";

export default function AccountPage() {
  const auth = cookies().get("kmzero_auth")?.value;
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Area riservata</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Login demo (solo test). Utente: <span className="font-semibold">admin</span>
        </p>

        <div className="mt-8 rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface2)" }}>
          <div className="text-sm font-semibold">Stato sessione</div>
          <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {auth === "admin" ? "Autenticato come admin" : "Non autenticato"}
          </div>
        </div>
      </main>
    </div>
  );
}
