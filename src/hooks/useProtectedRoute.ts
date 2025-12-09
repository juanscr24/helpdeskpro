'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

type Role = 'CLIENT' | 'AGENT';

interface UseProtectedRouteOptions {
  allowedRoles?: Role[];
  redirectTo?: string;
}

/**
 * Hook para proteger rutas basado en autenticación y roles
 * @param options - Configuración de roles permitidos y redirección
 */
export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { allowedRoles, redirectTo = '/login' } = options;

  useEffect(() => {
    // Esperar a que termine de cargar
    if (isLoading) return;

    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Si se especificaron roles permitidos, verificar
    if (allowedRoles && allowedRoles.length > 0 && user) {
      if (!allowedRoles.includes(user.role)) {
        // Redirigir a la página apropiada según el rol
        if (user.role === 'CLIENT') {
          router.push('/dashboard');
        } else if (user.role === 'AGENT') {
          router.push('/agent-dashboard');
        } else {
          router.push('/unauthorized');
        }
      }
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, redirectTo, router]);

  return {
    user,
    isLoading,
    isAuthenticated,
    isAllowed: !allowedRoles || (user && allowedRoles.includes(user.role)),
  };
}

export default useProtectedRoute;
