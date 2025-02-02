'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/store/features/authSlice';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    return <>{children}</>;
} 