import nodemailer from 'nodemailer';

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Función genérica para enviar emails
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log(`✅ Email enviado a ${to}: ${subject}`);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    // No lanzamos el error para que no bloquee el flujo principal
  }
}

/**
 * Template: Ticket creado
 */
export async function sendTicketCreatedEmail(
  to: string,
  ticketId: string,
  title: string
): Promise<void> {
  const subject = `Ticket #${ticketId} creado exitosamente`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">🎫 Ticket Creado</h2>
      <p>Tu ticket ha sido creado exitosamente:</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>ID:</strong> #${ticketId}</p>
        <p><strong>Título:</strong> ${title}</p>
        <p><strong>Estado:</strong> <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px;">ABIERTO</span></p>
      </div>
      <p>Nuestro equipo de soporte revisará tu solicitud pronto.</p>
      <p style="color: #6b7280; font-size: 14px;">Gracias por usar HelpDeskPro</p>
    </div>
  `;
  await sendEmail(to, subject, html);
}

/**
 * Template: Respuesta agregada por agente
 */
export async function sendAgentResponseEmail(
  to: string,
  ticketId: string,
  agentName: string,
  responsePreview: string
): Promise<void> {
  const subject = `Nueva respuesta en tu ticket #${ticketId}`;
  const preview = responsePreview.length > 100 
    ? responsePreview.substring(0, 100) + '...' 
    : responsePreview;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">💬 Nueva Respuesta</h2>
      <p>El agente <strong>${agentName}</strong> ha respondido tu ticket:</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Ticket:</strong> #${ticketId}</p>
        <p><strong>Respuesta:</strong></p>
        <p style="background-color: white; padding: 10px; border-left: 3px solid #2563eb;">${preview}</p>
      </div>
      <p>Inicia sesión para ver la respuesta completa y continuar la conversación.</p>
      <p style="color: #6b7280; font-size: 14px;">Gracias por usar HelpDeskPro</p>
    </div>
  `;
  await sendEmail(to, subject, html);
}

/**
 * Template: Ticket cerrado
 */
export async function sendTicketClosedEmail(
  to: string,
  ticketId: string,
  title: string
): Promise<void> {
  const subject = `Ticket #${ticketId} cerrado`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #059669;">✅ Ticket Cerrado</h2>
      <p>Tu ticket ha sido cerrado:</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>ID:</strong> #${ticketId}</p>
        <p><strong>Título:</strong> ${title}</p>
        <p><strong>Estado:</strong> <span style="background-color: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px;">CERRADO</span></p>
      </div>
      <p>Si necesitas ayuda adicional, no dudes en crear un nuevo ticket.</p>
      <p style="color: #6b7280; font-size: 14px;">Gracias por usar HelpDeskPro</p>
    </div>
  `;
  await sendEmail(to, subject, html);
}

/**
 * Template: Ticket asignado a agente
 */
export async function sendTicketAssignedEmail(
  to: string,
  ticketId: string,
  title: string,
  priority: string
): Promise<void> {
  const subject = `Nuevo ticket asignado #${ticketId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">📌 Ticket Asignado</h2>
      <p>Se te ha asignado un nuevo ticket:</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>ID:</strong> #${ticketId}</p>
        <p><strong>Título:</strong> ${title}</p>
        <p><strong>Prioridad:</strong> <span style="background-color: ${
          priority === 'HIGH' ? '#fee2e2' : priority === 'MEDIUM' ? '#fed7aa' : '#dbeafe'
        }; color: ${
          priority === 'HIGH' ? '#991b1b' : priority === 'MEDIUM' ? '#9a3412' : '#1e40af'
        }; padding: 4px 8px; border-radius: 4px;">${priority}</span></p>
      </div>
      <p>Por favor revisa el ticket y proporciona una respuesta pronto.</p>
      <p style="color: #6b7280; font-size: 14px;">HelpDeskPro</p>
    </div>
  `;
  await sendEmail(to, subject, html);
}
