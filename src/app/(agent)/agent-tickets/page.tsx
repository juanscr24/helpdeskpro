'use client';

import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { Button } from '@src/components/ui/Button';
import { Select } from '@src/components/ui/Select';
import { Input } from '@src/components/ui/Input';
import { Badge } from '@src/components/ui/Badge';
import Link from 'next/link';

const mockTickets = [
  {
    id: 1,
    title: 'Login no funciona',
    client: 'Juan Cardona',
    status: 'open' as const,
    priority: 'high' as const,
    assignedTo: '-',
    lastUpdate: '2025-12-09 10:30',
  },
  {
    id: 2,
    title: 'Error en dashboard',
    client: 'María García',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    assignedTo: 'Yo',
    lastUpdate: '2025-12-09 11:15',
  },
  {
    id: 3,
    title: 'Solicitud de reporte',
    client: 'Juan Cardona',
    status: 'resolved' as const,
    priority: 'low' as const,
    assignedTo: 'Agent2',
    lastUpdate: '2025-12-08 16:45',
  },
  {
    id: 4,
    title: 'No puedo descargar archivos',
    client: 'Carlos López',
    status: 'open' as const,
    priority: 'medium' as const,
    assignedTo: '-',
    lastUpdate: '2025-12-06 09:20',
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

const assignedOptions = [
  { value: '', label: 'Todos' },
  { value: 'me', label: 'Yo' },
  { value: 'unassigned', label: 'Sin asignar' },
];

export default function AgentTicketsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="agent" currentPath="/agent-tickets" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName="Agent1" userEmail="agent1@helpdesk.com" />

        {/* Content */}
        <main className="p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Gestión de Tickets</h1>
            <p className="text-gray-600 mt-1">Administra todos los tickets del sistema</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros Avanzados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Input
                placeholder="Buscar por ID o título..."
                type="text"
              />
              <Select
                label="Estado"
                options={statusOptions}
              />
              <Select
                label="Prioridad"
                options={priorityOptions}
              />
              <Select
                label="Asignado a"
                options={assignedOptions}
              />
              <div className="flex items-end">
                <Button variant="primary" className="w-full">
                  🔍 Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Título</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Prioridad</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Asignado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Última actualización</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">#{ticket.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.client}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={ticket.status}>{ticket.status.toUpperCase()}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={ticket.priority}>{ticket.priority.toUpperCase()}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignedTo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.lastUpdate}</td>
                    <td className="px-6 py-4 text-sm">
                      <Link href={`/agent-tickets/${ticket.id}`}>
                        <Button variant="ghost" size="sm">
                          Gestionar
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="secondary" size="sm" disabled>
              ← Anterior
            </Button>
            <span className="text-sm text-gray-600">Página 1 de 3</span>
            <Button variant="secondary" size="sm">
              Siguiente →
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
