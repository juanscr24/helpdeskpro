import { PrismaClient } from '@src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAgentUser() {
  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash('agent123', 10);

    // Crear usuario AGENT
    const agent = await prisma.user.create({
      data: {
        name: 'Agent Support',
        email: 'agent@helpdeskpro.com',
        password: hashedPassword,
        role: 'AGENT',
      },
    });

    console.log('✅ Usuario AGENT creado exitosamente:');
    console.log({
      id: agent.id,
      name: agent.name,
      email: agent.email,
      role: agent.role,
    });
    console.log('\n📧 Email: agent@helpdeskpro.com');
    console.log('🔑 Contraseña: agent123');
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('⚠️  El usuario con ese email ya existe');
      
      // Buscar el usuario existente
      const existingAgent = await prisma.user.findUnique({
        where: { email: 'agent@helpdeskpro.com' },
      });
      
      if (existingAgent) {
        console.log('✅ Usuario AGENT encontrado:');
        console.log({
          id: existingAgent.id,
          name: existingAgent.name,
          email: existingAgent.email,
          role: existingAgent.role,
        });
        console.log('\n📧 Email: agent@helpdeskpro.com');
        console.log('🔑 Contraseña: agent123 (si no fue cambiada)');
      }
    } else {
      console.error('❌ Error al crear usuario:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAgentUser();
