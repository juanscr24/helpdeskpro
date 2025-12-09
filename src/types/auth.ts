// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'AGENT';
}
