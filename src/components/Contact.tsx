"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Error al enviar");
      setStatus("success");
      setMessage("¡Gracias! Te contactaremos a la brevedad.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Ocurrió un error.");
    }
  }

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-card/40 reveal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Contacto
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Pedí tu turno o consultá
          </h2>
          <p className="mt-4 text-muted">
            Completá el formulario y nos pondremos en contacto para coordinar la
            atención de tu animal. También podés llamarnos o visitarnos.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-primary text-lg">📍</span>
              <div>
                <p className="font-semibold">Dirección</p>
                <p className="text-muted">Córdoba, Argentina</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary text-lg">📞</span>
              <div>
                <p className="font-semibold">Teléfono</p>
                <p className="text-muted">+54 9 351 000 0000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary text-lg">✉️</span>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted">contacto@clinicahippos.com.ar</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary text-lg">🕐</span>
              <div>
                <p className="font-semibold">Horarios</p>
                <p className="text-muted">Lun a Sáb 8:00 a 20:00 · Urgencias 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-primary/5 p-2 ring-1 ring-primary/10">
          <form
            onSubmit={handleSubmit}
            className="rounded-[calc(2rem-0.5rem)] bg-card p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-5"
          >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="phone">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="animal">
                Tipo de animal
              </label>
              <select
                id="animal"
                name="animal"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Seleccionar</option>
                <option>Caballo</option>
                <option>Perro</option>
                <option>Gato</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="service">
                Servicio
              </label>
              <select
                id="service"
                name="service"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Seleccionar (opcional)</option>
                <option>Chequeo general</option>
                <option>Vacunación</option>
                <option>Desparasitación</option>
                <option>Tratamiento dental</option>
                <option>Urgencia</option>
                <option>Esterilización</option>
                <option>Cirugía básica</option>
                <option>Análisis clínico</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Enviar consulta"}
          </button>
          {message && (
            <p
              className={`text-sm ${
                status === "success" ? "text-primary" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          </form>
        </div>
      </div>
    </section>
  );
}