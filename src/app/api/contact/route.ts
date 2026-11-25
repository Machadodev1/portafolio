import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos (nombre, correo y mensaje) son requeridos." },
        { status: 400 }
      );
    }

    // Validación básica de formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor proporciona un correo electrónico válido." },
        { status: 400 }
      );
    }

    // Enviar correos (notificación al admin + respuesta automática al usuario)
    const result = await sendContactEmails({ name, email, message });

    return NextResponse.json(
      {
        success: true,
        message: "Tu mensaje ha sido enviado correctamente y se ha enviado una confirmación a tu correo.",
        result,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error en /api/contact:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      {
        error: "Hubo un error al procesar el envío de correo.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
