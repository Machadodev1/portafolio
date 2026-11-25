import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, project } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Por favor ingresa tu nombre y tu correo electrónico." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor proporciona un correo electrónico válido." },
        { status: 400 }
      );
    }

    const finalMessage =
      message && message.trim().length > 0
        ? message
        : "Proyecto configurado mediante el asistente interactivo del portafolio.";

    const result = await sendContactEmails({
      name,
      email,
      message: finalMessage,
      project,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Tu proyecto ha sido enviado correctamente y hemos mandado el resumen a tu correo.",
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
