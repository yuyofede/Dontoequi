import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, animal, service, message } = body ?? {};

    if (!name || !email || !phone || !animal) {
      return NextResponse.json(
        { error: "Completá los campos obligatorios." },
        { status: 400 }
      );
    }

    // Aquí se podría integrar un servicio de email (Resend, SendGrid, etc.)
    // usando variables de entorno. Por ahora registramos la consulta.
    console.log("Nueva consulta:", { name, email, phone, animal, service, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar la solicitud." },
      { status: 500 }
    );
  }
}