import { Suspense } from 'react';
import Providers from '@/components/Providers';
import '@/app/globals.css';
import RProgressBar from '@/components/RComponents/RProgressBar/RProgressBar';
import GuestGuard from '@/guards/GuestGuard';
import RLoader from '@/components/RComponents/RLoader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login - Event Management Platform',
    icons: {
        icon: [
            { url: '/next-js.svg', sizes: 'any' },
            { url: '/next-js.svg', sizes: '32x32', type: 'image/png' },
            { url: '/next-js.svg', sizes: '16x16', type: 'image/png' },
        ],
        apple: [{ url: '/next-js.svg' }],
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="ltr">
            <body className={`min-h-screen flex flex-col`}>
                <Providers>
                    <RProgressBar />
                    <GuestGuard>
                        <Suspense fallback={<RLoader />}>
                            <main className="flex items-center justify-center h-[100vh]">
                                {children}
                            </main>
                        </Suspense>
                    </GuestGuard>
                </Providers>
            </body>
        </html>
    );
} 