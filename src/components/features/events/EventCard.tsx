'use client';

import Link from 'next/link';
import { formatDate } from '@/utils/formatters';
import { useBookmark } from '@/hooks/useBookmark';
import { Event } from '@/types/event';
import { Bookmark, ArrowRight } from 'lucide-react';
import placeholder from '@/assets/images/placeholder.png';
import { capitalizeFirstLetter } from '@/utils/helperFunctions';
import RTooltip from '@/components/RComponents/RTooltip';
import RLazyImage from '@/components/RComponents/RLazyImage';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const { isBookmarked, toggleBookmark } = useBookmark(event.id);

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark();
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
                <RLazyImage
                    src={placeholder.src}
                    alt={event.title}
                    className="object-cover"
                />
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <RTooltip
                        tooltipText={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                        triggerComponent={
                            <button
                                onClick={handleBookmarkClick}
                                className={`${isBookmarked ? "text-yellow-500" : "text-gray-500"}`}>
                                <Bookmark className="w-6 h-6" />
                            </button>
                        }
                    />
                </div>

                <p className="text-gray-600 mb-2">{formatDate(event.date)} • {event.time}</p>
                <p className="text-gray-600 mb-4">{capitalizeFirstLetter(event.location.replace(/-/g, ' '))}</p>

                <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {event.category}
                    </span>

                    <Link
                        href={`/event/${event.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                    >
                        View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 