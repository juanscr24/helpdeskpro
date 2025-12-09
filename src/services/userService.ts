import api from './api';
import type { User, Role } from '@src/types';

export interface UserWithStats extends User {
  _count?: {
    ticketsCreated: number;
    ticketsAssigned: number;
  };
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: Role;
}

/**
 * Obtener todos los usuarios (solo para agentes)
 */
export async function getAllUsers(): Promise<UserWithStats[]> {
  try {
    const response = await api.get<UserWithStats[]>('/users');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener usuarios:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar usuarios');
  }
}

/**
 * Obtener un usuario por ID
 */
export async function getUserById(id: string): Promise<UserWithStats> {
  try {
    const response = await api.get<UserWithStats>(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener usuario:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar usuario');
  }
}

/**
 * Actualizar un usuario
 */
export async function updateUser(id: string, data: UpdateUserData): Promise<User> {
  try {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error al actualizar usuario:', error);
    throw new Error(error.response?.data?.error || 'Error al actualizar usuario');
  }
}

/**
 * Eliminar un usuario
 */
export async function deleteUser(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
  } catch (error: any) {
    console.error('Error al eliminar usuario:', error);
    throw new Error(error.response?.data?.error || 'Error al eliminar usuario');
  }
}

/**
 * Cambiar el rol de un usuario
 */
export async function changeUserRole(id: string, role: Role): Promise<User> {
  try {
    const response = await api.patch<User>(`/users/${id}/role`, { role });
    return response.data;
  } catch (error: any) {
    console.error('Error al cambiar rol:', error);
    throw new Error(error.response?.data?.error || 'Error al cambiar rol del usuario');
  }
}
