"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between gap-6 rounded-full border border-white/10 bg-white/70 px-4 py-2 shadow-[0_8px_30px_rgba(5,52,87,0.08)] backdrop-blur-xl dark:bg-black/40">
          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>

          {/* Logo: centered on mobile, left on desktop */}
          <Link
            href="#inicio"
            className="group absolute left-1/2 -translate-x-1/2 flex items-center gap-3 md:static md:left-auto md:translate-x-0"
          >
            <Image
              src="/logo-nuevo.png"
              alt="Logo DontoEqui"
              width={1024}
              height={765}
              className="h-11 w-auto rounded-xl object-contain transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              priority
            />
            <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">
              DontoEqui
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-6" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contacto"
            className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] md:inline-flex"
          >
            Pedir turno
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`absolute left-4 right-4 top-24 rounded-3xl bg-card p-6 shadow-xl ring-1 ring-primary/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-6 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${open ? i * 60 + 100 : 0}ms` }}
                className={`rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/5 hover:text-primary ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${open ? nav.length * 60 + 100 : 0}ms` }}
              className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Pedir turno ↗
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}