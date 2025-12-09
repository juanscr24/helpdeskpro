import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { prisma } from '@src/lib/db';
import { sendTicketAssignedEmail } from '@src/lib/email';

/**
 * PUT /api/tickets/[id]/assign
 * Asigna un ticket a un agente
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Validar que sea agente
    if (user.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Solo los agentes pueden asignar tickets' },
        { status: 403 }
      );
    }

    // Obtener agentId del body
    const body = await req.json();
    const { agentId } = body;

    if (!agentId) {
      return NextResponse.json(
        { error: 'El ID del agente es requerido' },
        { status: 400 }
      );
    }

    // Verificar que el agente existe y tiene rol AGENT
    const agent = await prisma.user.findUnique({
      where: { id: agentId },
    });

    if (!agent || agent.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Agente no válido' },
        { status: 400 }
      );
    }

    // Buscar ticket
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!existingTicket) {
      return NextResponse.json(
        { error: 'Ticket no encontrado' },
        { status: 404 }
      );
    }

    // Asignar ticket
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        assignedToId: agentId,
        // Cambiar estado a IN_PROGRESS si estaba OPEN
        ...(existingTicket.status === 'OPEN' && { status: 'IN_PROGRESS' }),
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Enviar email al agente asignado
    sendTicketAssignedEmail(
      agent.email,
      ticket.id,
      ticket.title,
      ticket.priority
    ).catch((err) => console.error('Error al enviar email:', err));

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error en PUT /api/tickets/[id]/assign:', error);
    return NextResponse.json(
      { error: 'Error al asignar ticket' },
      { status: 500 }
    );
  }
}
