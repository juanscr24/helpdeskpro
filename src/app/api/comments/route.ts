import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { prisma } from '@src/lib/db';
import { sendAgentResponseEmail } from '@src/lib/email';

/**
 * POST /api/comments
 * Crea un nuevo comentario en un ticket
 */
export async function POST(req: NextRequest) {
  try {
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

    // Obtener datos del body
    const body = await req.json();
    const { ticketId, message } = body;

    // Validaciones
    if (!ticketId || !message) {
      return NextResponse.json(
        { error: 'El ID del ticket y el mensaje son requeridos' },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: 'El mensaje no puede estar vacío' },
        { status: 400 }
      );
    }

    // Verificar que el ticket existe
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        createdBy: true,
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket no encontrado' },
        { status: 404 }
      );
    }

    // Si es cliente, verificar que sea el creador del ticket
    if (user.role === 'CLIENT' && ticket.createdById !== user.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para comentar en este ticket' },
        { status: 403 }
      );
    }

    // Crear comentario
    const comment = await prisma.comment.create({
      data: {
        message,
        ticketId,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // Si el autor es un agente, enviar email al cliente
    if (user.role === 'AGENT' && ticket.createdBy.email) {
      const preview = message.length > 100 ? message.substring(0, 100) + '...' : message;
      sendAgentResponseEmail(
        ticket.createdBy.email,
        ticketId,
        user.name,
        preview
      ).catch((err) => console.error('Error al enviar email:', err));
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/comments:', error);
    return NextResponse.json(
      { error: 'Error al crear comentario' },
      { status: 500 }
    );
  }
}
