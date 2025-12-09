import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login } from "@src/services/authService";
import { useAuth } from "@src/hooks/useAuth";
import toast from 'react-hot-toast';

interface LoginData {
    email: string;
    password: string;
}

export const useLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { refreshUser } = useAuth();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data: LoginData) => {
        setError(null);
        setIsLoading(true);
        
        try {
            const response = await login(data.email, data.password);
            
            if (response?.user) {
                // Actualizar contexto con el usuario
                await refreshUser();
                
                // Redirigir según el rol
                toast.success(`¡Bienvenido ${response.user.name}!`);
                if (response.user.role === 'AGENT') {
                    router.push('/agent/dashboard');
                } else {
                    router.push('/client/dashboard');
                }
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Error al iniciar sesión';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    });

    return { register, onSubmit, errors, error, isLoading };
};
