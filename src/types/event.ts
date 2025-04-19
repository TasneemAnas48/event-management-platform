export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    imageUrl: string;
}

export interface Speaker {
    id: string;
    name: string;
    bio: string;
    imageUrl: string;
}

export type SortOption = 'newest' | 'oldest'

export type FilterOption = {
    category?: string;
    location?: string;
}; 