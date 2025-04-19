import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from '@/store/slices/authSlice';
import bookmarksReducer from '@/store/slices/bookmarksSlice';
import registerReducer from '@/store/slices/registerSlice';
import eventsReducer from '@/store/slices/eventsSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], 
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    bookmarks: bookmarksReducer,
    register: registerReducer,
    events: eventsReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;