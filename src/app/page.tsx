import Link from 'next/link';
import { Button } from '@src/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="text-white text-xl font-bold">HelpDeskPro</span>
        </div>
        <Link href="/login">
          <Button size="sm" className="shadow-lg">
            Iniciar Sesión
          </Button>
        </Link>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center text-white mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            BUSINESS STARTUP<br />
            <span className="text-gradient">WEBSITE DESIGN</span><br />
            TEMPLATE
          </h1>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </p>

          <Link href="/login">
            <Button variant="primary" size="lg" className="shadow-2xl text-lg px-8 py-4">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">FEATURES</h2>
          
          {/* Icon Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-12 mb-16">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LOREM IPSUM</h4>
              <p className="text-xs text-gray-600 text-center">Lorem Ipsum is simply dummy text of the printing.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LOREM IPSUM</h4>
              <p className="text-xs text-gray-600 text-center">Lorem Ipsum is simply dummy text of the printing.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LOREM IPSUM</h4>
              <p className="text-xs text-gray-600 text-center">Lorem Ipsum is simply dummy text of the printing.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LOREM IPSUM</h4>
              <p className="text-xs text-gray-600 text-center">Lorem Ipsum is simply dummy text of the printing.</p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-8 mb-4 hover:shadow-lg transition-shadow">
                <svg className="w-16 h-16 mx-auto text-pink-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LOREM IPSUM</h4>
              <p className="text-sm text-gray-600">Lorem Ipsum is simply dummy text of the printing.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-8 mb-4 hover:shadow-lg transition-shadow">
                <svg className="w-16 h-16 mx-auto text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LOREM IPSUM</h4>
              <p className="text-sm text-gray-600">Lorem Ipsum is simply dummy text of the printing.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-xl p-8 mb-4 hover:shadow-lg transition-shadow">
                <svg className="w-16 h-16 mx-auto text-pink-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">LOREM IPSUM</h4>
              <p className="text-sm text-gray-600">Lorem Ipsum is simply dummy text of the printing.</p>
            </div>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-white text-center">
          <p className="text-lg mb-4">
            Demo: Usa las siguientes credenciales para probar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold mb-2">Cliente</p>
              <p className="text-blue-100">Email: cliente@example.com</p>
              <p className="text-blue-100">Contraseña: password123</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Agente</p>
              <p className="text-blue-100">Email: agente@example.com</p>
              <p className="text-blue-100">Contraseña: password123</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
