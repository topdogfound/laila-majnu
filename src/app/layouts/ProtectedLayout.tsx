'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import React from 'react';

interface AuthState {
    isAuthenticated: boolean;
    userEmail: string | null;
}

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated, userEmail } = useSelector((state: RootState & { auth: AuthState }) => state.auth);

    React.useEffect(() => {
        if (!isAuthenticated || !userEmail) {
            router.push('/');
        }
    }, [isAuthenticated, userEmail, router]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    if (!isAuthenticated || !userEmail) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <nav className="shadow-sm">
                <div className="flex justify-between items-center p-4">
                    <span>{userEmail}</span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
} 