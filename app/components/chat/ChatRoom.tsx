'use client'

import Header from "@/app/components/chat/header/Header";
import Input from "@/app/components/chat/input/Input";

import { useChatToggle } from "@/app/store/state";
import ChatList from "@/app/components/chat/ChatList";

export default function ChatRoom() {
    const room = useChatToggle(state => state.toggle);

    if (!room) return null;

    return (
        <div
            className={`
                fixed
                bottom-[10.5rem]
                left-10
                w-96
                h-[70%]
                bg-[#1A1D25]
                z-50
                rounded-t-xl
                drop-shadow-2xl
            `}
        >
            <Header />
            <ChatList />
            <Input />
        </div>
    )
}
