'use client';

import { useEffect } from 'react';
import { initializeBookmarks, toggleBookmark } from '@/store/slices/bookmarksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export function useBookmark(eventId: string) {
    const dispatch = useDispatch();
    const bookmarkedEventIds = useSelector((state: RootState) => state.bookmarks.bookmarkedEventIds);
    const isBookmarked = bookmarkedEventIds.includes(eventId);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('bookmarkedEvents');
            const bookmarkedEvents = stored ? JSON.parse(stored) : [];
            dispatch(initializeBookmarks(bookmarkedEvents));
        }
    }, [dispatch]);

    const toggle = () => {
        dispatch(toggleBookmark(eventId));
    };

    return { isBookmarked, toggleBookmark: toggle };
}