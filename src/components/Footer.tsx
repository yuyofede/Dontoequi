export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © 2026 DontoEqui. Córdoba, Argentina.
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <a href="#servicios" className="hover:text-primary transition-colors">
            Servicios
          </a>
          <a href="#nosotros" className="hover:text-primary transition-colors">
            Nosotros
          </a>
          <a href="#contacto" className="hover:text-primary transition-colors">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}