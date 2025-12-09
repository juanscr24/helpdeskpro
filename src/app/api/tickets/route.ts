import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { prisma } from '@src/lib/db';
import { sendTicketCreatedEmail } from '@src/lib/email';

/**
 * GET /api/tickets
 * Obtiene todos los tickets con filtros opcionales
 * - Clientes: solo sus tickets
 * - Agentes: todos los tickets
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

    // Obtener parámetros de búsqueda
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedToId = searchParams.get('assignedToId');
    const search = searchParams.get('search');

    // Construir filtros
    const where: any = {};

    // Si es cliente, solo ver sus tickets
    if (user.role === 'CLIENT') {
      where.createdById = user.id;
    }

    // Aplicar filtros adicionales
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedToId) where.assignedToId = assignedToId;
    
    // Búsqueda por texto en título o descripción
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Obtener tickets
    const tickets = await prisma.ticket.findMany({
      where,
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
    console.error('Error en GET /api/tickets:', error);
    return NextResponse.json(
      { error: 'Error al obtener tickets' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tickets
 * Crea un nuevo ticket (solo para clientes)
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

    // Validar que sea cliente
    if (user.role !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Solo los clientes pueden crear tickets' },
        { status: 403 }
      );
    }

    // Obtener datos del body
    const body = await req.json();
    const { title, description, priority } = body;

    // Validaciones
    if (!title || !description) {
      return NextResponse.json(
        { error: 'El título y la descripción son requeridos' },
        { status: 400 }
      );
    }

    if (!['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
      return NextResponse.json(
        { error: 'Prioridad inválida' },
        { status: 400 }
      );
    }

    // Crear ticket
    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority,
        status: 'OPEN',
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
      },
    });

    // Enviar email de confirmación (asíncrono, no bloqueante)
    sendTicketCreatedEmail(user.email, ticket.id, ticket.title).catch((err) =>
      console.error('Error al enviar email:', err)
    );

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/tickets:', error);
    return NextResponse.json(
      { error: 'Error al crear ticket' },
      { status: 500 }
    );
  }
}
