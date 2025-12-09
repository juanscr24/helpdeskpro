'use client';

import { useEffect, useState } from 'react';
import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { TicketCard } from '@src/components/TicketCard';
import { Button } from '@src/components/ui/Button';
import { Select } from '@src/components/ui/Select';
import { Input } from '@src/components/ui/Input';
import Link from 'next/link';
import { useAuth } from '@src/hooks/useAuth';
import { getTickets, Ticket, TicketStatus, TicketPriority } from '@src/services/ticketService';
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

export default function ClientTicketsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtros
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (!authLoading && user) {
      loadTickets();
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

    if (searchFilter) {
      const search = searchFilter.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search)
      );
    }

    setFilteredTickets(result);
  }, [tickets, statusFilter, priorityFilter, searchFilter]);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const data = await getTickets();
      setTickets(data);
      setFilteredTickets(data);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar tickets');
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="client" currentPath="/client/tickets" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName={user?.name || 'Usuario'} userEmail={user?.email || ''} />

        {/* Content */}
        <main className="p-8">
          {/* Title and Action */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Mis Tickets</h1>
              <p className="text-gray-600 mt-1">
                Administra y da seguimiento a tus tickets de soporte ({filteredTickets.length} total)
              </p>
            </div>
            <Link href="/client/tickets/new">
              <Button variant="primary" size="lg">
                ✨ Crear Nuevo Ticket
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-purple-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Buscar"
                type="text"
                placeholder="Buscar por título o descripción..."
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
            </div>
            {(statusFilter || priorityFilter || searchFilter) && (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStatusFilter('');
                    setPriorityFilter('');
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} role="client" />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron tickets
              </h3>
              <p className="text-gray-600 mb-6">
                {tickets.length === 0
                  ? 'No tienes tickets aún. ¡Crea tu primer ticket!'
                  : 'Intenta ajustar los filtros para ver más resultados'}
              </p>
              {tickets.length === 0 && (
                <Link href="/client/tickets/new">
                  <Button variant="primary">
                    Crear Primer Ticket
                  </Button>
                </Link>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
