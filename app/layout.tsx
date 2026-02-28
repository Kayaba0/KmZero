import "./globals.css";
import CartRoot from "@/components/cart/CartRoot";
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
      <head>
        {/* Avoid theme flash: apply saved theme before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('kmzero_theme');if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();",
          }}
        />
      </head>
      <body><CartRoot>{children}</CartRoot></body>
    </html>
  );
}
