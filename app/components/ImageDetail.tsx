'use client';

import { ArtworkType } from "@/types/ArtworkType";
import Image from "next/image";
import Link from "next/link";

interface ImageDetailProps {
    data: ArtworkType,
    setSelected: any
}

const ImageDetail = ({ data, setSelected }: ImageDetailProps) => {
    return (
        <div
            className={`
                overflow-hidden
                fixed
                top-[2.5%]
                right-[1%]
                w-[30%]
                h-[95%]
                bg-white
                border
                rounded-2xl
                shadow-2xl
            `}
        >
            <div
                className={`
                    w-full
                    overflow-y-auto
                `}
            >
                <div className={`bg-white w-full h-10 flex flex-row px-4 items-center justify-between`}>
                    <Link href={data.url}>
                        <div className={`flex flex-row gap-3 items-center cursor-pointer hover:text-blue-600`}>
                            <div>
                                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-5 h-5`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </div>
                            <div className={`w-60 text-ellipsis whitespace-nowrap overflow-hidden`}>
                                { data.url }
                            </div>
                        </div>
                    </Link>
                    <div
                        onClick={() => {
                            setSelected(
                                {
                                    title: "",
                                    description: "",
                                    author: "",
                                    type: "",
                                    year_of_mfg: "",
                                    url: "",
                                    image: ""
                                }
                            );
                        }}
                    >
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-5 h-5`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className={`relative w-full h-full`}>
                    <div className={`relative w-full h-96 bg-[#f1f3f4]`}>
                        <Image src={`http://artbank.go.kr${data.image}`} alt={data.image} fill={true} className={`object-contain`} />
                    </div>
                    <div className={`px-4 py-4`}>
                        <div className={`text-3xl`}>{ data.title }</div>
                        <div className={`text-xl`}>{ data.author }</div>
                        <div>{ data.description }</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageDetail;
