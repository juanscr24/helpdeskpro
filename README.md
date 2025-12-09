# 🎫 HelpDeskPro - Sistema de Gestión de Tickets de SoporteThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Sistema completo de gestión de tickets de soporte técnico construido con **Next.js 16**, **Prisma**, **PostgreSQL** y **NextAuth.js**. Permite a clientes crear y dar seguimiento a tickets, mientras que los agentes pueden gestionarlos, asignarlos y responder eficientemente.## Getting Started



---First, run the development server:



## 📋 Tabla de Contenidos```bash

npm run dev

- [Características](#-características)# or

- [Tecnologías](#-tecnologías)yarn dev

- [Requisitos Previos](#-requisitos-previos)# or

- [Instalación](#-instalación)pnpm dev

- [Configuración](#-configuración)# or

- [Uso](#-uso)bun dev

- [Estructura del Proyecto](#-estructura-del-proyecto)```

- [API Endpoints](#-api-endpoints)

- [Datos del Desarrollador](#-datos-del-desarrollador)Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



---You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



## ✨ CaracterísticasThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



### Para Clientes## Learn More

- ✅ Registro e inicio de sesión seguro

- ✅ Dashboard con estadísticas personalesTo learn more about Next.js, take a look at the following resources:

- ✅ Crear tickets con título, descripción y prioridad

- ✅ Ver lista de tickets propios con filtros- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- ✅ Ver detalle completo de cada ticket- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- ✅ Agregar comentarios a los tickets

- ✅ Seguimiento del estado de los ticketsYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



### Para Agentes## Deploy on Vercel

- ✅ Dashboard con estadísticas globales

- ✅ Ver todos los tickets del sistemaThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- ✅ Filtrar por estado, prioridad y agente asignado

- ✅ Editar estado y prioridad de ticketsCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

- ✅ Asignar tickets a agentes
- ✅ Responder a clientes mediante comentarios
- ✅ Cerrar tickets resueltos

### Características Técnicas
- ✅ Autenticación con NextAuth.js
- ✅ Rutas protegidas por rol (CLIENT/AGENT)
- ✅ API RESTful completa
- ✅ Validaciones de negocio
- ✅ Manejo de errores con mensajes claros
- ✅ Sistema de notificaciones con toast
- ✅ Diseño responsivo con Tailwind CSS 4
- ✅ TypeScript para seguridad de tipos
- ✅ Base de datos PostgreSQL con Prisma ORM

---

## 🛠 Tecnologías

- **Frontend**: Next.js 16 (App Router con Turbopack), React 19, TypeScript
- **Estilos**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: NextAuth.js v4
- **Validación**: React Hook Form
- **Notificaciones**: React Hot Toast
- **Deployment**: Vercel (recomendado)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.x o superior
- **npm** o **yarn**
- **PostgreSQL** 14.x o superior
- **Git**

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/juanscr24/helpdeskpro.git
cd helpdeskpro
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/helpdeskpro"

# NextAuth
NEXTAUTH_SECRET="tu-secreto-super-seguro-aqui-cambiar-en-produccion"
NEXTAUTH_URL="http://localhost:3000"

# Email (Opcional - para notificaciones futuras)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="tu-email@gmail.com"
EMAIL_SERVER_PASSWORD="tu-contraseña-de-app"
EMAIL_FROM="noreply@helpdeskpro.com"
```

### 4. Configurar la Base de Datos

```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# (Opcional) Sembrar datos de prueba
npx prisma db seed
```

### 5. Iniciar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## ⚙️ Configuración

### Crear Usuario Administrador (Agente)

Puedes crear un usuario agente directamente desde la base de datos o mediante Prisma Studio:

```bash
# Abre Prisma Studio
npx prisma studio
```

En Prisma Studio:
1. Ve a la tabla `User`
2. Crea un nuevo usuario con:
   - `name`: Nombre del agente
   - `email`: agente@helpdeskpro.com
   - `password`: (hash de bcrypt - usa bcrypt online para generar)
   - `role`: **AGENT**

O usa este script para hashear contraseña con Node.js:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password123', 10));"
```

### Crear Usuario Cliente

Los clientes pueden registrarse directamente desde la página de registro en `/register`.

---

## 💻 Uso

### Flujo Cliente

1. **Registro**: Ir a `/register` y crear una cuenta
2. **Login**: Iniciar sesión en `/login`
3. **Dashboard**: Ver resumen de tickets en `/client/dashboard`
4. **Crear Ticket**: Hacer clic en "Crear Nuevo Ticket"
5. **Ver Tickets**: Navegar a "Mis Tickets" para ver todos
6. **Detalle**: Hacer clic en un ticket para ver detalle y comentarios
7. **Comentar**: Agregar comentarios para dar seguimiento

### Flujo Agente

1. **Login**: Iniciar sesión con cuenta de agente en `/login`
2. **Dashboard**: Ver estadísticas globales en `/agent/dashboard`
3. **Ver Tickets**: Navegar a "Todos los Tickets"
4. **Filtrar**: Usar filtros por estado, prioridad, agente
5. **Gestionar**: Hacer clic en un ticket para editarlo
6. **Actualizar**: Cambiar estado, prioridad, asignar agente
7. **Responder**: Agregar comentarios que el cliente verá
8. **Cerrar**: Marcar como CLOSED cuando esté resuelto

---

## 📁 Estructura del Proyecto

```
helpdeskpro/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── public/                     # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── (auth)/            # Rutas de autenticación
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── agent/             # Rutas de agentes
│   │   │   ├── dashboard/
│   │   │   └── tickets/
│   │   ├── client/            # Rutas de clientes
│   │   │   ├── dashboard/
│   │   │   └── tickets/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/
│   │   │   ├── tickets/
│   │   │   ├── comments/
│   │   │   └── agents/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/            # Header, Sidebar
│   │   ├── tickets/           # Componentes de tickets
│   │   ├── ui/                # Componentes reutilizables
│   │   ├── Providers.tsx
│   │   └── TicketCard.tsx
│   ├── context/
│   │   └── AuthContext.tsx    # Contexto de autenticación
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useLogin.tsx
│   │   └── useRegister.tsx
│   ├── lib/
│   │   ├── db.ts              # Cliente de Prisma
│   │   └── email.ts           # Funciones de email
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── ticketService.ts
│   │   ├── commentService.ts
│   │   └── agentService.ts
│   ├── types/                 # Tipos de TypeScript
│   └── middleware.ts          # Middleware de rutas
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/[...nextauth]` - Login con NextAuth
- `GET /api/auth/me` - Obtener usuario actual

### Tickets
- `GET /api/tickets` - Listar tickets (con filtros)
- `POST /api/tickets` - Crear ticket (solo clientes)
- `GET /api/tickets/[id]` - Obtener ticket por ID
- `PATCH /api/tickets/[id]` - Actualizar ticket (solo agentes)
- `DELETE /api/tickets/[id]` - Eliminar ticket
- `PUT /api/tickets/[id]/assign` - Asignar ticket a agente

### Comentarios
- `GET /api/comments/[ticketId]` - Listar comentarios de un ticket
- `POST /api/comments` - Crear comentario

### Agentes
- `GET /api/agents` - Listar todos los agentes

---

## 📝 Criterios de Aceptación Cumplidos

✅ **4.1) Gestión de Tickets**
- Registro de tickets con datos obligatorios
- Edición de estado, prioridad y agente asignado
- Cierre de tickets
- Listado y filtrado por usuario, estado y prioridad

✅ **4.2) Gestión de Usuarios, Roles y Autenticación**
- Login funcional con NextAuth.js
- Redirección según rol (CLIENT/AGENT)
- Rutas protegidas con middleware
- Estado de sesión centralizado con Context API

✅ **4.3) Comentarios y UI Reutilizable**
- Hilo de comentarios en cada ticket
- Permisos según rol para comentar
- Cards con Badges y Buttons
- Props tipadas y variantes en componentes

✅ **4.4) API, Servicios y Dashboard**
- API completa (GET/POST/PUT/DELETE)
- Servicios Axios consumiendo la API
- Dashboard con listado, creación y gestión de tickets
- Sin errores en ejecución

✅ **4.5) Notificaciones por Correo** *(Estructura preparada para implementación futura)*
- Funciones de email definidas en `lib/email.ts`
- Ready para integración con servicio SMTP

✅ **4.6) Manejo de Errores y Validaciones**
- Mensajes claros con toast notifications
- Validaciones de negocio implementadas
- Try/catch en todas las peticiones
- Estados de error y loading

✅ **4.7) Documentación**
- README completo con toda la información
- Requisitos previos
- Pasos de instalación
- Variables de entorno
- Datos del Coder

---

## 👨‍💻 Datos del Desarrollador

**Nombre**: Juan Sebastian Cardona Rodriguez  
**Clan**: Cohorte 3  
**Correo**: jscardonar@gmail.com  
**Documento de Identidad**: 1001449506  
**GitHub**: [@juanscr24](https://github.com/juanscr24)  
**LinkedIn**: [Juan Cardona](https://www.linkedin.com/in/juan-sebastian-cardona-rodriguez-763636173/)

---

## 🚀 Deploy

### Deploy en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push

### Variables de Entorno en Vercel

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://tu-dominio.vercel.app
```

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de un ejercicio académico para Cohorte 3.

---

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor contacta a:
- **Email**: jscardonar@gmail.com
- **GitHub Issues**: [Crear Issue](https://github.com/juanscr24/helpdeskpro/issues)

---

**Desarrollado con ❤️ por Juan Sebastian Cardona Rodriguez - Cohorte 3**
