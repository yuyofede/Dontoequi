export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden reveal">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>

          <h1 className="hero-rise hero-delay-1 mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Odontología equina de calidad para tus{" "}
            <span className="text-primary">caballos</span>.
          </h1>
          <p className="hero-rise hero-delay-2 mt-6 text-lg text-muted max-w-xl">
            En DontoEqui nos especializamos en odontología
            equina: diagnóstico, tratamiento y prevención para el bienestar de
            tu caballo.
          </p>
          <div className="hero-rise hero-delay-3 mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98]"
            >
              Solicitar turno
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">↗</span>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Ver servicios
            </a>
          </div>
          <dl className="hero-rise hero-delay-4 mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <dt className="text-2xl font-bold text-primary">+10</dt>
              <dd className="text-sm text-muted">Años de experiencia</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">100%</dt>
              <dd className="text-sm text-muted">Odontología equina</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">Córdoba</dt>
              <dd className="text-sm text-muted">Argentina</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-lg animate-float">
            <img
              src="/foto1.jpg"
              alt="Atención odontológica equina en DontoEqui"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

