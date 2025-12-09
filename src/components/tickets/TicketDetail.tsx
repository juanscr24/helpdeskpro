import React from 'react';
import { Badge } from '@src/components/ui/Badge';
import { Button } from '@src/components/ui/Button';

interface TicketDetailProps {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: string;
  assignedTo?: string;
  isAgent?: boolean;
  onStatusChange?: (status: string) => void;
  onBack?: () => void;
}

export const TicketDetail = ({
  id,
  title,
  description,
  status,
  priority,
  createdBy,
  createdAt,
  assignedTo,
  isAgent = false,
  onStatusChange,
  onBack,
}: TicketDetailProps) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-2">Ticket #{id}</p>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Badge variant={status}>{status.toUpperCase()}</Badge>
          <Badge variant={priority}>{priority.toUpperCase()}</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Información</h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium text-gray-700">Creado por:</span>{' '}
                <span className="text-gray-600">{createdBy}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Fecha de creación:</span>{' '}
                <span className="text-gray-600">{createdAt}</span>
              </p>
              {assignedTo && (
                <p>
                  <span className="font-medium text-gray-700">Asignado a:</span>{' '}
                  <span className="text-gray-600">{assignedTo}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Agent Actions */}
        {isAgent && (
          <div className="md:col-span-1 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">Acciones</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cambiar Estado
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm">
                    <option value="open">Abierto</option>
                    <option value="in_progress">En Progreso</option>
                    <option value="resolved">Resuelto</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cambiar Prioridad
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm">
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asignar a
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm">
                    <option value="">Sin asignar</option>
                    <option value="agent1">Agent1</option>
                    <option value="agent2">Agent2</option>
                    <option value="agent3">Agent3</option>
                  </select>
                </div>

                <Button variant="primary" size="sm" className="w-full">
                  Guardar Cambios
                </Button>

                <Button variant="danger" size="sm" className="w-full">
                  Cerrar Ticket
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
