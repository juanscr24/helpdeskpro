import api from './api';

export interface Comment {
  id: string;
  message: string;
  createdAt: string;
  ticketId: string;
  author: {
    id: string;
    name: string;
    email: string;
    role: 'CLIENT' | 'AGENT';
  };
}

export interface CreateCommentData {
  ticketId: string;
  message: string;
}

/**
 * Obtener todos los comentarios de un ticket
 */
export async function getCommentsByTicket(ticketId: string): Promise<Comment[]> {
  try {
    const response = await api.get<Comment[]>(`/comments/${ticketId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener comentarios:', error);
    throw new Error(
      error.response?.data?.error || 'Error al cargar comentarios'
    );
  }
}

/**
 * Crear un nuevo comentario
 */
export async function createComment(
  data: CreateCommentData
): Promise<Comment> {
  try {
    const response = await api.post<Comment>('/comments', data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear comentario:', error);
    throw new Error(
      error.response?.data?.error || 'Error al agregar comentario'
    );
  }
}

/**
 * Eliminar un comentario (opcional)
 */
export async function deleteComment(id: string): Promise<void> {
  try {
    await api.delete(`/comments/${id}`);
  } catch (error: any) {
    console.error('Error al eliminar comentario:', error);
    throw new Error(
      error.response?.data?.error || 'Error al eliminar comentario'
    );
  }
}
