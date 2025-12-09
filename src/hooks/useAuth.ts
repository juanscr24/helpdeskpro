'use client';

import { useAuthContext } from '@src/context/AuthContext';

/**
 * Hook para acceder al contexto de autenticación
 * Incluye información del usuario y métodos útiles
 */
export function useAuth() {
  return useAuthContext();
}

export default useAuth;
