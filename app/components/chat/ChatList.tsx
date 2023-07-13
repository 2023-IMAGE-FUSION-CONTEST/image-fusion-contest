'use client'

import { useChatList } from "@/app/store/state";
import { useEffect, useRef } from "react";

const ChatList = () => {
    const chatListRef = useRef<HTMLDivElement>(null);
    const chatList = useChatList(state => state.list);

    useEffect(() => {
        // chatListRef가 스크롤의 맨 아래에 위치하도록 설정
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [chatList])

    return (
        <div
            ref={chatListRef}
            className={`
                overflow-x-hidden
                overflow-y-auto
                w-full
                h-[calc(100%-2.5rem)]
            `}
        >
            {
                chatList.map((chat) => {
                    return (
                        <div key={chat.toString()}>{ chat }</div>
                    )
                })
            }
        </div>
    );
};

export default ChatList;
