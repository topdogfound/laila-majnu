'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider store={store}>{children}</Provider>
        </ThemeProvider>
    );
} 