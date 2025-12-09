import { signIn, signOut } from 'next-auth/react';
import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'AGENT';
}

export interface LoginResponse {
  user: User;
  token?: string;
}

/**
 * Login usando NextAuth
 */
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    if (!response?.ok) {
      throw new Error('Error al iniciar sesión');
    }

    // Obtener datos del usuario actual
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('No se pudo obtener información del usuario');
    }

    return { user };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Error al iniciar sesión');
  }
}

/**
 * Logout usando NextAuth
 */
export async function logout(): Promise<void> {
  try {
    // Limpiar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }

    // Cerrar sesión de NextAuth
    await signOut({ redirect: true, callbackUrl: '/login' });
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Error al cerrar sesión');
  }
}

/**
 * Obtener usuario actual desde el endpoint /api/auth/me
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await api.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return null;
  }
}

/**
 * Registrar nuevo usuario (si decides implementar el endpoint)
 */
export async function register(data: {
  name: string;
  email: string;
  password: string;
  role?: 'CLIENT' | 'AGENT';
}): Promise<User> {
  try {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  } catch (error: any) {
    console.error('Register error:', error);
    throw new Error(
      error.response?.data?.error || 'Error al registrar usuario'
    );
  }
}
