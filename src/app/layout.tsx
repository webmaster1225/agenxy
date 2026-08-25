import { Antonio, Inter, Koulen } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { MenuOverlay } from "@/components/MenuOverlay";
import { MenuProvider } from "@/components/MenuProvider";
import { ListenProvider } from "@/components/ListenProvider";
import { ContactBlock } from "@/components/ContactBlock";

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const koulen = Koulen({
  subsets: ["latin"],
  variable: "--font-koulen",
  weight: "400",
});

export const metadata: Metadata = {
  title: "AGENXY — Artist Management, Label & Booking",
  description:
    "We are Agenxy — a groundbreaking artist management, label, and booking agency cultivating a new wave of musicians and the future of dance music.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable} ${koulen.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <MenuProvider>
          <ListenProvider>
            <Header />
            <MenuOverlay />
            <main>{children}</main>
            <ContactBlock />
          </ListenProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
