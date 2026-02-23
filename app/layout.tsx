import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KmZero",
  description: "Produttori locali e prenotazioni a km zero",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
