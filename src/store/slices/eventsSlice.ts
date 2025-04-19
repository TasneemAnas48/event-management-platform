import { mockEvents } from '@/lib/mock/events';
import { Event } from '@/types/event';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: mockEvents,
        originalEvents: mockEvents,
    },
    reducers: {
        setEventsAction: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
            state.originalEvents = action.payload;
        },
        searchEventsAction: (state, action: PayloadAction<string>) => {
            if (!action.payload) {
                state.events = state.originalEvents;
                return;
            }
            state.events = state.originalEvents.filter(event =>
                event.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        addEventAction: (state, action: PayloadAction<Event>) => {
            state.events.unshift(action.payload);
            state.originalEvents.unshift(action.payload);
        },
        updateEventAction: (state, action: PayloadAction<Event>) => {
            const index = state.events.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload;
                state.originalEvents[index] = action.payload;
            }
        },
        deleteEventAction: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(event => event.id !== action.payload);
            state.originalEvents = state.originalEvents.filter(event => event.id !== action.payload);
        },
    },
});

export const { addEventAction, updateEventAction, deleteEventAction, setEventsAction, searchEventsAction } = eventsSlice.actions;
export default eventsSlice.reducer;
