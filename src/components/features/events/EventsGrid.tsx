"use client";

import { Event } from "@/types/event";
import EventCard from "@/components/features/events/EventCard";
import RPagination from "@/components/RComponents/RPagination";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsGridProps {
    events: Event[];
    totalEvents: number;
    page: number;
    itemsPerPage: number;
    isLoading: boolean;
}

const EventsGrid = ({ events, totalEvents, page, itemsPerPage, isLoading }: EventsGridProps) => {
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-[300px] rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {events.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No events found</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <RPagination
                            totalPages={Math.ceil(totalEvents / itemsPerPage)}
                            currentPage={page}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default EventsGrid;
