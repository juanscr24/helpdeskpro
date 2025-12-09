import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { prisma } from '@src/lib/db';

/**
 * GET /api/agents
 * Obtiene la lista de todos los agentes
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

    // Obtener todos los usuarios con rol AGENT
    const agents = await prisma.user.findMany({
      where: {
        role: 'AGENT',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error en GET /api/agents:', error);
    return NextResponse.json(
      { error: 'Error al obtener agentes' },
      { status: 500 }
    );
  }
}
