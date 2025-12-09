'use client';

import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { TicketCard } from '@src/components/tickets/TicketCard';
import { Button } from '@src/components/ui/Button';
import { Select } from '@src/components/ui/Select';
import Link from 'next/link';

const mockTickets = [
  {
    id: 1,
    title: 'Login no funciona',
    status: 'open' as const,
    priority: 'high' as const,
    createdAt: '2025-12-09',
    createdBy: 'Juan Cardona',
  },
  {
    id: 2,
    title: 'Error en dashboard',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    createdAt: '2025-12-08',
    createdBy: 'Juan Cardona',
    assignedTo: 'Agent1',
  },
  {
    id: 3,
    title: 'Solicitud de reporte',
    status: 'resolved' as const,
    priority: 'low' as const,
    createdAt: '2025-12-07',
    createdBy: 'Juan Cardona',
  },
  {
    id: 4,
    title: 'No puedo descargar archivos',
    status: 'open' as const,
    priority: 'medium' as const,
    createdAt: '2025-12-06',
    createdBy: 'Juan Cardona',
  },
];

const statusOptions = [
  { value: '', label: 'Todos los Estados' },
  { value: 'open', label: 'Abierto' },
  { value: 'in_progress', label: 'En Progreso' },
  { value: 'resolved', label: 'Resuelto' },
  { value: 'closed', label: 'Cerrado' },
];

const priorityOptions = [
  { value: '', label: 'Todas las Prioridades' },
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
];

export default function ClientTicketsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="client" currentPath="/tickets" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName="Juan Cardona" userEmail="juan@example.com" />

        {/* Content */}
        <main className="p-8">
          {/* Title and Action */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Mis Tickets</h1>
              <p className="text-gray-600 mt-1">Administra y da seguimiento a tus tickets de soporte</p>
            </div>
            <Link href="/tickets/new">
              <Button variant="primary" size="lg">
                ✨ Crear Nuevo Ticket
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Estado"
                options={statusOptions}
                placeholder="Selecciona un estado"
              />
              <Select
                label="Prioridad"
                options={priorityOptions}
                placeholder="Selecciona una prioridad"
              />
            </div>
          </div>

          {/* Tickets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockTickets.map((ticket) => (
              <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                <TicketCard
                  {...ticket}
                  onViewDetail={() => {}}
                />
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="secondary" size="sm" disabled>
              ← Anterior
            </Button>
            <span className="text-sm text-gray-600">Página 1 de 1</span>
            <Button variant="secondary" size="sm" disabled>
              Siguiente →
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
