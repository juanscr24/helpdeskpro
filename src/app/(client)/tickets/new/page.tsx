'use client';

import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { TicketForm } from '@src/components/tickets/TicketForm';
import { Card } from '@src/components/ui/Card';

export default function CreateClientTicketPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="client" currentPath="/tickets" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName="Juan Cardona" userEmail="juan@example.com" />

        {/* Content */}
        <main className="p-8 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Crear Nuevo Ticket</h1>
            <p className="text-gray-600 mt-2">
              Describe tu problema o solicitud de soporte y nuestro equipo te ayudará lo antes posible.
            </p>
          </div>

          <Card>
            <TicketForm />
          </Card>
        </main>
      </div>
    </div>
  );
}
