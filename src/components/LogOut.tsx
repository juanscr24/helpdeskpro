'use client'

import { signOut } from "next-auth/react";

export const LogOut = () => {
    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: '/login'
        });
    };

    return (
        <button
            onClick={handleLogout}
            className='bg-white text-black px-4 py-2 cursor-pointer rounded-md'>
            LogOut
        </button>
    )
}

