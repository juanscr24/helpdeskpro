import Link from 'next/link';
import { Button } from '@src/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">HelpDeskPro</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Sistema de Gestión de Tickets de Soporte Técnico
          </p>
          <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
            Administra, organiza y resuelve tickets de soporte de forma eficiente. 
            Perfecto para equipos de atención al cliente.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/login">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Iniciar Sesión
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="text-white border-white hover:bg-blue-700">
              Más Información
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Gestión de Tickets</h3>
            <p className="text-gray-600">
              Crea, organiza y da seguimiento a todos tus tickets de soporte en un solo lugar.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Asignación de Agentes</h3>
            <p className="text-gray-600">
              Asigna tickets automáticamente a agentes y mantén un seguimiento en tiempo real.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Comunicación</h3>
            <p className="text-gray-600">
              Colabora con tu equipo y clientes a través de comentarios en cada ticket.
            </p>
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
