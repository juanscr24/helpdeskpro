'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { PageTransition } from '@src/components/common';
import { TicketCard } from '@src/components/tickets';
import { Button } from '@src/components/ui/Button';
import { Select } from '@src/components/ui/Select';
import { Input } from '@src/components/ui/Input';
import { useAuth } from '@src/hooks/useAuth';
import { getTickets, Ticket } from '@src/services/ticketService';
import { getAgents, Agent } from '@src/services/agentService';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: '', label: 'Todos los Estados' },
  { value: 'OPEN', label: 'Abierto' },
  { value: 'IN_PROGRESS', label: 'En Progreso' },
  { value: 'RESOLVED', label: 'Resuelto' },
  { value: 'CLOSED', label: 'Cerrado' },
];

const priorityOptions = [
  { value: '', label: 'Todas las Prioridades' },
  { value: 'LOW', label: 'Baja' },
  { value: 'MEDIUM', label: 'Media' },
  { value: 'HIGH', label: 'Alta' },
];

function AgentTicketsContent() {
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtros - inicializar desde URL params
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get('priority') || '');
  const [agentFilter, setAgentFilter] = useState(searchParams.get('assignedToId') || '');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (!authLoading && user) {
      loadData();
    }
  }, [authLoading, user]);

  useEffect(() => {
    // Aplicar filtros
    let result = [...tickets];

    if (statusFilter) {
      result = result.filter(t => t.status === statusFilter);
    }

    if (priorityFilter) {
      result = result.filter(t => t.priority === priorityFilter);
    }

    if (agentFilter) {
      if (agentFilter === 'unassigned') {
        result = result.filter(t => !t.assignedTo);
      } else {
        result = result.filter(t => t.assignedTo?.id === agentFilter);
      }
    }

    if (searchFilter) {
      const search = searchFilter.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search) ||
        t.createdBy.name.toLowerCase().includes(search)
      );
    }

    setFilteredTickets(result);
  }, [tickets, statusFilter, priorityFilter, agentFilter, searchFilter]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ticketsData, agentsData] = await Promise.all([
        getTickets(),
        getAgents(),
      ]);
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
      setAgents(agentsData);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tickets...</p>
        </div>
      </div>
    );
  }

  const agentOptions = [
    { value: '', label: 'Todos los Agentes' },
    { value: 'unassigned', label: 'Sin Asignar' },
    ...agents.map(agent => ({
      value: agent.id,
      label: agent.name,
    })),
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="agent" currentPath="/agent/tickets" />

      <div className="flex-1 lg:ml-64">
        <Header userName={user?.name || 'Agente'} userEmail={user?.email || ''} />

        <PageTransition>
          <main className="p-4 sm:p-6 lg:p-8">
          {/* Title */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Gestión de Tickets</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Administra todos los tickets del sistema ({filteredTickets.length} total)
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-purple-200 p-4 sm:p-6 mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Input
                label="Buscar"
                type="text"
                placeholder="Título, descripción o cliente..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
              <Select
                label="Estado"
                options={statusOptions}
                placeholder="Selecciona un estado"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <Select
                label="Prioridad"
                options={priorityOptions}
                placeholder="Selecciona una prioridad"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              />
              <Select
                label="Agente Asignado"
                options={agentOptions}
                placeholder="Selecciona un agente"
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
              />
            </div>
            {(statusFilter || priorityFilter || agentFilter || searchFilter) && (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStatusFilter('');
                    setPriorityFilter('');
                    setAgentFilter('');
                    setSearchFilter('');
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          {/* Tickets Grid */}
          {filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} role="agent" />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-12 text-center">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No se encontraron tickets
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Intenta ajustar los filtros para ver más resultados
              </p>
            </div>
          )}
          </main>
        </PageTransition>
      </div>
    </div>
  );
}

export default function AgentTicketsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <AgentTicketsContent />
    </Suspense>
  );
}
