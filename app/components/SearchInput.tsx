'use client'

import { Anton } from 'next/font/google';
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const anton = Anton({
    weight: ['400'],
    subsets: ['latin'],
});


function Title() {
    const pathName: string = usePathname();
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (pathName === '/gallery/western') {
            setTitle('Western')
        } else if (pathName === '/gallery/search') {
            setTitle('Search')
        } else if (pathName === '/gallery/oriental') {
            setTitle('Oriental')
        }else if (pathName === '/gallery/calligraphy') {
            setTitle('Calligraphy')
        } else if (pathName === '/gallery/engraving') {
            setTitle('Engraving')
        } else if (pathName === '/gallery/culture') {
            setTitle('Culture')
        }
}, [pathName]);

    return (
        <div className={`${anton.className} text-gray-200 text-9xl mb-20`}>
            {title}
        </div>
    )
}

export default function Input() {
    const router = useRouter();
    const path = usePathname();

    const onEnterPress = (e: any) => {
        if (e.target.value === '') return;

        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();

            const paintingType = path.split('/').at(-1);
            let input: string = e.target.value;

            if (!input.includes(":")) input = `title:${input}`;

            let query: string;
            if (paintingType === "western" || paintingType === "oriental" || paintingType === "calligraphy" || paintingType === "culture" || paintingType === "engraving") {
                query = `?query=painting:${paintingType}+${input.split(' ').join('+')}`;
                router.push(`/gallery/search${query}`);
                return;
            } else {
                query = `?query=${input.split(' ').join('+')}`;
                router.push(`/gallery/search${query}`);
                return;
            }
        }
    }

    return (
        <div className="w-full mt-36 flex flex-col items-center">
            <Title />
            <input
                className="pr-8 pl-3 py-2 bg-gray-800 text-white placeholder-gray-500 w-2/5 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 mb-5"
                placeholder="year:2021 author:name"
                onKeyDown={onEnterPress}
            />
        </div>
    );
}
