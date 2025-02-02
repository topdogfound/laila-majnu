import { ThemeToggle } from '@/components/theme/ThemeToggle';
import Link from 'next/link';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <nav className=" shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/home" className="flex items-center">
                                <span className="text-xl font-bold">Top Dog</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <ThemeToggle />
                            <Link
                                href="/login"
                                className=" hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
} 