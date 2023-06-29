'use client';

import Link from "next/link";

type PaginationType = "oriental" | "western";

interface PaginationProps {
    type: PaginationType,
    count: number,
    nowPage: number
}

const Pagination = async ({ type, count, nowPage }: PaginationProps) => {
    return (
        <div className={`w-full flex justify-center items-center gap-6 my-10 text-xl`}>
            <div>
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-6 h-6`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
            </div>

            {
                Array(Math.ceil(count / 50)).fill(0).map((_, index) => {
                    return (
                        <Link key={index} href={`/${type}?page=${index + 1}`}>
                            <div
                                key={index}
                                className={`w-6 h-6 flex justify-center items-center cursor-pointer ${nowPage === index + 1 ? "text-blue-500" : "text-gray-500"}`}
                            >
                                {index + 1}
                            </div>
                        </Link>
                    );
                })
            }

            <div>
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-6 h-6`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    );
};

export default Pagination;
