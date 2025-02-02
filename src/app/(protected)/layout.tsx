import ProtectedLayout from '../layouts/ProtectedLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ProtectedLayout>{children}</ProtectedLayout>;
} 