import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { prisma } from '@src/lib/db';
import { sendTicketClosedEmail } from '@src/lib/email';

/**
 * GET /api/tickets/[id]
 * Obtiene un ticket por ID
 */
export async function GET(
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

    // Buscar ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id },
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket no encontrado' },
        { status: 404 }
      );
    }

    // Validar acceso: clientes solo pueden ver sus propios tickets
    if (user.role === 'CLIENT' && ticket.createdById !== user.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para ver este ticket' },
        { status: 403 }
      );
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error en GET /api/tickets/[id]:', error);
    return NextResponse.json(
      { error: 'Error al obtener ticket' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/tickets/[id]
 * Actualiza un ticket (solo agentes)
 */
export async function PATCH(
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
        { error: 'Solo los agentes pueden actualizar tickets' },
        { status: 403 }
      );
    }

    // Buscar ticket actual
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        createdBy: true,
      },
    });

    if (!existingTicket) {
      return NextResponse.json(
        { error: 'Ticket no encontrado' },
        { status: 404 }
      );
    }

    // Obtener datos del body
    const body = await req.json();
    const { status, priority, assignedToId, title, description } = body;

    // Validar campos si se proporcionan
    if (status && !['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      );
    }

    if (priority && !['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
      return NextResponse.json(
        { error: 'Prioridad inválida' },
        { status: 400 }
      );
    }

    if (title && title.trim().length === 0) {
      return NextResponse.json(
        { error: 'El título no puede estar vacío' },
        { status: 400 }
      );
    }

    if (description && description.trim().length === 0) {
      return NextResponse.json(
        { error: 'La descripción no puede estar vacía' },
        { status: 400 }
      );
    }

    // Actualizar ticket
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assignedToId !== undefined && { assignedToId: assignedToId || null }),
        ...(title && { title: title.trim() }),
        ...(description && { description: description.trim() }),
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

    // Si el ticket se cerró, enviar email
    if (status === 'CLOSED' && existingTicket.status !== 'CLOSED') {
      sendTicketClosedEmail(
        existingTicket.createdBy.email,
        ticket.id,
        ticket.title
      ).catch((err) => console.error('Error al enviar email:', err));
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error en PATCH /api/tickets/[id]:', error);
    return NextResponse.json(
      { error: 'Error al actualizar ticket' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tickets/[id]
 * Elimina un ticket
 */
export async function DELETE(
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

    // Buscar ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket no encontrado' },
        { status: 404 }
      );
    }

    // Validar permisos: solo agentes o el creador pueden eliminar
    if (user.role !== 'AGENT' && ticket.createdById !== user.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para eliminar este ticket' },
        { status: 403 }
      );
    }

    // Eliminar ticket (cascade eliminará comments)
    await prisma.ticket.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en DELETE /api/tickets/[id]:', error);
    return NextResponse.json(
      { error: 'Error al eliminar ticket' },
      { status: 500 }
    );
  }
}
