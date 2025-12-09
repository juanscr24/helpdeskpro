import React from 'react';
import { Button } from '@src/components/ui/Button';
import { LogOut } from '../LogOut';

interface HeaderProps {
    userName?: string;
    userEmail?: string;
}

export const Header = ({
    userName = 'Usuario',
    userEmail = 'usuario@example.com',
}: HeaderProps) => {
    return (
        <header className="bg-gradient-secondary border-b border-white/10 sticky top-0 z-40 shadow-lg backdrop-blur-sm">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        HelpDeskPro
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">{userName}</p>
                        <p className="text-xs text-white/70">{userEmail}</p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center ring-2 ring-white/30">
                        <span className="text-white font-semibold text-sm">
                            {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                    </div>
                    <LogOut />
                </div>
            </div>
        </header>
    );
};
