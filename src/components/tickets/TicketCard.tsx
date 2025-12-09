import React from 'react';
import { Card } from '@src/components/ui/Card';
import { Badge } from '@src/components/ui/Badge';
import { Button } from '@src/components/ui/Button';

interface TicketCardProps {
  id: number;
  title: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  createdBy?: string;
  assignedTo?: string;
  onViewDetail?: () => void;
}

export const TicketCard = ({
  id,
  title,
  status,
  priority,
  createdAt,
  createdBy,
  assignedTo,
  onViewDetail,
}: TicketCardProps) => {
  return (
    <Card hoverable onClick={onViewDetail} className="cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 mb-1">#{id}</p>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Badge variant={status}>{status.toUpperCase()}</Badge>
        <Badge variant={priority}>{priority.toUpperCase()}</Badge>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>📅 Creado: {createdAt}</p>
        {createdBy && <p>👤 Por: {createdBy}</p>}
        {assignedTo && <p>👨‍💼 Asignado: {assignedTo}</p>}
      </div>

      {onViewDetail && (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail();
          }}
          className="w-full"
        >
          Ver Detalles
        </Button>
      )}
    </Card>
  );
};
