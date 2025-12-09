'use client';

import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { Card } from '@src/components/ui/Card';
import { Button } from '@src/components/ui/Button';
import Link from 'next/link';

export default function ClientDashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="client" currentPath="/dashboard" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName="Juan Cardona" userEmail="juan@example.com" />

        {/* Content */}
        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bienvenido, Juan</h1>
            <p className="text-gray-600">Aquí está un resumen de tus tickets</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Tickets Abiertos</p>
                <p className="text-4xl font-bold text-blue-600">3</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">En Progreso</p>
                <p className="text-4xl font-bold text-yellow-600">2</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Resueltos</p>
                <p className="text-4xl font-bold text-green-600">5</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Cerrados</p>
                <p className="text-4xl font-bold text-gray-600">12</p>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="flex gap-4">
              <Link href="/tickets/new">
                <Button variant="primary" size="lg">
                  ✨ Crear Nuevo Ticket
                </Button>
              </Link>
              <Link href="/tickets">
                <Button variant="secondary" size="lg">
                  🎫 Ver Todos mis Tickets
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
            <Card>
              <p className="text-gray-600">No hay actividad reciente</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
