'use client';

import { useState, useCallback } from 'react';
import { Event } from '@/types/event';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Plus} from 'lucide-react';
import RButton from '@/components/RComponents/RButton';
import RSearchInput from '@/components/RComponents/RSearchInput';
import RFlex from '@/components/RComponents/RFlex';
import { deleteEventAction, searchEventsAction } from '@/store/slices/eventsSlice';
import { useDispatch } from 'react-redux';
import EventForm from '@/components/features/admin/EventForm';
import EventsTable from '@/components/features/admin/EventsTable';

export default function AdminDashboard() {
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchData, setSearchData] = useState<string>("");


  const handleSearch = (search: string) => {
    dispatch(searchEventsAction(search));
  }

  const handleEdit = useCallback((event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    dispatch(deleteEventAction(id));
  }, [dispatch]);

  const handleAddNew = useCallback(() => {
    setEditingEvent(null);
    setIsFormOpen(true);
  }, []);


  return (
    <div>
      <RFlex className="container mx-auto flex-col gap-3">
        <RFlex className="gap-2 justify-between items-end">
          <span className="flex gap-1 items-end">
            Events
            <div className="bg-gray-200 flex justify-center items-center rounded-full text-[11px] mt-1 w-7 h-6">
              {events.length}
            </div>
          </span>
        </RFlex>

        <RFlex className="gap-2 justify-between items-center">
          <RSearchInput
            searchData={searchData}
            handleSearchClicked={() => handleSearch(searchData)}
            handleDataChanged={setSearchData}
            placeholder="Search events..."
          />
          <RFlex className="items-center">
            <RButton
              Icon={Plus}
              text="Add New Event"
              variant="outline"
              onClick={handleAddNew}
            />
          </RFlex>
        </RFlex>


        <EventsTable
          data={events || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isFormOpen && (
          <EventForm
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            event={editingEvent}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingEvent(null);
            }}
          />

        )}
      </RFlex>
    </div>
  );
} 