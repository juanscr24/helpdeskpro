'use client'

import { useLogin } from "@src/hooks/useLogin";

const LoginForm = () => {
    const { register, onSubmit, errors, error, isLoading } = useLogin();

    return (
        <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
            {error && (
                <div className="p-3 mb-4 text-sm rounded bg-red-100 text-red-700 border border-red-300">
                    {error}
                </div>
            )}
            <h1 className="text-slate-800 font-bold text-4xl mb-6">Iniciar Sesión</h1>

            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                </label>
                <input 
                    type="email" 
                    placeholder="tu@email.com"
                    {...register("email", { required: "El email es requerido" })}
                    className="p-3 rounded border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full"
                    disabled={isLoading}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    {...register("password", { required: "La contraseña es requerida" })}
                    className="p-3 rounded border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 block w-full"
                    disabled={isLoading}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
                )}
            </div>

            <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed" 
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
        </form>
    );
};

export default LoginForm;
