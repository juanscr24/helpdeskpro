'use client';

import { useEffect, useState } from 'react';
import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { PageTransition } from '@src/components/common';
import { Card } from '@src/components/ui/Card';
import { TicketCard } from '@src/components/tickets';
import { Button } from '@src/components/ui/Button';
import Link from 'next/link';
import { useAuth } from '@src/hooks/useAuth';
import { getTickets, Ticket } from '@src/services/ticketService';
import toast from 'react-hot-toast';

export default function AgentDashboardPage() {
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
    total: tickets.length,
    open: tickets.filter(t => t.status === 'OPEN').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    resolved: tickets.filter(t => t.status === 'RESOLVED').length,
    high: tickets.filter(t => t.priority === 'HIGH').length,
    myTickets: tickets.filter(t => t.assignedTo?.id === user?.id).length,
  };

  // Tickets sin asignar o con alta prioridad
  const urgentTickets = tickets
    .filter(t => !t.assignedTo || t.priority === 'HIGH')
    .slice(0, 6);

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="agent" currentPath="/agent/dashboard" />

      <div className="flex-1 lg:ml-64">
        <Header userName={user?.name || 'Agente'} userEmail={user?.email || ''} />

        <PageTransition>
          <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Panel de Agente
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Gestiona y da seguimiento a los tickets de soporte</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Tickets</p>
                <p className="text-3xl font-bold">
                  {stats.total}
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Abiertos</p>
                <p className="text-3xl font-bold">{stats.open}</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">En Progreso</p>
                <p className="text-3xl font-bold">{stats.inProgress}</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Resueltos</p>
                <p className="text-3xl font-bold">{stats.resolved}</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Alta Prioridad</p>
                <p className="text-3xl font-bold">{stats.high}</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Mis Tickets</p>
                <p className="text-3xl font-bold">{stats.myTickets}</p>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/agent/tickets">
                <Button variant="primary" size="lg">
                  Ver Todos los Tickets
                </Button>
              </Link>
              <Link href="/agent/tickets?status=OPEN">
                <Button variant="secondary" size="lg">
                  Tickets Abiertos
                </Button>
              </Link>
              <Link href={`/agent/tickets?assignedToId=${user?.id}`}>
                <Button variant="secondary" size="lg">
                  Mis Tickets Asignados
                </Button>
              </Link>
            </div>
          </div>

          {/* Urgent Tickets */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tickets Urgentes {urgentTickets.length > 0 && `(${urgentTickets.length})`}
              </h2>
              <Link href="/agent/tickets?priority=HIGH">
                <Button variant="ghost" size="sm">
                  Ver todos →
                </Button>
              </Link>
            </div>

            {urgentTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {urgentTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} role="agent" />
                ))}
              </div>
            ) : (
              <Card>
                <p className="text-gray-600 text-center py-8">
                  ¡Excelente! No hay tickets urgentes en este momento.
                </p>
              </Card>
            )}
          </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
