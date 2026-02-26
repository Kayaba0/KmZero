import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const username = String(body?.username ?? "");
  const password = String(body?.password ?? "");

  if (username === "admin" && password === "admin") {
    const res = NextResponse.json({ ok: true });
    // Very simple demo auth cookie (NOT for production).
    res.cookies.set("kmzero_auth", "admin", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  }

  return NextResponse.json({ ok: false, error: "Credenziali non valide" }, { status: 401 });
}
