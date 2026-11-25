import nodemailer from "nodemailer";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
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

/**
 * Plantilla HTML estilo Apple para el correo de confirmación al usuario que contacta.
 */
function getAutoReplyHtml(name: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mensaje Recibido · Andrés Machado</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F5F5F7;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1D1D1F;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 580px;
      margin: 40px auto;
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    }
    .header {
      padding: 40px 40px 24px 40px;
      text-align: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    .brand-pill {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #0071E3;
      background: rgba(0, 113, 227, 0.08);
      padding: 4px 12px;
      border-radius: 100px;
      margin-bottom: 16px;
    }
    .title {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #1D1D1F;
      margin: 0 0 8px 0;
      line-height: 1.2;
    }
    .subtitle {
      font-size: 14px;
      color: #86868B;
      margin: 0;
      line-height: 1.5;
    }
    .content {
      padding: 32px 40px;
    }
    .greeting {
      font-size: 16px;
      font-weight: 600;
      color: #1D1D1F;
      margin-bottom: 12px;
    }
    .paragraph {
      font-size: 14px;
      line-height: 1.6;
      color: #424245;
      margin: 0 0 20px 0;
    }
    .card-message {
      background: #FBFBFD;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 16px;
      padding: 20px;
      margin: 24px 0;
    }
    .card-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #86868B;
      margin-bottom: 8px;
    }
    .card-text {
      font-size: 13px;
      line-height: 1.6;
      color: #1D1D1F;
      white-space: pre-line;
      font-style: italic;
    }
    .cta-container {
      margin: 28px 0 12px 0;
      text-align: left;
    }
    .cta-button {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      color: #FFFFFF !important;
      background: #1D1D1F;
      padding: 12px 24px;
      border-radius: 100px;
      text-decoration: none;
      margin-right: 12px;
    }
    .whatsapp-button {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      color: #25D366 !important;
      background: rgba(37, 211, 102, 0.1);
      padding: 12px 20px;
      border-radius: 100px;
      text-decoration: none;
      border: 1px solid rgba(37, 211, 102, 0.2);
    }
    .footer {
      padding: 24px 40px 32px 40px;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      background: #FAFAFA;
      font-size: 12px;
      color: #86868B;
      line-height: 1.5;
    }
    .footer-links {
      margin-top: 8px;
    }
    .footer-links a {
      color: #0071E3;
      text-decoration: none;
      margin-right: 14px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Header -->
    <div class="header">
      <span class="brand-pill">Confirmación de Contacto</span>
      <h1 class="title">He recibido tu mensaje correctamente</h1>
      <p class="subtitle">Andrés Machado · Desarrollador de Software Junior en prácticas (Medellín, Colombia)</p>
    </div>

    <!-- Body -->
    <div class="content">
      <div class="greeting">Hola, ${name} 👋</div>
      <p class="paragraph">
        Gracias por ponerte en contacto conmigo a través de mi portafolio web. He registrado tus datos y tu mensaje con total éxito.
      </p>
      <p class="paragraph">
        Revisaré tu propuesta técnica o consulta con atención y me comunicaré contigo en menos de <strong>24 horas</strong>.
      </p>

      <!-- Message Recap -->
      <div class="card-message">
        <div class="card-label">Resumen de tu mensaje enviado:</div>
        <div class="card-text">&ldquo;${message}&rdquo;</div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="cta-container">
        <a href="https://wa.me/573126691941" target="_blank" class="whatsapp-button">
          Escríbeme por WhatsApp Directo
        </a>
        <a href="https://github.com/machadodev1" target="_blank" class="cta-button">
          Ver mi GitHub
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div>© ${new Date().getFullYear()} Andrés Machado (Machadodev1). Todos los derechos reservados.</div>
      <div>Especializado en Django, Flutter, Node.js, Figma y PostgreSQL.</div>
      <div class="footer-links">
        <a href="https://github.com/machadodev1">GitHub</a>
        <a href="https://linkedin.com/in/machadodev1">LinkedIn</a>
        <a href="https://sigif-final.vercel.app">Proyecto SIGIF</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Plantilla HTML para la notificación que le llega directamente a Andrés Machado.
 */
function getAdminNotificationHtml(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Nuevo Contacto de Portafolio</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #F5F5F7; margin: 0; padding: 24px; color: #1D1D1F; }
    .card { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 20px; border: 1px solid #E5E7EB; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
    .badge { display: inline-block; font-size: 11px; font-weight: 700; color: #0071E3; background: #EBF5FF; padding: 4px 10px; border-radius: 99px; margin-bottom: 12px; }
    h2 { margin: 0 0 16px 0; font-size: 22px; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #86868B; }
    .field-value { font-size: 15px; font-weight: 500; color: #1D1D1F; margin-top: 4px; }
    .msg-box { background: #FBFBFD; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; margin-top: 8px; white-space: pre-wrap; }
    .action { margin-top: 24px; }
    .btn { display: inline-block; background: #0071E3; color: #fff !important; text-decoration: none; padding: 10px 20px; border-radius: 99px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">NUEVO MENSAJE DESDE TU PORTAFOLIO</span>
    <h2>¡Alguien quiere contactarte, Andrés!</h2>

    <div class="field">
      <div class="field-label">Nombre del remitente</div>
      <div class="field-value">${name}</div>
    </div>

    <div class="field">
      <div class="field-label">Correo electrónico</div>
      <div class="field-value"><a href="mailto:${email}" style="color:#0071E3;">${email}</a></div>
    </div>

    <div class="field">
      <div class="field-label">Mensaje o propuesta</div>
      <div class="msg-box">${message}</div>
    </div>

    <div class="action">
      <a href="mailto:${email}?subject=Re:%20Contacto%20Portafolio%20Andr%C3%A9s%20Machado" class="btn">
        Responder a ${name}
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Función principal para procesar y enviar ambos correos.
 */
export async function sendContactEmails({ name, email, message }: ContactPayload) {
  // 1. Correo de notificación a Andrés
  const mailToAdmin = {
    from: `"Portafolio Web" <${smtpUser}>`,
    to: contactTo,
    replyTo: email,
    subject: `⚡ Nuevo contacto: ${name} (${email})`,
    html: getAdminNotificationHtml(name, email, message),
  };

  // 2. Correo de confirmación profesional para el usuario que contactó
  const mailToUser = {
    from: `"Andrés Machado · Software Dev" <${smtpUser}>`,
    to: email,
    replyTo: smtpUser,
    subject: `Gracias por tu mensaje, ${name} · Andrés Machado`,
    html: getAutoReplyHtml(name, message),
  };

  // Enviamos en paralelo
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
