'use client'

import { Event } from '@/types/event';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RButton from "@/components/RComponents/RButton";
import RSelect from "@/components/RComponents/RSelect";
import { categoryOptions, locationOptions } from '@/lib/mock/events';
import { Textarea } from "@/components/ui/textarea";
import RControlledDialog from '@/components/RComponents/RControlledDialog';
import { addEventAction, updateEventAction } from '@/store/slices/eventsSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/useToast';

const eventValidation = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    date: z.string()
        .min(1, { message: "Date is required" })
        .refine((date) => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }, { message: "Date cannot be in the past" }),
    time: z.string()
        .min(1, { message: "Time is required" })
        .refine((time) => {
            const [hours, minutes] = time.split(':').map(Number);
            const now = new Date();
            const selectedTime = new Date();
            selectedTime.setHours(hours, minutes, 0, 0);
            return selectedTime >= now;
        }, { message: "Time cannot be in the past" }),
    location: z.string().min(1, { message: "Location is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    imageUrl: z.string().min(1, { message: "Image URL is required" }),
});

interface EventFormProps {
    event: Event | null;
    onCancel: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function EventForm({ event, onCancel, isOpen, setIsOpen }: EventFormProps) {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof eventValidation>>({
        resolver: zodResolver(eventValidation),
        defaultValues: event || {
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            category: '',
            imageUrl: '',
        }
    });

    const onSubmit = (values: z.infer<typeof eventValidation>) => {
        if (event) {
            dispatch(updateEventAction({ id: event.id, ...values } as Event));
            toast({
                title: "Event updated successfully",
            });
        } else {
            dispatch(addEventAction(values as Event));
            toast({
                title: "Event created successfully",
            });
        }
        setIsOpen(false);
    };

    return (
        <RControlledDialog
            isOpen={isOpen}
            closeDialog={() => setIsOpen(false)}
            dialogHeader={{
                title: event ? 'Edit Event' : 'Create New Event',
            }}
            contentClassName="md:max-w-[800px] max-w-[90vw]"
            dialogBody={
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Event Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RSelect
                                                options={categoryOptions.filter(option => option.value !== 'all')}
                                                placeholder="Select Category"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RSelect
                                                options={locationOptions.filter(option => option.value !== 'all')}
                                                placeholder="Select Location"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Image URL"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    rows={4}
                                                    placeholder="Event Description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                        <div className="flex justify-end space-x-4">
                            <RButton
                                variant="outline"
                                text="Cancel"
                                type="button"
                                onClick={onCancel}
                            />
                            <RButton
                                text={event ? "Update Event" : "Create Event"}
                                type="submit"
                            />
                        </div>
                    </form>
                </Form>
            }
        />
    );
} 