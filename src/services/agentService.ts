import api from './api';

export interface Agent {
  id: string;
  name: string;
  email: string;
}

/**
 * Obtener lista de todos los agentes
 */
export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await api.get<Agent[]>('/agents');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener agentes:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar agentes');
  }
}
