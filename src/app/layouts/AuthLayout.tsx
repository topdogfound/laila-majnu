'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface AuthState {
    isAuthenticated: boolean;
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = useSelector((state: RootState & { auth: AuthState }) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        redirect('/dashboard');
    }

    return (
        <div className="w-full h-full relative">
            <nav className=" shadow-sm top-0 absolute w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/home" className="flex items-center">
                                <span className="text-xl font-bold">Top Dog</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="max-w-md w-full space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
