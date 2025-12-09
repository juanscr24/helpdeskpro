import React from 'react';
import Link from 'next/link';
import { LogOut } from '../LogOut';

interface SidebarProps {
  role?: 'client' | 'agent';
  currentPath?: string;
}

export const Sidebar = ({ role = 'client', currentPath = '/' }: SidebarProps) => {
  const isActive = (path: string) => currentPath === path;

  const clientLinks = [
    { href: '/client/dashboard', label: '📊 Dashboard' },
    { href: '/client/tickets', label: '🎫 Mis Tickets' },
    { href: '/client/tickets/new', label: '➕ Crear Ticket' },
  ];

  const agentLinks = [
    { href: '/agent/dashboard', label: '📊 Dashboard' },
    { href: '/agent/tickets', label: '🎫 Todos los Tickets' },
  ];

  const links = role === 'agent' ? agentLinks : clientLinks;

  return (
    <aside className="w-64 bg-primary-900 text-white min-h-screen fixed left-0 top-0 pt-6 overflow-y-auto shadow-xl border-r border-primary-800">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary-800 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">HelpDeskPro</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-primary-800 rounded-lg">
          <span className="text-lg">{role === 'agent' ? '👨‍💼' : '👤'}</span>
          <p className="text-xs text-white/90 font-medium">{role === 'agent' ? 'Agente' : 'Cliente'}</p>
        </div>
      </div>

      <nav className="px-4 flex flex-col justify-between">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-3 rounded-lg transition-all ${
              isActive(link.href)
                ? 'bg-accent-500 text-white shadow-lg'
                : 'text-white/80 hover:bg-primary-800 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <LogOut />
      </nav>

      {/* Decorative element at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500"></div>
    </aside>
  );
};
