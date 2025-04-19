'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position="bottom"
                        buttonPosition="bottom-right"
                    />
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}