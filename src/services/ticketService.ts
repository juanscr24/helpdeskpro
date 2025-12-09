import api from './api';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  } | null;
  _count?: {
    comments: number;
  };
}

export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedToId?: string;
  search?: string;
}

export interface CreateTicketData {
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface UpdateTicketData {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedToId?: string;
}

/**
 * Obtener todos los tickets con filtros opcionales
 * Para clientes: solo sus tickets
 * Para agentes: todos los tickets
 */
export async function getTickets(filters?: TicketFilters): Promise<Ticket[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.assignedToId) params.append('assignedToId', filters.assignedToId);
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get<Ticket[]>(`/tickets?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener tickets:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar tickets');
  }
}

/**
 * Obtener mis tickets (solo para clientes)
 */
export async function getMyTickets(): Promise<Ticket[]> {
  try {
    const response = await api.get<Ticket[]>('/tickets/my');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener mis tickets:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar tus tickets');
  }
}

/**
 * Obtener un ticket por ID
 */
export async function getTicketById(id: string): Promise<Ticket> {
  try {
    const response = await api.get<Ticket>(`/tickets/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener ticket:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar el ticket');
  }
}

/**
 * Crear un nuevo ticket
 */
export async function createTicket(data: CreateTicketData): Promise<Ticket> {
  try {
    const response = await api.post<Ticket>('/tickets', data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear ticket:', error);
    throw new Error(error.response?.data?.error || 'Error al crear el ticket');
  }
}

/**
 * Actualizar un ticket (solo agentes)
 */
export async function updateTicket(
  id: string,
  data: UpdateTicketData
): Promise<Ticket> {
  try {
    const response = await api.patch<Ticket>(`/tickets/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error al actualizar ticket:', error);
    throw new Error(error.response?.data?.error || 'Error al actualizar el ticket');
  }
}

/**
 * Asignar un ticket a un agente
 */
export async function assignTicket(
  id: string,
  agentId: string
): Promise<Ticket> {
  try {
    const response = await api.put<Ticket>(`/tickets/${id}/assign`, {
      agentId,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error al asignar ticket:', error);
    throw new Error(error.response?.data?.error || 'Error al asignar el ticket');
  }
}

/**
 * Eliminar un ticket
 */
export async function deleteTicket(id: string): Promise<void> {
  try {
    await api.delete(`/tickets/${id}`);
  } catch (error: any) {
    console.error('Error al eliminar ticket:', error);
    throw new Error(error.response?.data?.error || 'Error al eliminar el ticket');
  }
}
