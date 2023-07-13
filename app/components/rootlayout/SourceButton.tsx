'use client'

import { useState } from "react";
import Link from 'next/link';
import {menu, bg} from "@/app/colos";


function Menu() {
    return (
        <div className={`absolute w-32 h-auto right-0 flex flex-col bg-[${menu}] mt-2 shadow-lg p-0 border-white border`}>
            <Link href={`/`} className="hover:underline text-white p-2">
                abc
            </Link>
            <Link href={`/`} className={`hover:underline text-white bg-gray-800 p-2`}>
                abc
            </Link>
            <Link href={`/`} className="hover:underline text-white p-2">
                abc
            </Link>
        </div>
    )
}
export default function SourceButton() {
    const smallBtnOption: string = `px-4 pt-2 text-gray-50 text-sm hover:underline`;
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={handleClick} className={`${smallBtnOption}`}>
                제공▼
            </button>

            {isOpen && <Menu />}
        </div>
    );
}
