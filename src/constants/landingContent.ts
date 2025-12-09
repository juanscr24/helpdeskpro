// Landing Page Content Constants

export const SITE_INFO = {
  name: 'HelpDeskPro',
  tagline: 'Sistema de Gestión de Tickets de Soporte Técnico',
  description: 'HelpDeskPro es una plataforma web que centraliza la gestión de tickets de soporte técnico. Permite a clientes reportar problemas y a agentes de soporte resolver tickets de forma organizada, transparente y profesional.',
  email: 'contacto@helpdeskpro.com',
};

export const PROBLEMS = [
  { icon: '❌', text: 'Tickets perdidos en correos no respondidos' },
  { icon: '❌', text: 'Sin registro centralizado de solicitudes' },
  { icon: '❌', text: 'Falta de seguimiento claro del estado' },
  { icon: '❌', text: 'Agentes sin recordatorios de tickets pendientes' },
  { icon: '❌', text: 'Gerencia sin visibilidad de métricas' },
];

export const SOLUTIONS = [
  { icon: '✅', text: 'Un único sistema centralizado para todos los tickets' },
  { icon: '✅', text: 'Estados claros y bien definidos' },
  { icon: '✅', text: 'Historial completo de conversaciones' },
  { icon: '✅', text: 'Notificaciones automáticas por correo' },
  { icon: '✅', text: 'Recordatorios automáticos para agentes' },
  { icon: '✅', text: 'Dashboard con métricas en tiempo real' },
];

export const MAIN_FEATURES = [
  {
    icon: '📋',
    title: 'Gestión Centralizada',
    description: 'Todos los tickets en un único lugar. Crea, edita y actualiza tickets con campos: Título, Descripción, Prioridad y Estado.',
  },
  {
    icon: '👥',
    title: 'Roles y Permisos',
    description: 'Dos tipos de usuarios. Clientes reportan problemas, Agentes resuelven. Cada uno con permisos personalizados según su rol.',
  },
  {
    icon: '💬',
    title: 'Comunicación Clara',
    description: 'Hilo de comentarios por ticket. Conversación centralizada entre cliente y agente. Historial completo sin correos sueltos.',
  },
  {
    icon: '🤖',
    title: 'Automatización',
    description: 'Emails automáticos en eventos clave: creación de ticket, respuesta de agente, cierre de ticket. Recordatorios de tickets sin respuesta.',
  },
];

export const CLIENT_FEATURES = [
  'Crear nuevos tickets de soporte',
  'Ver el estado en tiempo real',
  'Agregar comentarios o seguimiento',
  'Recibir notificaciones por correo',
  'Ver historial de todos sus tickets',
];

export const AGENT_FEATURES = [
  'Ver todos los tickets del sistema',
  'Asignar tickets a agentes específicos',
  'Cambiar estado y prioridad',
  'Responder y resolver tickets',
  'Ver métricas y estadísticas',
  'Recibir recordatorios de tickets pendientes',
];

export const WORKFLOW_STEPS = [
  { step: 1, title: 'Cliente crea ticket', description: 'El cliente describe su problema y lo envía al sistema' },
  { step: 2, title: 'Sistema recibe ticket', description: 'El ticket queda registrado y visible en el dashboard' },
  { step: 3, title: 'Agente asignado recibe notificación', description: 'El sistema notifica al agente asignado por email' },
  { step: 4, title: 'Agente responde al cliente', description: 'El agente investiga y responde con soluciones' },
  { step: 5, title: 'Cliente recibe email con respuesta', description: 'El cliente es notificado automáticamente' },
  { step: 6, title: 'Agente cierra el ticket', description: 'Una vez resuelto, el agente marca el ticket como cerrado' },
  { step: 7, title: 'Cliente recibe confirmación de cierre', description: 'El sistema notifica que el caso fue resuelto' },
];

export const BENEFITS = [
  { title: 'Centralización', description: 'Un único lugar para gestionar todo', color: 'bg-primary-50 border-primary-200' },
  { title: 'Trazabilidad', description: 'Historial completo de cada solicitud', color: 'bg-secondary-50 border-secondary-200' },
  { title: 'Automatización', description: 'Procesos sin intervención manual', color: 'bg-accent-50 border-accent-200' },
  { title: 'Transparencia', description: 'Clientes ven progreso en tiempo real', color: 'bg-primary-50 border-primary-200' },
  { title: 'Eficiencia', description: 'Agentes responden más rápido', color: 'bg-secondary-50 border-secondary-200' },
  { title: 'Escalabilidad', description: 'Funciona para 10 o 1000 tickets', color: 'bg-accent-50 border-accent-200' },
];

export const USE_CASES = [
  'Empresas de soporte técnico',
  'Equipos de desarrollo que atienden clientes',
  'Departamentos de atención al cliente',
  'Consultorías y agencias',
  'Freelancers que manejan múltiples clientes',
  'Startups que necesitan gestión profesional',
];

export const TECHNOLOGIES = [
  'Next.js 16',
  'React + TypeScript',
  'Tailwind CSS',
  'PostgreSQL + Prisma',
  'Autenticación con JWT',
  'Nodemailer para emails',
];
