'use client';

import { use, useState, useEffect } from 'react';
import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { Card } from '@src/components/ui/Card';
import { Badge } from '@src/components/ui/Badge';
import { Button } from '@src/components/ui/Button';
import { Textarea } from '@src/components/ui/Textarea';
import { useRouter } from 'next/navigation';
import { useAuth } from '@src/hooks/useAuth';
import { getTicketById, Ticket } from '@src/services/ticketService';
import { getCommentsByTicket, createComment, Comment } from '@src/services/commentService';
import toast from 'react-hot-toast';

export default function ClientTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      loadData();
    }
  }, [authLoading, user, id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ticketData, commentsData] = await Promise.all([
        getTicketById(id),
        getCommentsByTicket(id),
      ]);
      setTicket(ticketData);
      setComments(commentsData);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar el ticket');
      router.push('/client/tickets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast.error('El comentario no puede estar vacío');
      return;
    }

    try {
      setIsSubmitting(true);
      const comment = await createComment({
        ticketId: id,
        message: newComment,
      });
      setComments([...comments, comment]);
      setNewComment('');
      toast.success('Comentario agregado');
    } catch (error: any) {
      toast.error(error.message || 'Error al agregar comentario');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  const statusConfig = {
    OPEN: { label: 'Abierto', variant: 'open' as const },
    IN_PROGRESS: { label: 'En Progreso', variant: 'in_progress' as const },
    RESOLVED: { label: 'Resuelto', variant: 'resolved' as const },
    CLOSED: { label: 'Cerrado', variant: 'closed' as const },
  };

  const priorityConfig = {
    LOW: { label: 'Baja', variant: 'low' as const },
    MEDIUM: { label: 'Media', variant: 'medium' as const },
    HIGH: { label: 'Alta', variant: 'high' as const },
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="client" currentPath="/client/tickets" />

      <div className="flex-1 ml-64">
        <Header userName={user?.name || 'Usuario'} userEmail={user?.email || ''} />

        <main className="p-8 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
            ← Volver a tickets
          </Button>

          {/* Ticket Detail Card */}
          <Card className="mb-8">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{ticket.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={statusConfig[ticket.status].variant}>
                    {statusConfig[ticket.status].label}
                  </Badge>
                  <Badge variant={priorityConfig[ticket.priority].variant}>
                    Prioridad: {priorityConfig[ticket.priority].label}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
              </div>

              {/* Metadata */}
              <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Creado por:</span>
                  <p className="font-semibold text-gray-900">{ticket.createdBy.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Fecha de creación:</span>
                  <p className="font-semibold text-gray-900">
                    {new Date(ticket.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {ticket.assignedTo && (
                  <div>
                    <span className="text-gray-600">Asignado a:</span>
                    <p className="font-semibold text-gray-900">{ticket.assignedTo.name}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Última actualización:</span>
                  <p className="font-semibold text-gray-900">
                    {new Date(ticket.updatedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Comentarios ({comments.length})
            </h2>

            {/* Comments List */}
            <div className="space-y-4 mb-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Card key={comment.id}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shrink-0">
                        {comment.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">
                            {comment.author.name}
                          </span>
                          <Badge variant={comment.author.role === 'AGENT' ? 'in_progress' : 'open'}>
                            {comment.author.role === 'AGENT' ? 'Agente' : 'Cliente'}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{comment.message}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <p className="text-gray-600 text-center py-8">
                    No hay comentarios aún. ¡Sé el primero en comentar!
                  </p>
                </Card>
              )}
            </div>

            {/* Add Comment Form */}
            {ticket.status !== 'CLOSED' && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Comentario</h3>
                <form onSubmit={handleAddComment} className="space-y-4">
                  <Textarea
                    placeholder="Escribe tu comentario..."
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || !newComment.trim()}
                  >
                    {isSubmitting ? 'Enviando...' : 'Agregar Comentario'}
                  </Button>
                </form>
              </Card>
            )}

            {ticket.status === 'CLOSED' && (
              <Card className="bg-gray-50">
                <p className="text-gray-600 text-center">
                  Este ticket está cerrado. No se pueden agregar más comentarios.
                </p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
