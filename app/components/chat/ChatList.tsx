'use client'

import { useChat, useChatList } from "@/app/store/state";
import { useEffect, useRef } from "react";

const ChatList = () => {
    const chatListRef = useRef<HTMLDivElement>(null);
    const chatList = useChatList(state => state.list);
    const AITyping = useChat(state => state.AITyping);

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
                h-[60vh]
                bg-[#1A1D25]
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
                                    self-start
                                    inline-block
                                    py-2
                                    px-4
                                    bg-zinc-700
                                    rounded-3xl
                                    max-w-[18rem]
                                    first:mt-4
                                    last:mb-4
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
                                inline-block
                                py-2
                                px-4
                                bg-[#372FEB]
                                rounded-3xl
                                max-w-[18rem]
                                first:mt-4
                                last:mb-4
                            `}
                            >
                                { chat.content }
                            </div>
                        )
                    }
                })
            }

            {
                AITyping &&
                <div
                    className={`
                        self-start
                        inline-block
                        py-2
                        px-4
                        bg-zinc-700
                        rounded-3xl
                        max-w-[18rem]
                        first:mt-4
                        last:mb-4
                    `}
                >
                    <div className="animate-pulse"> • • • </div>
                </div>
            }
        </div>
    );
};

export default ChatList;
