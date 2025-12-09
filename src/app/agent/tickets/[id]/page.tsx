'use client';

import { use, useState, useEffect } from 'react';
import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { Card } from '@src/components/ui/Card';
import { Badge } from '@src/components/ui/Badge';
import { Button } from '@src/components/ui/Button';
import { Select } from '@src/components/ui/Select';
import { Textarea } from '@src/components/ui/Textarea';
import { useRouter } from 'next/navigation';
import { useAuth } from '@src/hooks/useAuth';
import { getTicketById, updateTicket, Ticket } from '@src/services/ticketService';
import { getCommentsByTicket, createComment, Comment } from '@src/services/commentService';
import { getAgents, Agent } from '@src/services/agentService';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: 'OPEN', label: 'Abierto' },
  { value: 'IN_PROGRESS', label: 'En Progreso' },
  { value: 'RESOLVED', label: 'Resuelto' },
  { value: 'CLOSED', label: 'Cerrado' },
];

const priorityOptions = [
  { value: 'LOW', label: 'Baja' },
  { value: 'MEDIUM', label: 'Media' },
  { value: 'HIGH', label: 'Alta' },
];

export default function AgentTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Estados de edición
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');

  useEffect(() => {
    if (!authLoading && user) {
      loadData();
    }
  }, [authLoading, user, id]);

  useEffect(() => {
    if (ticket) {
      setEditStatus(ticket.status);
      setEditPriority(ticket.priority);
      setEditAssignedTo(ticket.assignedTo?.id || '');
    }
  }, [ticket]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ticketData, commentsData, agentsData] = await Promise.all([
        getTicketById(id),
        getCommentsByTicket(id),
        getAgents(),
      ]);
      setTicket(ticketData);
      setComments(commentsData);
      setAgents(agentsData);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar el ticket');
      router.push('/agent/tickets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTicket = async () => {
    if (!ticket) return;

    try {
      setIsUpdating(true);
      const updatedTicket = await updateTicket(ticket.id, {
        status: editStatus as any,
        priority: editPriority as any,
        assignedToId: editAssignedTo || undefined,
      });
      setTicket(updatedTicket);
      toast.success('Ticket actualizado exitosamente');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar ticket');
    } finally {
      setIsUpdating(false);
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
      toast.success('Respuesta enviada al cliente');
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

  const agentOptions = [
    { value: '', label: 'Sin asignar' },
    ...agents.map(agent => ({
      value: agent.id,
      label: agent.name,
    })),
  ];

  const hasChanges = 
    editStatus !== ticket.status ||
    editPriority !== ticket.priority ||
    editAssignedTo !== (ticket.assignedTo?.id || '');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="agent" currentPath="/agent/tickets" />

      <div className="flex-1 ml-64">
        <Header userName={user?.name || 'Agente'} userEmail={user?.email || ''} />

        <main className="p-8 max-w-6xl">
          {/* Back Button */}
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
            ← Volver a tickets
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Ticket Detail Card */}
              <Card>
                <div className="space-y-6">
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

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Cliente:</span>
                      <p className="font-semibold text-gray-900">{ticket.createdBy.name}</p>
                      <p className="text-gray-600 text-xs">{ticket.createdBy.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Creado:</span>
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
                  </div>
                </div>
              </Card>

              {/* Comments Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Historial de Comentarios ({comments.length})
                </h2>

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
                        No hay comentarios aún. ¡Sé el primero en responder!
                      </p>
                    </Card>
                  )}
                </div>

                {/* Add Comment Form */}
                {ticket.status !== 'CLOSED' && (
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Responder al Cliente
                    </h3>
                    <form onSubmit={handleAddComment} className="space-y-4">
                      <Textarea
                        placeholder="Escribe tu respuesta al cliente..."
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
                        {isSubmitting ? 'Enviando...' : 'Enviar Respuesta'}
                      </Button>
                    </form>
                  </Card>
                )}
              </div>
            </div>

            {/* Sidebar - 1/3 */}
            <div className="space-y-6">
              {/* Edit Card */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Gestionar Ticket
                </h3>
                <div className="space-y-4">
                  <Select
                    label="Estado"
                    options={statusOptions}
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  />

                  <Select
                    label="Prioridad"
                    options={priorityOptions}
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  />

                  <Select
                    label="Asignar a"
                    options={agentOptions}
                    value={editAssignedTo}
                    onChange={(e) => setEditAssignedTo(e.target.value)}
                  />

                  {hasChanges && (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={handleUpdateTicket}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                  )}
                </div>
              </Card>

              {/* Info Card */}
              <Card className="bg-purple-50">
                <h4 className="font-semibold text-purple-900 mb-2">💡 Recordatorios</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Responde a los clientes con claridad</li>
                  <li>• Actualiza el estado del ticket</li>
                  <li>• Asigna prioridad adecuadamente</li>
                  <li>• Cierra el ticket cuando esté resuelto</li>
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
