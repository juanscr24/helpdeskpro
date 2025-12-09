'use client';

import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { TicketDetail } from '@src/components/tickets/TicketDetail';
import { CommentSection } from '@src/components/tickets/CommentSection';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClientTicketDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="client" currentPath="/tickets" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header userName="Juan Cardona" userEmail="juan@example.com" />

        {/* Content */}
        <main className="p-8 max-w-4xl">
          <TicketDetail
            id={parseInt(params.id)}
            title="Login no funciona"
            description="No puedo entrar a mi cuenta con mis credenciales. Cuando intento iniciar sesión, me muestra un error que dice 'Credenciales inválidas' aunque estoy seguro de que están correctas. He intentado cambiar la contraseña pero el problema persiste."
            status="open"
            priority="high"
            createdBy="Juan Cardona"
            createdAt="2025-12-09"
            isAgent={false}
            onBack={() => router.back()}
          />

          {/* Comments Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <CommentSection />
          </div>
        </main>
      </div>
    </div>
  );
}
