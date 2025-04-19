import { Suspense, lazy } from 'react';
import Providers from '@/components/Providers';
import '../globals.css';
import RProgressBar from '@/components/RComponents/RProgressBar/RProgressBar';
import RLoader from '@/components/RComponents/RLoader';
import { Metadata } from 'next';

const Header = lazy(() => import('@/components/layout/Header'));
const Footer = lazy(() => import('@/components/layout/Footer'));

export const metadata: Metadata = {
    title: 'Event Management Platform',
    description: 'Your website description here',
    icons: {
        icon: [
            { url: '/next-js.svg', sizes: 'any' },
            { url: '/next-js.svg', sizes: '32x32', type: 'image/png' },
            { url: '/next-js.svg', sizes: '16x16', type: 'image/png' },
        ],
        apple: [{ url: '/next-js.svg' }],
    },
};

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="ltr">
            <body className={`min-h-screen flex flex-col`}>
                <Providers>
                    <RProgressBar />
                    <Suspense fallback={<RLoader />}>
                        <Header />
                        <div className="flex-grow">
                            {children}
                        </div>
                        <Footer />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
} 