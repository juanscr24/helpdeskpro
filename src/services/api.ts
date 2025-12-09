import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Crear instancia de Axios configurada
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request para agregar token JWT
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Intentar obtener token de localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      console.error('❌ No autenticado - Token inválido o expirado');
      // Limpiar token y redirigir a login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // Solo redirigir si no estamos ya en la página de login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    // Manejar errores de permisos
    if (error.response?.status === 403) {
      console.error('❌ Acceso denegado - Permisos insuficientes');
    }

    // Manejar errores del servidor
    if (error.response?.status === 500) {
      console.error('❌ Error interno del servidor');
    }

    // Loguear error para debugging
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default api;
