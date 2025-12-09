'use client'

import { useRegister } from "@src/hooks/useRegister";
import { Input } from "@src/components/ui/Input";
import { Button } from "@src/components/ui/Button";

const RegisterForm = () => {
    const { register, onSubmit, errors } = useRegister();

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input
                type="text"
                label="Nombre Completo"
                placeholder="Juan Pérez"
                {...register("name", { required: "El nombre es requerido" })}
                error={errors.name?.message}
                required
            />

            <Input
                type="email"
                label="Email"
                placeholder="tu@email.com"
                {...register("email", { required: "El email es requerido" })}
                error={errors.email?.message}
                required
            />

            <Input
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                {...register("password", { 
                    required: "La contraseña es requerida",
                    minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres"
                    }
                })}
                error={errors.password?.message}
                required
            />

            <Input
                type="password"
                label="Confirmar Contraseña"
                placeholder="••••••••"
                {...register("confirmPassword", { required: "Confirma tu contraseña" })}
                error={errors.confirmPassword?.message}
                required
            />

            <Button 
                type="submit"
                className="w-full mt-6"
                size="lg"
            >
                Registrarse
            </Button>

            <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                    ¿Ya tienes cuenta?{' '}
                    <a href="/login" className="text-primary-900 hover:text-primary-700 font-medium">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </form>
    )
}

export default RegisterForm;
