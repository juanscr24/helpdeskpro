import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  role?: 'client' | 'agent';
  currentPath?: string;
}

export const Sidebar = ({ role = 'client', currentPath = '/' }: SidebarProps) => {
  const isActive = (path: string) => currentPath === path;

  const clientLinks = [
    { href: '/dashboard', label: '📊 Dashboard' },
    { href: '/tickets', label: '🎫 Mis Tickets' },
  ];

  const agentLinks = [
    { href: '/agent-dashboard', label: '📊 Dashboard' },
    { href: '/agent-tickets', label: '🎫 Todos los Tickets' },
    { href: '/agent-tickets/assigned', label: '👤 Mis Asignaciones' },
  ];

  const links = role === 'agent' ? agentLinks : clientLinks;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 pt-6 overflow-y-auto">
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold text-blue-400">HelpDesk</h1>
        <p className="text-xs text-gray-400 mt-2">👤 {role === 'agent' ? 'Agente' : 'Cliente'}</p>
      </div>

      <nav className="space-y-2 px-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-3 rounded-lg transition-colors ${
              isActive(link.href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
