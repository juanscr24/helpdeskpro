'use client'

import { signOut } from "next-auth/react";
import { Button } from "@src/components/ui/Button";
import { LogOut as LogoOut } from 'lucide-react';

export const LogOut = () => {
    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: '/login'
        });
    };

    return (
        <Button
            onClick={handleLogout}
            variant="secondary"
            className='fixed bottom-8'>
            Log Out<LogoOut />
        </Button>
    )
}

