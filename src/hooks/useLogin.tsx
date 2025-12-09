import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { loginUser } from "@src/services/auth";
import { LoginData } from "@src/types/login";

export const useLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = handleSubmit(async (data: LoginData) => {
        setError(null); // Limpiar errores previos
        
        try {
            const response = await loginUser(data);
            
            if (response?.error) {
                // NextAuth devuelve el error como string
                setError(response.error);
            } else if (response?.ok) {
                // Login exitoso
                router.push('/dashboard');
            } else {
                setError('An unexpected error occurred');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        }
    });

    return { register, onSubmit, errors, error };
};
