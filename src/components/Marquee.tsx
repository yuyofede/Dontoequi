const items = [
  "Odontología equina",
  "Diagnóstico preciso",
  "Flotado de dientes",
  "Extracciones",
  "Maloclusiones",
  "Control preventivo",
  "Córdoba, Argentina",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-primary py-4 text-white">
      <div className="flex w-max animate-marquee gap-10 pr-10">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.2em]">
            <span>{item}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}