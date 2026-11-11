const photos = [
  { src: "/foto1.jpg", alt: "Instalaciones y atención de la clínica" },
  { src: "/foto2.jpg", alt: "Atención veterinaria" },
  { src: "/foto3.jpg", alt: "Pacientes de la clínica" },
  { src: "/foto4.jpg", alt: "Equipo veterinario" },
];

export default function Gallery() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Galería
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Nuestra clínica en imágenes
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((p) => (
            <div key={p.src} className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <img src={p.src} alt={p.alt} className="h-64 w-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}