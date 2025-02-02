'use client';

import { AuthForm } from '@/components/forms/AuthForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface SignupValues {
    email: string;
    password: string;
}

export default function SignupPage() {
    const handleSignup = async (values: SignupValues) => {
        try {
            console.log('Signup values:', values);
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <AuthForm onSubmit={handleSignup} type="signup" />
            </CardContent>
            <Link href="/login" className="p-3 mb-2">Already have an account? Login</Link>
        </Card>
    );
} 