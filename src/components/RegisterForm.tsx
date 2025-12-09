'use client'

import { useRegister } from "@src/hooks/useRegister";

const RegisterForm = () => {
    const { register, onSubmit, errors } = useRegister();

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                    Nombre Completo
                </label>
                <input 
                    type="text" 
                    placeholder="Juan Pérez"
                    {...register("name", { required: "El nombre es requerido" })}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none backdrop-blur-sm transition-all"
                />
                {errors.name && (
                    <span className="text-red-300 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                    Email
                </label>
                <input 
                    type="email" 
                    placeholder="tu@email.com"
                    {...register("email", { required: "El email es requerido" })}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none backdrop-blur-sm transition-all"
                />
                {errors.email && (
                    <span className="text-red-300 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email.message}
                    </span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                    Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    {...register("password", { 
                        required: "La contraseña es requerida",
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }
                    })}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none backdrop-blur-sm transition-all"
                />
                {errors.password && (
                    <span className="text-red-300 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password.message}
                    </span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                    Confirmar Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    {...register("confirmPassword", { required: "Confirma tu contraseña" })}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:outline-none backdrop-blur-sm transition-all"
                />
                {errors.confirmPassword && (
                    <span className="text-red-300 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.confirmPassword.message}
                    </span>
                )}
            </div>

            <button 
                className="w-full bg-gradient-primary hover:opacity-90 text-white p-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6" 
                type="submit"
            >
                Registrarse
            </button>

            <div className="text-center mt-4">
                <p className="text-white/70 text-sm">
                    ¿Ya tienes cuenta?{' '}
                    <a href="/login" className="text-purple-300 hover:text-purple-200 font-medium">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </form>
    )
}

export default RegisterForm;
