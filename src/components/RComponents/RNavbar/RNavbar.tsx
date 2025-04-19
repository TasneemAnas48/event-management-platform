'use client';

import { LogOut, Globe } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import RButton from "../RButton";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const RNavbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <header
            id="header"
            className="mb-4 shadow-md border-b-[1px] sticky top-0 bg-white flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 z-[5] justify-between"
        >
            <div  className="flex justify-between items-center gap-2 px-4 w-full">
                <RButton
                    variant="ghost"
                    onClick={() => {
                        router.push('/');
                    }}
                    text="Website"
                    Icon={Globe}
                />
                <RButton
                    variant="outline"
                    onClick={() => {
                        dispatch(logout());
                    }}
                    text="Logout"
                    Icon={LogOut}
                />

            </div>
        </header>
    );
};

export default RNavbar;
