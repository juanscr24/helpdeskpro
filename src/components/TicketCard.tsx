'use client';

import React from 'react';
import { Card } from '@src/components/ui/Card';
import { Badge } from '@src/components/ui/Badge';
import { Button } from '@src/components/ui/Button';
import Link from 'next/link';
import { Ticket, TicketStatus, TicketPriority } from '@src/services/ticketService';

interface TicketCardProps {
  ticket: Ticket;
  role?: 'client' | 'agent';
  showActions?: boolean;
  className?: string;
}

const statusConfig: Record<TicketStatus, { label: string; variant: 'open' | 'in_progress' | 'resolved' | 'closed' }> = {
  OPEN: { label: 'Abierto', variant: 'open' },
  IN_PROGRESS: { label: 'En Progreso', variant: 'in_progress' },
  RESOLVED: { label: 'Resuelto', variant: 'resolved' },
  CLOSED: { label: 'Cerrado', variant: 'closed' },
};

const priorityConfig: Record<TicketPriority, { label: string; variant: 'low' | 'medium' | 'high' }> = {
  LOW: { label: 'Baja', variant: 'low' },
  MEDIUM: { label: 'Media', variant: 'medium' },
  HIGH: { label: 'Alta', variant: 'high' },
};

export function TicketCard({ ticket, role = 'client', showActions = true, className = '' }: TicketCardProps) {
  const statusInfo = statusConfig[ticket.status];
  const priorityInfo = priorityConfig[ticket.priority];
  
  const detailHref = role === 'agent' 
    ? `/agent/tickets/${ticket.id}` 
    : `/client/tickets/${ticket.id}`;

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {ticket.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {ticket.description}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
          <Badge variant={priorityInfo.variant}>
            Prioridad: {priorityInfo.label}
          </Badge>
          {ticket._count && ticket._count.comments > 0 && (
            <Badge variant="open">
              💬 {ticket._count.comments} {ticket._count.comments === 1 ? 'comentario' : 'comentarios'}
            </Badge>
          )}
        </div>

        {/* Metadata */}
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Creado por:</span>
            <span>{ticket.createdBy.name}</span>
          </div>
          {ticket.assignedTo && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Asignado a:</span>
              <span>{ticket.assignedTo.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-medium">Fecha:</span>
            <span>{new Date(ticket.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2 border-t border-gray-200">
            <Link href={detailHref} className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                Ver Detalle
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
