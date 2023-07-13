'use client';

import { useChatToggle } from "@/app/store/state";
import Image from "next/image";
import chatIcon from "@/public/chat-svgrepo-com.svg";

const FloatingButton = () => {
    const toggle = useChatToggle(state => state.change);

    return (
        <button className="fixed left-10 bottom-10 w-16 h-16 bg-blue-500 z-50 rounded-full flex justify-center items-center shadow-2xl" onClick={toggle}>
            <Image src={chatIcon} alt={`aa`} height={30} width={30} />
        </button>
    )
};

export default FloatingButton;
