const dentalServices = [
  { icon: "🦷", image: "/foto1.jpg", title: "Evaluación odontológica", desc: "Examen completo de la cavidad oral y diagnóstico preciso." },
  { icon: "⚙️", image: "/foto2.jpg", title: "Flotado de dientes", desc: "Corrección de puntas y superficies para una masticación correcta." },
  { icon: "🔧", image: "/foto3.jpg", title: "Extracciones", desc: "Extracción segura de dientes comprometidos." },
  { icon: "📐", image: "/foto4.jpg", title: "Maloclusiones", desc: "Tratamiento de desalineaciones y problemas de mordida." },
  { icon: "🛡️", image: "/foto7.jpg", title: "Control preventivo", desc: "Chequeos periódicos para evitar complicaciones futuras." },
];

function ServiceCard({ icon, image, title, desc, delay = 0 }: { icon: string; image?: string; title: string; desc: string; delay?: number }) {
  return (
    <div className="group rounded-[2rem] bg-primary/5 p-2 ring-1 ring-primary/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="overflow-hidden rounded-[calc(2rem-0.5rem)] bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
        {image && (
          <div className="aspect-[4/3] overflow-hidden">
            <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" />
          </div>
        )}
        <div className="p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary text-2xl transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
            {icon}
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-card/40 reveal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Odontología equina especializada
          </h2>
          <p className="mt-4 text-muted">
            Atención odontológica integral para caballos: diagnóstico, tratamiento y prevención para una correcta masticación y bienestar.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold flex items-center gap-2">🐴 Para caballos</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentalServices.map((s, i) => (
              <ServiceCard key={s.title} icon={s.icon} image={s.image} title={s.title} desc={s.desc} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}