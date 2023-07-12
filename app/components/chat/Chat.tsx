'use client'

import {ChatButton} from "@/app/components/chat/ChatUi";
import ChatRoom from "@/app/components/chat/ChatRoom";
import {useChatToggle} from "@/app/store/state";

export default function Chat() {
    const room = useChatToggle(state => state.toggle);
    return (
        <>
            <ChatButton />
            {room && <ChatRoom />}
        </>
    )
}
