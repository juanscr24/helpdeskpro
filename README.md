## 👨‍💻 Developer Information

**Name**: Juan Cardona   
**LinkedIn**: [Juan Cardona](https://www.linkedin.com/in/juanscr24/)

---

# 🎫 HelpDeskPro - Support Ticket Management System

Complete technical support ticket management system built with **Next.js 16**, **Prisma**, **PostgreSQL**, and **NextAuth.js**. Allows clients to create and track tickets, while agents can manage, assign, and respond efficiently.

---

## Getting Started

First, run the development server:



```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



---You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Developer Information](#-developer-information)

---

## ✨ Features

### For Clients
- ✅ Secure registration and login
- ✅ Dashboard with personal statistics
- ✅ Create tickets with title, description, and priority
- ✅ View list of own tickets with filters
- ✅ View complete detail of each ticket
- ✅ Add comments to tickets
- ✅ Track ticket status

### For Agents
- ✅ Dashboard with global statistics
- ✅ View all system tickets
- ✅ Filter by status, priority, and assigned agent
- ✅ Edit ticket status and priority
- ✅ Assign tickets to agents
- ✅ Respond to clients via comments
- ✅ Close resolved tickets
- ✅ Edit ticket title and description
- ✅ Delete tickets
- ✅ User management (view, edit, delete, change roles)

### Technical Features
- ✅ Authentication with NextAuth.js
- ✅ Role-protected routes (CLIENT/AGENT)
- ✅ Complete RESTful API
- ✅ Business validations
- ✅ Error handling with clear messages
- ✅ Toast notification system
- ✅ Responsive design with Tailwind CSS 4
- ✅ TypeScript for type safety
- ✅ PostgreSQL database with Prisma ORM
- ✅ Cascade deletes configured

---

## 🛠 Technologies

- **Frontend**: Next.js 16 (App Router with Turbopack), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js v4
- **Validation**: React Hook Form
- **Notifications**: React Hot Toast
- **Deployment**: Vercel (recommended)

---

## 📦 Prerequisites

Before starting, make sure you have installed:

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **PostgreSQL** 14.x or higher
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/juanscr24/helpdeskpro.git
cd helpdeskpro
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/helpdeskpro"

# NextAuth
NEXTAUTH_SECRET="your-super-secure-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Email (Optional - for future notifications)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@helpdeskpro.com"
```

### 4. Set Up the Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed test data
npx prisma db seed
```

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

---

## ⚙️ Configuration

### Create Admin User (Agent)

You can create an agent user directly from the database or via Prisma Studio:

```bash
# Open Prisma Studio
npx prisma studio
```

In Prisma Studio:
1. Go to the `User` table
2. Create a new user with:
   - `name`: Agent name
   - `email`: agent@helpdeskpro.com
   - `password`: (bcrypt hash - use online bcrypt to generate)
   - `role`: **AGENT**

Or use this script to hash password with Node.js:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password123', 10));"
```

### Create Client User

Clients can register directly from the registration page at `/register`.

---

## 💻 Usage

### Client Flow

1. **Register**: Go to `/register` and create an account
2. **Login**: Sign in at `/login`
3. **Dashboard**: View ticket summary at `/client/dashboard`
4. **Create Ticket**: Click on "Create New Ticket"
5. **View Tickets**: Navigate to "My Tickets" to see all
6. **Detail**: Click on a ticket to view details and comments
7. **Comment**: Add comments to follow up

### Agent Flow

1. **Login**: Sign in with agent account at `/login`
2. **Dashboard**: View global statistics at `/agent/dashboard`
3. **View Tickets**: Navigate to "All Tickets"
4. **Filter**: Use filters by status, priority, agent
5. **Manage**: Click on a ticket to edit it
6. **Update**: Change status, priority, assign agent
7. **Respond**: Add comments that the client will see
8. **Close**: Mark as CLOSED when resolved
9. **Edit**: Edit ticket title and description
10. **Delete**: Delete tickets with confirmation
11. **User Management**: Manage users, change roles, delete users

---

## 📁 Project Structure

```
helpdeskpro/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                     # Static files
├── src/
│   ├── app/
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── agent/             # Agent routes
│   │   │   ├── dashboard/
│   │   │   ├── tickets/
│   │   │   └── users/
│   │   ├── client/            # Client routes
│   │   │   ├── dashboard/
│   │   │   └── tickets/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/
│   │   │   ├── tickets/
│   │   │   ├── comments/
│   │   │   ├── agents/
│   │   │   └── users/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── auth/              # Login, Register, Logout
│   │   ├── common/            # Providers
│   │   ├── landing/           # Landing page sections
│   │   ├── layout/            # Header, Sidebar
│   │   ├── tickets/           # Ticket components
│   │   └── ui/                # Reusable components
│   ├── constants/
│   │   └── landingContent.ts  # Landing page content
│   ├── context/
│   │   └── AuthContext.tsx    # Authentication context
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useLogin.tsx
│   │   └── useRegister.tsx
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   └── email.ts           # Email functions
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── ticketService.ts
│   │   ├── commentService.ts
│   │   ├── agentService.ts
│   │   └── userService.ts
│   ├── types/                 # TypeScript types
│   │   ├── auth.ts
│   │   ├── ticket.ts
│   │   ├── components.ts
│   │   └── index.ts
│   └── middleware.ts          # Route middleware
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

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - Login with NextAuth
- `GET /api/auth/me` - Get current user

### Tickets
- `GET /api/tickets` - List tickets (with filters)
- `POST /api/tickets` - Create ticket (clients only)
- `GET /api/tickets/[id]` - Get ticket by ID
- `PATCH /api/tickets/[id]` - Update ticket (agents only)
- `DELETE /api/tickets/[id]` - Delete ticket
- `PUT /api/tickets/[id]/assign` - Assign ticket to agent

### Comments
- `GET /api/comments/[ticketId]` - List comments for a ticket
- `POST /api/comments` - Create comment

### Agents
- `GET /api/agents` - List all agents

### Users
- `GET /api/users` - List all users (agents only)
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user
- `PATCH /api/users/[id]` - Change user role

---

## 📝 Acceptance Criteria Met

✅ **4.1) Ticket Management**
- Ticket registration with required data
- Edit status, priority, and assigned agent
- Close tickets
- List and filter by user, status, and priority
- Edit ticket title and description
- Delete tickets with cascade

✅ **4.2) User Management, Roles and Authentication**
- Functional login with NextAuth.js
- Redirect based on role (CLIENT/AGENT)
- Protected routes with middleware
- Centralized session state with Context API
- User management interface for agents
- Change user roles
- Delete users

✅ **4.3) Comments and Reusable UI**
- Comment thread on each ticket
- Role-based permissions for commenting
- Cards with Badges and Buttons
- Typed props and variants in components

✅ **4.4) API, Services and Dashboard**
- Complete API (GET/POST/PUT/DELETE/PATCH)
- Axios services consuming the API
- Dashboard with listing, creation and ticket management
- No execution errors

✅ **4.5) Email Notifications** *(Structure prepared for future implementation)*
- Email functions defined in `lib/email.ts`
- Ready for SMTP service integration

✅ **4.6) Error Handling and Validations**
- Clear messages with toast notifications
- Business validations implemented
- Try/catch in all requests
- Error and loading states

✅ **4.7) Documentation**
- Complete README with all information
- Prerequisites
- Installation steps
- Environment variables
- Developer data

---

## 🚀 Deployment

### Deploy on Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel
3. Automatic deployment on each push

### Environment Variables on Vercel

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.vercel.app
```

---
