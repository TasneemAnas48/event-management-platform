'use client';

import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RButton from "../RComponents/RButton";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Event Management Platform</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Creating memorable experiences through seamless event management solutions.
                        </p>
                        <div className="flex space-x-3">
                            <RButton variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" Icon={Twitter} />
                            <RButton variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" Icon={Instagram} />
                            <RButton variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" Icon={Github} />
                            <RButton variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" Icon={Linkedin} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
                        <address className="not-italic text-sm text-gray-400 space-y-2">
                            <p>Damascus, Syria</p>
                            <p>Email: info@eventplatform.com</p>
                            <p>Phone: (963) 999-999-999</p>
                        </address>
                    </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400 mb-4 md:mb-0">
                        © 2024 Event Management Platform. All rights reserved.
                    </p>
                    <div className="text-sm text-gray-400">
                        <a href="#" className="hover:text-white mr-4 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


