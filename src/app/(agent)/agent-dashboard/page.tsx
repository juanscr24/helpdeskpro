'use client';

import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { Card } from '@src/components/ui/Card';
import { TicketCard } from '@src/components/tickets/TicketCard';
import Link from 'next/link';

const mockStats = [
  { label: 'Total de Tickets', value: '47', color: 'text-blue-600' },
  { label: 'Tickets Abiertos', value: '12', color: 'text-red-600' },
  { label: 'Pendientes de Respuesta', value: '5', color: 'text-yellow-600' },
  { label: 'Resueltos Hoy', value: '3', color: 'text-green-600' },
];

const mockPendingTickets = [
  {
    id: 1,
    title: 'Login no funciona',
    status: 'open' as const,
    priority: 'high' as const,
    createdAt: '2025-12-09',
    createdBy: 'Client1',
  },
  {
    id: 4,
    title: 'No puedo descargar archivos',
    status: 'open' as const,
    priority: 'medium' as const,
    createdAt: '2025-12-06',
    createdBy: 'Client2',
  },
];

export default function AgentDashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="agent" currentPath="/agent-dashboard" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName="Agent1" userEmail="agent1@helpdesk.com" />

        {/* Content */}
        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Agente</h1>
            <p className="text-gray-600">Gestiona y da seguimiento a los tickets de soporte</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockStats.map((stat) => (
              <Card key={stat.label}>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                  <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Pending Tickets */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Tickets sin Respuesta</h2>
              <Link href="/agent-tickets">
                <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm cursor-pointer">
                  Ver todos →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPendingTickets.map((ticket) => (
                <Link key={ticket.id} href={`/agent-tickets/${ticket.id}`}>
                  <div className="cursor-pointer">
                    <TicketCard {...ticket} onViewDetail={() => {}} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
