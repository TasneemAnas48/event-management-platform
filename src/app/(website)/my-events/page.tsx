'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Event } from '@/types/event';
import { useFetchData } from '@/hooks/useFetchData';
import { eventKeys } from '@/lib/api/events';
import { eventApi } from '@/lib/api/events';
import { Skeleton } from '@/components/ui/skeleton';

const EventCard = dynamic(() => import('@/components/features/events/EventCard'));

const TabButton = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button
        className={`px-4 py-2 ${active ? 'border-b-2 border-blue-600 font-medium' : ''}`}
        onClick={onClick}
    >
        {label}
    </button>
);

export default function MyEventsPage() {
    const [activeTab, setActiveTab] = useState<'bookmarked' | 'registered'>('bookmarked');

    const { data, isLoading } = useFetchData({
        queryKey: eventKeys.userEvents(activeTab),
        queryFn: () => eventApi.fetchUserEvents(activeTab),
    });

    const tabButtons = useMemo(() => (
        <div className="flex border-b mb-8">
            <TabButton
                active={activeTab === 'bookmarked'}
                label="Bookmarked"
                onClick={() => setActiveTab('bookmarked')}
            />
            <TabButton
                active={activeTab === 'registered'}
                label="Registered"
                onClick={() => setActiveTab('registered')}
            />
        </div>
    ), [activeTab]);

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Events</h1>
            {tabButtons}

            {isLoading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className='w-full h-[300px] rounded-lg' />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data && data.length > 0 ? (
                        data.map((event: Event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            No {activeTab} events found.
                        </div>
                    )}
                </div>
            )}
        </main>
    );
} 