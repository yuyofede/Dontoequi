import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DontoEqui | Odontología equina en Córdoba",
  description:
    "DontoEqui en Córdoba. Especialistas en odontología equina: evaluación, flotado, extracciones y prevención para el bienestar de tu caballo.",
  keywords: [
    "veterinaria Córdoba",
    "clínica veterinaria Hippos",
    "veterinario caballos",
    "veterinaria perros y gatos",
    "atención veterinaria Argentina",
  ],
  openGraph: {
    title: "Clínica Veterinaria Hippos",
    description:
      "Atención veterinaria de calidad para caballos, perros y gatos en Córdoba, Argentina.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}