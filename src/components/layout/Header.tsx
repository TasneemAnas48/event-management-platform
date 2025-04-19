"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useMobile";
import { useState } from "react";
import RButton from "@/components/RComponents/RButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useIsMobile();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <header className="bg-primary text-white py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
                    Event Management Platform
                </h1>

                {!isMobile && (
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="/" className="hover:text-purple-100 transition-colors duration-200">Home</Link></li>
                            <li><Link href="/my-events" className="hover:text-purple-100 transition-colors duration-200">My Events</Link></li>
                            {isAuthenticated ? (
                                <li><Link href="/admin" className="hover:text-purple-100 transition-colors duration-200">Dashboard</Link></li>
                            ) : (
                                <li><Link href="/login" className="hover:text-purple-100 transition-colors duration-200">Login</Link></li>
                            )}
                        </ul>
                    </nav>
                )}

                {isMobile && (
                    <RButton
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-primary hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        ariaLabel="Toggle menu"
                        Icon={isMenuOpen ? X : Menu}
                    />
                )}
            </div>

            {isMobile && (
                <div
                    className={`bg-primary transform transition-all duration-300 ease-in-out ${isMenuOpen
                            ? 'max-h-48 opacity-100'
                            : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                >
                    <nav className="container mx-auto px-4 py-2">
                        <ul className="flex flex-col space-y-1">
                            <li><Link href="/" className="block py-1 px-4 hover:bg-primary hover:text-white rounded-md transition-colors duration-200">Home</Link></li>
                            <li><Link href="/my-events" className="block py-1 px-4 hover:bg-primary hover:text-white rounded-md transition-colors duration-200">My Events</Link></li>
                            <li><Link href="/dashboard" className="block py-1 px-4 hover:bg-primary hover:text-white rounded-md transition-colors duration-200">Dashboard</Link></li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;