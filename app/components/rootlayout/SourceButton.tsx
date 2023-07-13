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
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-10 h-10`}>
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
            </button>

            {isOpen && <Menu />}
        </div>
    );
}
