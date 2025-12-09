// Ticket Types
export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Role {
  CLIENT = 'CLIENT',
  AGENT = 'AGENT',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: User | { id: string; name: string; email: string };
  createdById?: string;
  assignedTo?: (User | { id: string; name: string; email: string }) | null;
  assignedToId?: string | null;
  _count?: {
    comments: number;
  };
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: User;
  userId: string;
  ticket: Ticket;
  ticketId: string;
}

// API Response Types
export interface TicketResponse {
  ticket: Ticket;
}

export interface TicketsResponse {
  tickets: Ticket[];
}

export interface CommentResponse {
  comment: Comment;
}

export interface CommentsResponse {
  comments: Comment[];
}

// Form Types
export interface CreateTicketData {
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface UpdateTicketData {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedToId?: string | null;
}

export interface UpdateTicketFullData extends UpdateTicketData {
  title?: string;
  description?: string;
}

export interface CreateCommentData {
  content: string;
  ticketId: string;
}

// Config Types
export interface StatusConfig {
  label: string;
  variant: 'open' | 'in_progress' | 'resolved' | 'closed';
}

export interface PriorityConfig {
  label: string;
  variant: 'low' | 'medium' | 'high';
}
