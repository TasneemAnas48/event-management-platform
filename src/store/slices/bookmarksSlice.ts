// store/slices/bookmarksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarksState {
    bookmarkedEventIds: string[];
}

const loadFromLocalStorage = (): string[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('bookmarkedEvents');
        return stored ? JSON.parse(stored) : [];
    }
    return [];
};

const initialState: BookmarksState = {
    bookmarkedEventIds: loadFromLocalStorage(),
};

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        toggleBookmark: (state, action: PayloadAction<string>) => {
            const eventId = action.payload;
            const index = state.bookmarkedEventIds.indexOf(eventId);

            if (index === -1) {
                state.bookmarkedEventIds.push(eventId);
            } else {
                state.bookmarkedEventIds.splice(index, 1);
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('bookmarkedEvents', JSON.stringify(state.bookmarkedEventIds));
            }
        },
        initializeBookmarks: (state, action: PayloadAction<string[]>) => {
            state.bookmarkedEventIds = action.payload;
        },
    },
});

export const { toggleBookmark, initializeBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;