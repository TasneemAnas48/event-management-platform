import { Event } from '@/types/event';


export const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts' },
    { value: 'technology', label: 'Technology' },

];

export const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'online', label: 'Online' },
    { value: 'in-person', label: 'In Person' }
];

export const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
];

export const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Summer Music Festival',
        description: 'Annual music festival featuring top artists from around the world.',
        date: '2024-07-15',
        time: '12:00',
        location: 'in-person',
        category: 'music',
        imageUrl: '@/assets/images/placeholder.png'
    },
    {
        id: '2',
        title: 'Virtual Art Exhibition',
        description: 'Online exhibition featuring digital and traditional artworks.',
        date: '2024-06-01',
        time: '09:00',
        location: 'online',
        category: 'arts',
        imageUrl: '@/assets/images/placeholder.png',
    },
    {
        id: '3',
        title: 'Championship Finals',
        description: 'Annual sports championship finals.',
        date: '2024-08-20',
        time: '02:00',
        location: 'in-person',
        category: 'sports',
        imageUrl: '@/assets/images/placeholder.png',
    },
    {
        id: '4',
        title: 'Jazz Night',
        description: 'Live jazz performance with local artists.',
        date: '2024-05-10',
        time: '07:00',
        location: 'in-person',
        category: 'music',
        imageUrl: '@/assets/images/placeholder.png',
    },
    {
        id: '5',
        title: 'Tech Conference 2024',
        description: 'Annual technology conference featuring the latest innovations in AI and blockchain.',
        date: '2024-09-15',
        time: '10:00',
        location: 'online',
        category: 'technology',
        imageUrl: '@/assets/images/placeholder.png',
    },
    {
        id: '6',
        title: 'Cooking Masterclass',
        description: 'Learn authentic Italian cuisine from master chefs.',
        date: '2024-07-22',
        time: '11:00',
        location: 'in-person',
        category: 'technology',
        imageUrl: '@/assets/images/placeholder.png',
    },
    {
        id: '7',
        title: 'Yoga Retreat',
        description: 'Weekend wellness retreat with meditation and yoga sessions.',
        date: '2024-08-05',
        time: '08:00',
        location: 'in-person',
        category: 'music',
        imageUrl: '@/assets/images/placeholder.png',
    },
    {
        id: '8',
        title: 'Startup Pitch Night',
        description: 'Local entrepreneurs pitch their innovative ideas to investors.',
        date: '2024-06-15',
        time: '06:00',
        location: 'in-person',
        category: 'technology',
        imageUrl: '@/assets/images/placeholder.png',
    }
];

