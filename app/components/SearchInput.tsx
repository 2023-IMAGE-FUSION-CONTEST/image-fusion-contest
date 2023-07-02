'use client'

import Link from "next/link";
import { Anton } from 'next/font/google';
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

const anton = Anton({
    weight: ['400'],
    subsets: ['latin'],
});


function Tag() {
    const tailwind = `
        bg-gray-100 text-gray-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded 
        dark:bg-gray-700 dark:text-gray-300
        hover:bg-purple-800 hover:text-purple-100 
        transition-colors
    `
    return (
        <Link className={`${tailwind}`} href="/">
            value
        </Link>
    )
}

function Title() {
    const router: string = usePathname();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const pathName = router
        if (pathName === '/gallery/western') {
            setTitle('Western')
        } else if (pathName === '/gallery/museum') {
            setTitle('Museum')
        } else {
            setTitle('Oriental')
        }
    }, [router]);

    return (
        <div className={`${anton.className} text-gray-200 text-9xl mb-20`}>
            {title}
        </div>
    )
}

export default function Input() {
    return (
        <div className="w-full mt-36 flex flex-col items-center">
            <Title />
            <input className="pr-8 pl-3 py-2 bg-gray-800 text-white placeholder-gray-500 w-7/12 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 mb-5" placeholder="검색를 입력해 주세요." />
            <div className="flex">
                <Tag/>
                <Tag/>
                <Tag/>
                <Tag/>
                <Tag/>
                <Tag/>
                <Tag/>
            </div>
        </div>
    );
}
