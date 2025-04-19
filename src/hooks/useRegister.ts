'use client';

import { useEffect } from 'react';
import { initializeRegister, toggleRegister } from '@/store/slices/registerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export function useRegister(eventId: string) {
    const dispatch = useDispatch();
    const registeredEventIds = useSelector((state: RootState) => state.register.registeredEventIds);
    const isRegistered = registeredEventIds.includes(eventId);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('registeredEvents');
            const registeredEvents = stored ? JSON.parse(stored) : [];
            dispatch(initializeRegister(registeredEvents));
        }
    }, [dispatch]);

    const toggle = () => {
        dispatch(toggleRegister(eventId));
    };

    return { isRegistered, toggleRegister: toggle };
}