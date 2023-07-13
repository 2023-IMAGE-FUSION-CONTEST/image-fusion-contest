'use client'

import {ChatInput} from "@/app/components/chat/ChatInput";
import {ChatHeader} from "@/app/components/chat/ChatHeader";
import {useChatList} from "@/app/store/state";
import {useEffect} from "react";


function ChatBubble() {
    return (
        <div className="w-72 h-auto">
            sadsdaffskjfskldfaslfjaslkjflskjflaskjdflskjflksfd;lasdkjf;laskjdf
        </div>
    )
}

export default function ChatRoom() {
    const chatList = useChatList(state => state.list);

    useEffect(() => {
        console.log(chatList);
    }, [chatList]);

    return (
        <div className="fixed left-10 bottom-32 w-72 h-2/3 bg-blue-200 z-50 overflow-y-scroll overflow-x-hidden py-10">
            <ChatHeader />
            <ChatInput />
            {chatList.map((ab) => <div>{ab}</div>)}
        </div>
    )
}
