import nodemailer from "nodemailer";

export interface ProjectSelection {
  projectType: string;
  goal: string;
  features: string[];
  timeline: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  project?: ProjectSelection;
}

const smtpUser = process.env.SMTP_USER || "machadoandres444@gmail.com";
const smtpPass = (process.env.SMTP_PASS || "fkrrcbsyksesdrzk").replace(/\s+/g, "");
const contactTo = process.env.CONTACT_EMAIL_TO || "machadoandres444@gmail.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function renderProjectBlueprintHtml(project?: ProjectSelection): string {
  if (!project || !project.projectType) return "";
  const featuresHtml =
    project.features && project.features.length > 0
      ? project.features
          .map(
            (f) =>
              `<span style="display:inline-block;background-color:#EEF4FF;border:1px solid #BFE0FF;color:#0051A8 !important;-webkit-text-fill-color:#0051A8;font-size:12px;font-weight:700;padding:6px 13px;border-radius:99px;margin:4px 6px 4px 0;">✓ ${f}</span>`
          )
          .join("")
      : `<span style="font-size:13px;color:#424245 !important;-webkit-text-fill-color:#424245;">Por definir en reunión</span>`;

  return `
    <div style="background-color:#F5F7FA !important;border:1px solid #D2D6DC;border-radius:16px;padding:22px;margin:24px 0;">
      <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#0066CC !important;-webkit-text-fill-color:#0066CC;margin-bottom:14px;">
        ✦ Estructura Configurada del Proyecto
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;background-color:#FFFFFF !important;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;">
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #E5E7EB;font-size:12px;font-weight:600;color:#515154 !important;-webkit-text-fill-color:#515154;width:38%;background-color:#FAFAFC !important;">Tipo de Solución</td>
          <td style="padding:12px 16px;border-bottom:1px solid #E5E7EB;font-size:14px;font-weight:700;color:#111111 !important;-webkit-text-fill-color:#111111;background-color:#FFFFFF !important;">${project.projectType}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #E5E7EB;font-size:12px;font-weight:600;color:#515154 !important;-webkit-text-fill-color:#515154;background-color:#FAFAFC !important;">Prioridad Principal</td>
          <td style="padding:12px 16px;border-bottom:1px solid #E5E7EB;font-size:14px;font-weight:700;color:#111111 !important;-webkit-text-fill-color:#111111;background-color:#FFFFFF !important;">${project.goal || "Impulsar el negocio"}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#515154 !important;-webkit-text-fill-color:#515154;background-color:#FAFAFC !important;">Tiempo Estimado</td>
          <td style="padding:12px 16px;font-size:14px;font-weight:700;color:#0066CC !important;-webkit-text-fill-color:#0066CC;background-color:#FFFFFF !important;">${project.timeline || "Flexible"}</td>
        </tr>
      </table>
      <div style="margin-top:16px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#424245 !important;-webkit-text-fill-color:#424245;margin-bottom:8px;">
          Piezas y Funciones Incluidas:
        </div>
        <div>${featuresHtml}</div>
      </div>
    </div>
  `;
}

/**
 * Plantilla HTML con estilos 100% inline y alto contraste para que se lea perfecto en Gmail (Modo Claro y Modo Oscuro).
 */
function getAutoReplyHtml(name: string, message: string, project?: ProjectSelection): string {
  const blueprintBlock = renderProjectBlueprintHtml(project);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Resumen de tu Proyecto · Andrés Machado</title>
</head>
<body style="margin:0;padding:0;background-color:#F2F2F7 !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111 !important;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2F2F7 !important;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;background-color:#FFFFFF !important;border-radius:24px;border:1px solid #D2D6DC;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:36px 36px 24px 36px;border-bottom:1px solid #E5E7EB;background-color:#FFFFFF !important;">
              <div style="display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#0051A8 !important;-webkit-text-fill-color:#0051A8;background-color:#EBF4FF !important;border:1px solid #BFE0FF;padding:5px 13px;border-radius:100px;margin-bottom:16px;">
                Confirmación de Proyecto
              </div>
              <h1 style="font-size:25px;font-weight:800;letter-spacing:-0.03em;color:#111111 !important;-webkit-text-fill-color:#111111;margin:0 0 8px 0;line-height:1.2;">
                ¡Tu idea ya está en mis manos!
              </h1>
              <p style="font-size:14px;color:#515154 !important;-webkit-text-fill-color:#515154;margin:0;line-height:1.5;font-weight:500;">
                Andrés Machado · Desarrollador de Software (Medellín, Colombia)
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px 36px;background-color:#FFFFFF !important;">
              <div style="font-size:17px;font-weight:700;color:#111111 !important;-webkit-text-fill-color:#111111;margin-bottom:12px;">
                Hola, ${name} 👋
              </div>
              <p style="font-size:14px;line-height:1.65;color:#2C2C2E !important;-webkit-text-fill-color:#2C2C2E;margin:0 0 18px 0;">
                Gracias por armar la estructura de tu proyecto en mi portafolio. He recibido toda la configuración que seleccionaste y ya estoy revisándola.
              </p>

              ${blueprintBlock}

              <div style="background-color:#F9FAFB !important;border:1px solid #D2D6DC;border-radius:14px;padding:18px;margin:20px 0;">
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#515154 !important;-webkit-text-fill-color:#515154;margin-bottom:8px;">
                  Detalles / Notas de tu solicitud:
                </div>
                <div style="font-size:14px;line-height:1.6;color:#111111 !important;-webkit-text-fill-color:#111111;white-space:pre-line;font-weight:500;">
                  ${message}
                </div>
              </div>

              <p style="font-size:14px;line-height:1.65;color:#2C2C2E !important;-webkit-text-fill-color:#2C2C2E;margin:0 0 24px 0;">
                Me pondré en contacto contigo en menos de <strong style="color:#111111 !important;-webkit-text-fill-color:#111111;">24 horas</strong> con una propuesta clara. Si prefieres hablar de inmediato, escríbeme directo por WhatsApp:
              </p>

              <!-- Buttons with high-contrast inline styles -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="https://wa.me/573145827883" target="_blank" style="display:inline-block;font-size:13px;font-weight:700;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF;background-color:#1E9E52 !important;padding:13px 22px;border-radius:100px;text-decoration:none;">
                      Hablar por WhatsApp Directo
                    </a>
                  </td>
                  <td>
                    <a href="https://github.com/machadodev1" target="_blank" style="display:inline-block;font-size:13px;font-weight:700;color:#111111 !important;-webkit-text-fill-color:#111111;background-color:#F2F2F7 !important;border:1px solid #C7C7CC;padding:12px 22px;border-radius:100px;text-decoration:none;">
                      Ver mi GitHub
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px;border-top:1px solid #E5E7EB;background-color:#F9FAFB !important;font-size:12px;color:#515154 !important;-webkit-text-fill-color:#515154;line-height:1.6;">
              <div style="font-weight:600;color:#111111 !important;-webkit-text-fill-color:#111111;">
                © 2026 Andrés Machado (Machadodev1) · Medellín, Colombia
              </div>
              <div>Soluciones web, móviles y sistemas empresariales a medida.</div>
              <div style="margin-top:8px;">
                <a href="https://github.com/machadodev1" style="color:#0051A8 !important;-webkit-text-fill-color:#0051A8;font-weight:600;text-decoration:underline;margin-right:14px;">GitHub</a>
                <a href="https://linkedin.com/in/machadodev1" style="color:#0051A8 !important;-webkit-text-fill-color:#0051A8;font-weight:600;text-decoration:underline;margin-right:14px;">LinkedIn</a>
                <a href="https://sigif-final.vercel.app" style="color:#0051A8 !important;-webkit-text-fill-color:#0051A8;font-weight:600;text-decoration:underline;">Proyecto SIGIF</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Plantilla HTML con alto contraste para la notificación que recibe Andrés Machado.
 */
function getAdminNotificationHtml(
  name: string,
  email: string,
  message: string,
  project?: ProjectSelection
): string {
  const blueprintBlock = renderProjectBlueprintHtml(project);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="color-scheme" content="light only">
  <title>Nuevo Proyecto Configurado</title>
</head>
<body style="margin:0;padding:24px 12px;background-color:#F2F2F7 !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111111 !important;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;margin:0 auto;background-color:#FFFFFF !important;border-radius:20px;border:1px solid #D2D6DC;padding:28px;">
    <tr>
      <td style="background-color:#FFFFFF !important;">
        <div style="display:inline-block;font-size:11px;font-weight:800;color:#0051A8 !important;-webkit-text-fill-color:#0051A8;background-color:#EBF4FF !important;border:1px solid #BFE0FF;padding:5px 12px;border-radius:99px;margin-bottom:14px;">
          NUEVO PROYECTO CONFIGURADO EN PORTAFOLIO
        </div>
        <h2 style="margin:0 0 16px 0;font-size:22px;font-weight:800;color:#111111 !important;-webkit-text-fill-color:#111111;">
          ¡${name} ha armado un proyecto contigo!
        </h2>

        <div style="margin-bottom:16px;padding:14px;background-color:#F9FAFB !important;border:1px solid #E5E7EB;border-radius:12px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#515154 !important;-webkit-text-fill-color:#515154;">Datos del Cliente</div>
          <div style="font-size:15px;font-weight:700;color:#111111 !important;-webkit-text-fill-color:#111111;margin-top:4px;">
            ${name} · <a href="mailto:${email}" style="color:#0051A8 !important;-webkit-text-fill-color:#0051A8;text-decoration:underline;">${email}</a>
          </div>
        </div>

        ${blueprintBlock}

        <div style="margin-bottom:20px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#515154 !important;-webkit-text-fill-color:#515154;margin-bottom:6px;">
            Detalles / Mensaje del Cliente
          </div>
          <div style="background-color:#F9FAFB !important;border:1px solid #D2D6DC;border-radius:12px;padding:16px;font-size:14px;line-height:1.6;color:#111111 !important;-webkit-text-fill-color:#111111;white-space:pre-wrap;font-weight:500;">
            ${message}
          </div>
        </div>

        <div>
          <a href="mailto:${email}?subject=Re:%20Propuesta%20para%20tu%20proyecto%20-%20Andr%C3%A9s%20Machado" style="display:inline-block;background-color:#0066CC !important;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:99px;font-size:13px;font-weight:700;">
            Responder a ${name}
          </a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendContactEmails({ name, email, message, project }: ContactPayload) {
  const subjectTag = project?.projectType ? `${project.projectType}` : "Contacto";

  const mailToAdmin = {
    from: `"Portafolio Web" <${smtpUser}>`,
    to: contactTo,
    replyTo: email,
    subject: `⚡ Nuevo Proyecto [${subjectTag}]: ${name}`,
    html: getAdminNotificationHtml(name, email, message, project),
  };

  const mailToUser = {
    from: `"Andrés Machado · Software Dev" <${smtpUser}>`,
    to: email,
    replyTo: smtpUser,
    subject: `Resumen de tu proyecto (${subjectTag}) · Andrés Machado`,
    html: getAutoReplyHtml(name, message, project),
  };

  const [adminResult, userResult] = await Promise.all([
    transporter.sendMail(mailToAdmin),
    transporter.sendMail(mailToUser),
  ]);

  return {
    success: true,
    adminMessageId: adminResult.messageId,
    userMessageId: userResult.messageId,
  };
}
