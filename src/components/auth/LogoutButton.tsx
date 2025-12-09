'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@src/components/ui/Button';
import { LogOut as LogOutIcon } from 'lucide-react';

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  return (
    <Button onClick={handleLogout} variant="secondary" className="fixed bottom-8">
      Cerrar Sesión
      <LogOutIcon className="w-4 h-4" />
    </Button>
  );
};
