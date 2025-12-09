'use client'

import { useLogin } from "@src/hooks/useLogin";

const LoginForm = () => {
    const { register, onSubmit, errors, error, isLoading } = useLogin();

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {error && (
                <div className="p-3 mb-4 text-sm rounded-lg bg-red-50 text-red-800 border border-red-200 flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="tu@email.com"
                    {...register("email", { required: "El email es requerido" })}
                    className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all"
                    disabled={isLoading}
                />
                {errors.email && (
                    <span className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email.message}
                    </span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { required: "La contraseña es requerida" })}
                    className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all"
                    disabled={isLoading}
                />
                {errors.password && (
                    <span className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password.message}
                    </span>
                )}
            </div>

            <button
                className="w-full bg-primary-900 hover:bg-primary-800 text-white p-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-6"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Iniciando sesión...
                    </span>
                ) : (
                    'Iniciar Sesión'
                )}
            </button>
            <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                    ¿No tienes cuenta?{' '}
                    <a href="/register" className="text-primary-900 hover:text-primary-700 font-medium">
                        Registrate
                    </a>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
