'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type PaginationType = "oriental" | "western";

interface PaginationProps {
    type: PaginationType,
    count: number
}

const Pagination = ({ type, count }: PaginationProps) => {
    const params = useParams();
    const nowPage = (params.slug && (!isNaN(Number(params.slug)) && Number(params.slug) > 0)) ? Number(params.slug) : 1;
    const [display, setDisplay] = useState<Array<number>>([]);

    useEffect(() => {
        let temp: number[] = Array.from({ length: 5 }, (_, i) => (i + (Math.floor((nowPage - 1) / 5) * 5)) + 1);
        temp = temp.filter((item) => item <= Math.ceil(count / 50));
        setDisplay(temp);
    }, [nowPage, count, type]);

    return (
        <div className={`w-full flex justify-center items-center my-10 text-xl`}>
            <Link href={`/gallery/${type}?page=1`}>
                <div
                    className={`
                        p-2
                        border
                        border-r-[0.5px]
                        rounded-tl-md
                        rounded-bl-md
                        hover:bg-[#004ABF]
                        hover:text-white
                        transform
                        duration-300
                    `}
                >
                    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-6 h-6`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>

            {
                nowPage !== 1 &&
                <Link href={`/gallery/${type}?page=${nowPage - 1}`}>
                    <div
                        className={`
                            p-2
                            border
                            border-x-[0.5px]
                            hover:bg-[#004ABF]
                            hover:text-white
                            transform
                            duration-300
                        `}
                    >
                        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-6 h-6`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                </Link>
            }

            {
                display.map((item) => {
                    return (
                        <Link key={item.toString()} href={`/gallery/${type}?page=${item}`}>
                            <div
                                className={`
                                    w-[2.625rem]
                                    h-[2.625rem]
                                    flex
                                    justify-center
                                    items-center
                                    cursor-pointer
                                    ${nowPage === item ? "text-[#004ABF]" : "text-black"}
                                    p-2
                                    border-y-[1px]
                                    border-x-[0.5px]
                                    hover:bg-[#004ABF]
                                    hover:text-white
                                    transform
                                    duration-300
                                `}
                            >
                                { item }
                            </div>
                        </Link>
                    );
                })
            }

            {
                nowPage !== Math.ceil(count / 50) &&
                <Link href={`/gallery/${type}?page=${nowPage + 1}`}>
                    <div
                        className={`
                            p-2
                            border
                            border-x-[0.5px]
                            hover:bg-[#004ABF]
                            hover:text-white
                            transform
                            duration-300
                        `}
                    >
                        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-6 h-6`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </Link>
            }

            <Link href={`/gallery/${type}?page=${Math.ceil(count / 50)}`}>
                <div
                    className={`
                        p-2
                        border
                        border-l-[0.5px]
                        rounded-tr-md
                        rounded-br-md
                        hover:bg-[#004ABF]
                        hover:text-white
                        transform
                        duration-300
                    `}
                >
                    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-6 h-6`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default Pagination;
