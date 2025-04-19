"use client";

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { eventApi } from '@/lib/api/events';
import { useFetchData } from '@/hooks/useFetchData';
import { eventKeys } from '@/lib/api/events';

const EventDetails = dynamic(() => import('@/components/features/events/EventDetails'));

export default function EventPage() {
    const { id } = useParams();

    const { data: event, isLoading } = useFetchData({
        queryKey: eventKeys.detail(String(id)),
        queryFn: () => eventApi.getEventById(String(id)),
        enableCondition: !!id,
    });

    if (isLoading) {
        return <EventSkeleton />;
    }

    if (!event) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <EventDetails event={event} />
        </main>
    );
}

const EventSkeleton = () => {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="overflow-hidden rounded-lg border">
                <Skeleton className="w-full h-[300px] animate-pulse" />
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <Skeleton className="h-8 w-3/4 mb-4" />
                            <Skeleton className="h-5 w-1/2 mb-3" />
                            <Skeleton className="h-5 w-1/3 mb-3" />
                        </div>
                        <div>
                            <div className="rounded-lg border p-4">
                                <Skeleton className="h-6 w-1/4 mb-4" />
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
