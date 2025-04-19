import { mockEvents } from '@/lib/mock/events';
import { Event, FilterOption, SortOption } from '@/types/event';

// Query keys for React Query
export const eventKeys = {
    all: ['events'] as const,
    lists: () => [...eventKeys.all, 'list'] as const,
    list: (filters: { page?: number; size?: number; sortBy?: SortOption; filters?: FilterOption }) =>
        [...eventKeys.lists(), filters] as const,
    detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
    userEvents: (type: 'bookmarked' | 'registered') =>
        [...eventKeys.all, 'user', type] as const,
};

// Query functions
export const eventApi = {
    getEventById: async (id: string): Promise<Event | null> => {
        const event = mockEvents.find(event => event.id === id);
        return event || null;
    },

    fetchEvents: async ({ page, size, sortBy, filters, search }: {
        page?: number;
        size?: number;
        sortBy?: SortOption;
        filters?: FilterOption;
        search?: string;
    }) => {

        let filteredEvents = [...mockEvents];

        if (filters) {
            if (filters.category && filters.category !== 'all') {
                filteredEvents = filteredEvents.filter(event =>
                    event.category.toLowerCase() === filters.category?.toLowerCase()
                );
            }

            if (filters.location && filters.location !== 'all') {
                const searchLocation = filters.location.toLowerCase().trim();
                filteredEvents = filteredEvents.filter(event =>
                    event.location.toLowerCase().includes(searchLocation)
                );
            }
        }

        if (sortBy) {
            filteredEvents.sort((a, b) => {
                switch (sortBy) {
                    case 'newest':
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    case 'oldest':
                        return new Date(a.date).getTime() - new Date(b.date).getTime();
                    default:
                        return 0;
                }
            });
        }

        if (search) {
            filteredEvents = filteredEvents.filter(event =>
                event.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (page != undefined && size != undefined) {
            const startIndex = (page - 1) * size;
            const paginatedEvents = filteredEvents.slice(startIndex, startIndex + size);
            return { events: paginatedEvents, totalEvents: filteredEvents.length };
        }
        return { events: filteredEvents, totalEvents: filteredEvents.length };
    },

    fetchUserEvents: async (type: 'bookmarked' | 'registered') => {
        const eventIds = type === 'bookmarked'
            ? JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]')
            : JSON.parse(localStorage.getItem('registeredEvents') || '[]');

        return mockEvents.filter((event: Event) => eventIds.includes(event.id));
    },
};

