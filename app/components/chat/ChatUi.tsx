'use client'

import {useChatToggle} from "@/app/store/state";
import chatIcon from "@/public/chat-svgrepo-com.svg";
import Image from "next/image";

export function ChatButton() {
    const toggle = useChatToggle(state => state.change);

    return (
        <button className="fixed left-10 bottom-10 w-16 h-16 bg-blue-500 z-50 rounded-full flex justify-center items-center shadow-2xl" onClick={toggle}>
            <Image src={chatIcon} alt={`aa`} height={30} width={30} />
        </button>
    )
}

export function ChatInput() {
    return (
        <div className="absolute left-0 bottom-0 flex">
            <input
                className="w-60 h-12 px-5 text-sm focus:outline-none bg-gray-800 text-gray-100 placeholder-gray-400"
                type="text"
                placeholder="Type your message..."
            />
            <button className="w-12 bg-fuchsia-700 text-2xl">
                ▶
            </button>
        </div>
    )
}


function Avatar() {
    return (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-zinc-950 rounded-full mr-2">

            </div>
            <div>
                name
            </div>
        </div>
    )
}


export function ChatHeader() {
    return (
        <div className="absolute left-0 top-0 bg-amber-300 h-10 w-72 flex justify-between items-center px-4">
            <Avatar />
            <div className="w-2 h-2 bg-blue-500 rounded-full">

            </div>
        </div>
    )
}

