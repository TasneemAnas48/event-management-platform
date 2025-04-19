import { Suspense } from 'react';
import Providers from '@/components/Providers';
import '@/app/globals.css';
import RProgressBar from '@/components/RComponents/RProgressBar/RProgressBar';
import AuthGuard from '@/guards/AuthGuard';
import RLoader from '@/components/RComponents/RLoader';
import { Metadata } from 'next';
import RNavbar from '@/components/RComponents/RNavbar/RNavbar';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin dashboard for Event Management Platform',
    icons: {
        icon: [
            { url: '/next-js.svg', sizes: 'any' },
            { url: '/next-js.svg', sizes: '32x32', type: 'image/png' },
            { url: '/next-js.svg', sizes: '16x16', type: 'image/png' },
        ],
        apple: [{ url: '/next-js.svg' }],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" dir="ltr">
            <body>
                <Providers>
                    <AuthGuard>
                        <Suspense fallback={<RLoader />}>
                            <RProgressBar />
                            <div className="z-[1]">
                                <RNavbar />
                                {children}
                            </div>
                        </Suspense>
                    </AuthGuard>
                </Providers>
            </body>
        </html>
    );
} 