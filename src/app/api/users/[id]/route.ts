import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { prisma } from '@src/lib/db';
import bcrypt from 'bcrypt';

/**
 * GET /api/users/[id]
 * Obtiene un usuario por ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Buscar usuario autenticado
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Validar que sea agente
    if (currentUser.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Solo los agentes pueden ver detalles de usuarios' },
        { status: 403 }
      );
    }

    // Buscar usuario solicitado
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            ticketsCreated: true,
            ticketsAssigned: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error en GET /api/users/[id]:', error);
    return NextResponse.json({ error: 'Error al obtener usuario' }, { status: 500 });
  }
}

/**
 * PUT /api/users/[id]
 * Actualiza un usuario completo
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Buscar usuario autenticado
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Validar que sea agente
    if (currentUser.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Solo los agentes pueden actualizar usuarios' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, role } = body;

    // Validar que el usuario existe
    const userToUpdate = await prisma.user.findUnique({
      where: { id },
    });

    if (!userToUpdate) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Validar rol si se proporciona
    if (role && !['CLIENT', 'AGENT'].includes(role)) {
      return NextResponse.json({ error: 'Rol inválido' }, { status: 400 });
    }

    // Validar email único si cambió
    if (email && email !== userToUpdate.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json({ error: 'El email ya está en uso' }, { status: 400 });
      }
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(email && { email: email.trim() }),
        ...(role && { role }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error en PUT /api/users/[id]:', error);
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
  }
}

/**
 * DELETE /api/users/[id]
 * Elimina un usuario
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Buscar usuario autenticado
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Validar que sea agente
    if (currentUser.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Solo los agentes pueden eliminar usuarios' },
        { status: 403 }
      );
    }

    // No permitir auto-eliminación
    if (currentUser.id === id) {
      return NextResponse.json(
        { error: 'No puedes eliminar tu propia cuenta' },
        { status: 400 }
      );
    }

    // Buscar usuario a eliminar
    const userToDelete = await prisma.user.findUnique({
      where: { id },
    });

    if (!userToDelete) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Eliminar usuario (cascade eliminará tickets y comments)
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en DELETE /api/users/[id]:', error);
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}

/**
 * PATCH /api/users/[id]
 * Actualiza campos específicos del usuario (como el rol)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Buscar usuario autenticado
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Validar que sea agente
    if (currentUser.role !== 'AGENT') {
      return NextResponse.json(
        { error: 'Solo los agentes pueden actualizar usuarios' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { role } = body;

    // Validar rol
    if (!role || !['CLIENT', 'AGENT'].includes(role)) {
      return NextResponse.json({ error: 'Rol inválido' }, { status: 400 });
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error en PATCH /api/users/[id]:', error);
    return NextResponse.json({ error: 'Error al actualizar rol' }, { status: 500 });
  }
}
