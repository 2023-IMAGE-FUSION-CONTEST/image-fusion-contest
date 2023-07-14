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
                h-[calc(100%-3rem-4px)]
                scrollbar-hide
                px-4
                text-white
                flex
                flex-col
                gap-4
                text-base
            `}
        >
            {
                chatList.map((chat, index) => {
                    if (chat.role === 'assistant') {
                        return (
                            <div
                                key={ chat.content + index }
                                className={`
                                p-4
                                bg-zinc-500
                                rounded-xl
                                max-w-[18rem]
                            `}
                            >
                                { chat.content }
                            </div>
                        )
                    } else if (chat.role === 'user') {
                        return (
                            <div
                                key={ chat.content + index }
                                className={`
                                self-end
                                py-2
                                px-4
                                bg-[#372FEB]
                                rounded-3xl
                                max-w-[18rem]
                            `}
                            >
                                { chat.content }
                            </div>
                        )
                    }
                })
            }
        </div>
    );
};

export default ChatList;
