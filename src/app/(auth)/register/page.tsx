'use client'

import RegisterForm from "@src/components/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            
            <div className="w-full max-w-md mx-auto px-6 relative z-10">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Crear Cuenta</h1>
                        <p className="text-white/70">Únete a HelpDeskPro</p>
                    </div>
                    
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
