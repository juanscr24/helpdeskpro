import React from 'react';
import Link from 'next/link';

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
    <aside className="w-64 bg-gradient-secondary text-white min-h-screen fixed left-0 top-0 pt-6 overflow-y-auto shadow-2xl border-r border-white/10">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">HelpDeskPro</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
          <span className="text-lg">{role === 'agent' ? '👨‍💼' : '👤'}</span>
          <p className="text-xs text-white/90 font-medium">{role === 'agent' ? 'Agente' : 'Cliente'}</p>
        </div>
      </div>

      <nav className="space-y-1 px-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${
              isActive(link.href)
                ? 'bg-gradient-primary text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
    </aside>
  );
};
