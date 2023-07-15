'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageFusion from "@/app/components/ImageFusion";
import { getBase64Image } from "@/utils/getBase54Image";
import { menu } from "@/app/colors";
import {useChatList, useChatToggle, useSelectedArtwork} from "@/app/store/state";

const ImageDetail = () => {
    const descriptionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [baseImage, setBaseImage] = useState<string | null | undefined>(null);

    const [viewMore, setViewMore] = useState(false);

    const resetChatList = useChatList(state => state.reset);
    const data = useSelectedArtwork();
    const resetChatVisible = useChatToggle(state => state.reset);

    useEffect(() => {
        resetChatList(`작가 : ${data.author}, 작품명: ${data.title}, 제작년도: ${data.year_of_mfg}, 화풍: ${data.type}, 작품설명: ${data.description}`);
    }, [data])

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.onload = () => {
                getBase64Image(imageRef.current)
                    .then(res => {
                        setBaseImage(res);
                    });
            }
        }
    }, [data.image]);

    return (
        <div
            className={`overflow-hidden fixed top-[2.5%] right-[1%] w-[36rem] h-[95%] bg-[#1A1D25] z-50 text-[#FFFFFF] shadow-2xl rounded-xl`}
        >
            <div
                className={`
                    w-full
                    h-full
                    overflow-y-auto
                `}
            >
                <div className={`bg-[${menu}] w-full h-10 flex flex-row px-4 items-center justify-between border-b border-[#586065] mb-4`}>
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
                            data.reset();
                            resetChatVisible();
                        }}
                        className="hover:bg-white hover:bg-opacity-30 cursor-pointer"
                    >
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-5 h-5`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className={`relative w-full`}>
                    <div className={`relative w-full h-96 bg-[${menu}]`}>
                        <Image ref={imageRef} src={`https://artbank.go.kr${data.image}`} alt={data.image} fill={true} className={`object-contain`} />
                    </div>
                    <div className={`px-4 py-4`}>
                        <div className={`text-3xl mb-1`}>{ data.title }</div>
                        <div className={`flex flex-row gap-2 font-light text-base mb-4`}>
                            <div>{ data.author }</div>
                            { data.year_of_mfg !== "" && <div>{ data.year_of_mfg }</div>}
                            { data.type !== "" && <div>{ data.type }</div> }
                        </div>
                        <div
                            ref={descriptionRef}
                            className={`
                                tracking-wide
                                leading-relaxed
                                text-[#a4a4a4]
                                ${viewMore ? `h-auto` : `h-20`}
                                overflow-hidden
                            `}
                        >
                            { data.description }
                        </div>

                        {
                            descriptionRef && descriptionRef.current && descriptionRef.current?.scrollHeight > 80 && (
                                <button
                                    className={`
                                        w-full
                                        h-10
                                        bg-gray-800
                                        text-white
                                        border-b-1
                                        border-white
                                        hover:bg-gray-700
                                        transition-colors
                                        duration-300
                                        mt-4
                                        rounded-md
                                        cursor-pointer
                                    `}
                                    onClick={() => setViewMore(!viewMore)}
                                >
                                    { !viewMore ? `View More` : `View Less` }
                                </button>
                            )
                        }

                        <ImageFusion baseImage={baseImage} imageUrl={`https://artbank.go.kr${data.image}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageDetail;
