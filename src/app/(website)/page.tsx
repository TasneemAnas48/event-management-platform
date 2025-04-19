"use client";

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Event, SortOption } from '@/types/event';
import { eventKeys } from '@/lib/api/events';
import { useFetchData } from '@/hooks/useFetchData';
import { eventApi } from '@/lib/api/events';

const EventsFilters = dynamic(() => import('@/components/features/events/EventsFilters'));
const EventsGrid = dynamic(() => import('@/components/features/events/EventsGrid'));

const ITEMS_PER_PAGE = 6;

export default function EventsPage() {
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>([]);
    const [totalEvents, setTotalEvents] = useState(0);

    const { page, category, location, sortBy } = useMemo(() => ({
        page: Number(searchParams.get('page')) || 1,
        category: searchParams.get('category') || 'all',
        location: searchParams.get('location') || 'all',
        sortBy: (searchParams.get('sortBy') as SortOption) || 'newest'
    }), [searchParams]);

    const { data: eventsData, isLoading } = useFetchData({
        queryKey: eventKeys.list({ page: page, size: ITEMS_PER_PAGE, sortBy: sortBy, filters: { category, location } }),
        queryFn: () => eventApi.fetchEvents({ page: page, size: ITEMS_PER_PAGE, sortBy: sortBy, filters: { category, location } }),
    });

    const handleFilterChange = () => {
        const filteredEvents = eventsData?.events;
        setEvents(filteredEvents || []);
        setTotalEvents(eventsData?.totalEvents || 0);
    };

    useEffect(() => {
        const filteredEvents = eventsData?.events;
        setEvents(filteredEvents || []);
        setTotalEvents(eventsData?.totalEvents || 0);
    }, [eventsData]);

    return (
        <div className="container mx-auto px-4 py-8">
            <EventsFilters
                initialFilters={{ category, location }}
                initialSortBy={sortBy}
                onFilterChange={handleFilterChange}
            />

            <EventsGrid
                events={events}
                totalEvents={totalEvents}
                page={page}
                itemsPerPage={ITEMS_PER_PAGE}
                isLoading={isLoading}
            />
        </div>
    );
} 