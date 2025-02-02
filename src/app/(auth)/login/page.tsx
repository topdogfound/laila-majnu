'use client';

import { AuthForm } from '@/components/forms/AuthForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import { login } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface loginValue {
    email: string,
    password: string,
}
export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (values: loginValue) => {
        try {
            console.log(values)
            dispatch(login());
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <AuthForm onSubmit={handleLogin} type="login" />
            </CardContent>
            <Link href="/signup" className="p-3 mb-2">Sign Up</Link>
        </Card>
    );
} 