import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { prisma } from '@src/lib/db';

/**
 * GET /api/tickets/my
 * Obtiene solo los tickets del usuario autenticado
 */
export async function GET(req: NextRequest) {
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

    // Obtener solo tickets creados por el usuario
    const tickets = await prisma.ticket.findMany({
      where: {
        createdById: user.id,
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error en GET /api/tickets/my:', error);
    return NextResponse.json(
      { error: 'Error al obtener tus tickets' },
      { status: 500 }
    );
  }
}
