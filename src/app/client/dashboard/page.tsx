'use client';

import { useEffect, useState } from 'react';
import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { Card } from '@src/components/ui/Card';
import { Button } from '@src/components/ui/Button';
import { TicketCard } from '@src/components/TicketCard';
import Link from 'next/link';
import { useAuth } from '@src/hooks/useAuth';
import { getTickets, Ticket } from '@src/services/ticketService';
import toast from 'react-hot-toast';

export default function ClientDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      loadTickets();
    }
  }, [authLoading, user]);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const data = await getTickets();
      setTickets(data);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar tickets');
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular estadísticas
  const stats = {
    open: tickets.filter(t => t.status === 'OPEN').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    resolved: tickets.filter(t => t.status === 'RESOLVED').length,
    closed: tickets.filter(t => t.status === 'CLOSED').length,
  };

  // Obtener tickets recientes (últimos 5)
  const recentTickets = tickets.slice(0, 5);

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen bg-white items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="client" currentPath="/client/dashboard" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName={user?.name || 'Usuario'} userEmail={user?.email || ''} />

        {/* Content */}
        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Bienvenido, {user?.name || 'Usuario'}
            </h1>
            <p className="text-gray-600">Aquí está un resumen de tus tickets</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Tickets Abiertos</p>
                <p className="text-4xl font-bold text-primary-900">
                  {stats.open}
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">En Progreso</p>
                <p className="text-4xl font-bold text-secondary-600">
                  {stats.inProgress}
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Resueltos</p>
                <p className="text-4xl font-bold text-green-600">
                  {stats.resolved}
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Cerrados</p>
                <p className="text-4xl font-bold text-gray-600">
                  {stats.closed}
                </p>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="flex gap-4">
              <Link href="/client/tickets/new">
                <Button variant="primary" size="lg">
                  Crear Nuevo Ticket
                </Button>
              </Link>
              <Link href="/client/tickets">
                <Button variant="secondary" size="lg">
                  Ver Todos mis Tickets
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Tickets */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Tickets Recientes</h2>
              {tickets.length > 5 && (
                <Link href="/client/tickets">
                  <Button variant="ghost" size="sm">
                    Ver todos →
                  </Button>
                </Link>
              )}
            </div>
            
            {recentTickets.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recentTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} role="client" />
                ))}
              </div>
            ) : (
              <Card>
                <p className="text-gray-600 text-center py-8">
                  No tienes tickets aún. ¡Crea tu primer ticket!
                </p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
