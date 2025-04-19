'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
    Calendar,
    Clock,
    MapPin,
    FileText,
    Bookmark,
    ArrowLeft,
    CalendarCheck,
    Share2,
    Facebook,
    Twitter,
    Linkedin
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Event } from '@/types/event';
import placeholder from '@/assets/images/placeholder-bg.webp';
import { useBookmark } from '@/hooks/useBookmark';
import { useRegister } from '@/hooks/useRegister';
import RFlex from '@/components/RComponents/RFlex';
import RLazyImage from '@/components/RComponents/RLazyImage';

const EventDetails: React.FC<{ event: Event }> = ({ event }) => {
    const router = useRouter();
    const { isBookmarked, toggleBookmark } = useBookmark(event.id);
    const { isRegistered, toggleRegister } = useRegister(event.id);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalRef = useRef<HTMLDivElement>(null);

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark();
    };

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleRegister();
    };

    const handleShare = (platform: string) => {
        const shareData = {
            title: event.title,
            url: window.location.href,
        };

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`);
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}`);
                break;
            default:
                break;
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (shareModalRef.current && !shareModalRef.current.contains(event.target as Node)) {
            setIsShareModalOpen(false);
        }
    };

    const addEventListeners = () => {
        document.addEventListener('click', handleClickOutside);
    };

    useEffect(() => {
        if (isShareModalOpen) {
            addEventListeners();
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isShareModalOpen]);

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="overflow-hidden">
                {event.imageUrl && (
                    <div className="relative w-full h-[300px]">
                        <RLazyImage
                            src={placeholder.src}
                            alt={event.title}
                            className="object-cover"
                        />
                    </div>
                )}

                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

                            <div className="flex items-center mb-3">
                                <Calendar className="mr-2 h-5 w-5 text-primary" />
                                <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
                            </div>

                            <div className="flex items-center mb-3">
                                <Clock className="mr-2 h-5 w-5 text-primary" />
                                <span>{event.time}</span>
                            </div>

                            <div className="flex items-center mb-3">
                                <MapPin className="mr-2 h-5 w-5 text-primary" />
                                <span>{event.location}</span>
                            </div>

                            <Separator className="my-6" />

                            <div className="mb-3 flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-primary" />
                                <h2 className="text-xl font-semibold">About this event</h2>
                            </div>

                            <p className="whitespace-pre-line">{event.description}</p>
                        </div>

                        <div>
                            <Card className="mb-6">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <h3 className="text-lg font-semibold">Actions</h3>
                                    <RFlex className="flex justify-between relative" ref={shareModalRef}>
                                        <button
                                            className="bg-[#F1E5FD] px-[10px] h-[40px] w-[40px] rounded-full hover:shadow-md transition-all duration-400"
                                            onClick={() => setIsShareModalOpen(!isShareModalOpen)}
                                        >
                                            <Share2 size={18} className='text-primary' />
                                        </button>
                                        <div className={`absolute top-12 right-0 bg-white shadow-lg rounded-[20px] px-8 py-4 transition-opacity duration-300 ${isShareModalOpen ? 'opacity-100' : 'opacity-0'}`}>
                                            <h3 className="font-semibold">Share Event</h3>
                                            <div className="flex gap-4 mt-4 text-secondary">
                                                <Facebook className='size-5 cursor-pointer' onClick={() => handleShare('facebook')} />
                                                <Twitter className='size-5 cursor-pointer' onClick={() => handleShare('twitter')} />
                                                <Linkedin className='size-5 cursor-pointer' onClick={() => handleShare('linkedin')} />
                                            </div>
                                        </div>
                                    </RFlex>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button className="w-full" variant="outline" onClick={handleBookmarkClick}>
                                        <Bookmark className="mr-2 h-5 w-5" />
                                        {isBookmarked ? "Remove from Bookmarks" : "Save as Bookmark"}
                                    </Button>
                                    <Button className="w-full" variant="outline" onClick={handleRegisterClick}>
                                        <CalendarCheck className="mr-2 h-5 w-5" />
                                        {isRegistered ? "Remove from Registered" : "Save as Registered"}
                                    </Button>

                                    <Button className="w-full" onClick={() => router.push('/')}>
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Back to Events
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
};

export default EventDetails;
