'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@src/components/ui/Input';
import { Textarea } from '@src/components/ui/Textarea';
import { Select } from '@src/components/ui/Select';
import { Button } from '@src/components/ui/Button';
import { createTicket } from '@src/services/ticketService';
import toast from 'react-hot-toast';

interface TicketFormProps {
  onSuccess?: () => void;
}

const priorityOptions = [
  { value: 'LOW', label: 'Baja' },
  { value: 'MEDIUM', label: 'Media' },
  { value: 'HIGH', label: 'Alta' },
];

export const TicketForm = ({ onSuccess }: TicketFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const ticket = await createTicket({
        title: formData.title,
        description: formData.description,
        priority: formData.priority as 'LOW' | 'MEDIUM' | 'HIGH',
      });

      toast.success('¡Ticket creado exitosamente!');
      
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirigir al detalle del ticket creado
        router.push(`/tickets/${ticket.id}`);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al crear el ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'MEDIUM',
    });
    setErrors({
      title: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Título del Ticket"
        placeholder="Ej: Mi pantalla no funciona correctamente"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        required
        disabled={isLoading}
      />

      <Textarea
        label="Descripción"
        placeholder="Describe el problema en detalle..."
        rows={5}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        error={errors.description}
        required
        disabled={isLoading}
      />

      <Select
        label="Prioridad"
        options={priorityOptions}
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        required
        disabled={isLoading}
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Creando...' : 'Crear Ticket'}
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          className="flex-1"
          onClick={handleReset}
          disabled={isLoading}
        >
          Limpiar
        </Button>
      </div>
    </form>
  );
};
