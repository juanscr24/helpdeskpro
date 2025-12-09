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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-blue-600">HelpDeskPro</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">JC</span>
                    </div>
                    <LogOut />
                </div>
            </div>
        </header>
    );
};
