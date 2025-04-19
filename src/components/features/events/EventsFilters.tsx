"use client";

import { FilterOption, SortOption } from '@/types/event';
import { useState, useEffect } from 'react';
import RSelect from '@/components/RComponents/RSelect';
import { categoryOptions, locationOptions, sortOptions } from '@/lib/mock/events';
import RButton from '@/components/RComponents/RButton';
import { X } from 'lucide-react';

interface EventsFiltersProps {
    initialFilters: FilterOption;
    initialSortBy: SortOption;
    onFilterChange: (filters: FilterOption, sortBy: SortOption) => void;
}

const EventsFilters = ({
    initialFilters,
    initialSortBy,
    onFilterChange
}: EventsFiltersProps) => {

    const [filters, setFilters] = useState<FilterOption>(initialFilters);
    const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);

    const handleClearFilters = () => {
        setFilters({ category: 'all', location: 'all' });
        setSortBy('newest');
        onFilterChange({ category: 'all', location: 'all' }, 'newest');
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value.toString());
        });
        params.set('sortBy', sortBy);
        params.set('page', '1');

        window.history.pushState({}, '', `?${params.toString()}`);
        onFilterChange(filters, sortBy);
    }, [filters, sortBy]);


    return (
        <div className="flex flex-col sm:flex-row gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <RSelect
                    value={filters.category}
                    onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                    options={categoryOptions}
                    placeholder="Select Category"
                    classNameContent="w-full"
                />

                <RSelect
                    value={filters.location}
                    onChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                    options={locationOptions}
                    placeholder="Select Location"
                    classNameContent="w-full"
                />

                <RSelect
                    value={sortBy}
                    onChange={(value) => setSortBy(value as SortOption)}
                    options={sortOptions}
                    placeholder="Sort By"
                    classNameContent="w-full"
                />

                <RButton
                    onClick={handleClearFilters}
                    variant="outline"
                    Icon={X}
                    text="Clear Filters"
                    className="w-full sm:w-auto"
                />
            </div>
        </div>
    );
}

export default EventsFilters;
