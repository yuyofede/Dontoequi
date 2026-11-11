const features = [
  { title: "Equipo especializado", desc: "Veterinarios con experiencia en odontología equina." },
  { title: "Atención personalizada", desc: "Tratamos a cada caballo como único, con seguimiento continuo." },
  { title: "Diagnóstico preciso", desc: "Equipamiento actualizado para evaluaciones detalladas." },
  { title: "Prevención", desc: "Controles periódicos para evitar complicaciones futuras." },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 reveal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Nosotros
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Especialistas en odontología equina
          </h2>
          <p className="mt-4 text-muted">
            En DontoEqui nos dedicamos exclusivamente a la
            salud dental de los caballos. Creemos en el diagnóstico temprano y
            el tratamiento preventivo para evitar complicaciones.
          </p>
          <p className="mt-4 text-muted">
            Nuestro compromiso es brindar una atención cercana, transparente y
            profesional, acompañándote en el cuidado de tu caballo.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-[2rem] bg-primary/5 p-2 ring-1 ring-primary/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
              <div className="rounded-[calc(2rem-0.5rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}