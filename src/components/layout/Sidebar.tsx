'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogoutButton } from '@src/components/auth';
import { User, UserCog, Menu, X } from 'lucide-react';
import { agentLinks, clientLinks } from '@/src/constants/sidebarlink';

interface SidebarProps {
    role?: 'client' | 'agent';
    currentPath?: string;
}

export const Sidebar = ({ role = 'client', currentPath = '/' }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isActive = (path: string) => currentPath === path;

    const links = role === 'agent' ? agentLinks : clientLinks;

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger Button - Solo visible en móvil */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-primary-900 text-white rounded-lg shadow-lg hover:bg-primary-800 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay para móvil */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    w-64 bg-primary-900 text-white h-screen fixed left-0 top-0 pt-6 overflow-y-auto shadow-xl border-r border-primary-800 z-40
                    transition-transform duration-300 ease-in-out
                    lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
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
                        <span className="text-lg">{role === 'agent' ? <UserCog size={20} /> : <User size={20} />}</span>
                        <p className="text-xs text-white/90 font-medium">{role === 'agent' ? 'Agente' : 'Cliente'}</p>
                    </div>
                </div>

                <nav className="px-4 flex flex-col justify-between">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeSidebar}
                            className={`block px-4 py-3 rounded-lg transition-all my-2 ${isActive(link.href)
                                ? 'bg-accent-500 text-white shadow-lg'
                                : 'text-white/80 hover:bg-primary-800 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div onClick={closeSidebar}>
                        <LogoutButton />
                    </div>
                </nav>

                {/* Decorative element at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500"></div>
            </aside>
        </>
    );
};
