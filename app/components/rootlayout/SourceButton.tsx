'use client'

import { useState } from "react";

function Menu() {
    return (
        <div
            className={`
                absolute
                w-52
                h-auto
                right-0
                flex
                flex-col
                bg-[#1A1D25]
                mt-2
                shadow-lg
                border
                border-purple-700
                rounded-xl
                text-white
                font-medium
                text-sm
            `}
        >
            <a target={"_blank"} rel={"noopener noreferrer"} href={`https://artbank.go.kr/home/art/productList.do?loc=h21`} className={`h-11 flex items-center px-4`}>
                미술은행
            </a>
            <a target={"_blank"} rel={"noopener noreferrer"} href={`https://openai.com/chatgpt`} className={`h-11 flex items-center border-y border-purple-700 px-4`}>
                OpenAI
            </a>
            <a target={"_blank"} rel={"noopener noreferrer"} href={`https://huggingface.co/spaces/lambdalabs/image-mixer-demo`} className={`h-11 flex items-center px-4`}>
                Image Mixer
            </a>
        </div>
    )
}
export default function SourceButton() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={handleClick}>
                <svg fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-10 h-10`}>
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
            </button>

            { isOpen && <Menu /> }
        </div>
    );
}
