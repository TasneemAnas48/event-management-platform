import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
    registeredEventIds: string[];
}

const loadFromLocalStorage = (): string[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('registeredEvents');
        return stored ? JSON.parse(stored) : [];
    }
    return [];
};

const initialState: RegisterState = {
    registeredEventIds: loadFromLocalStorage(),
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        toggleRegister: (state, action: PayloadAction<string>) => {
            const eventId = action.payload;
            const index = state.registeredEventIds.indexOf(eventId);

            if (index === -1) {
                state.registeredEventIds.push(eventId);
            } else {
                state.registeredEventIds.splice(index, 1);
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('registeredEvents', JSON.stringify(state.registeredEventIds));
            }
        },
        initializeRegister: (state, action: PayloadAction<string[]>) => {
            state.registeredEventIds = action.payload;
        },
    },
});

export const { toggleRegister, initializeRegister } = registerSlice.actions;
export default registerSlice.reducer;