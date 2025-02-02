'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { RootState } from '@/store/store';

interface authState {
    isAuthenticated: boolean;
}
export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = useSelector((state: RootState & { auth: authState }) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        redirect('/');
    }

    return (
        <div className="min-h-screen ">
            <nav className=" shadow-sm">
                {/* Add navigation here */}
            </nav>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
} 