'use client'

import RegisterForm from "@src/components/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-900">
            <div className="w-full max-w-md mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-900 rounded-xl mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
                        <p className="text-gray-600">Únete a HelpDeskPro</p>
                    </div>
                    
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
