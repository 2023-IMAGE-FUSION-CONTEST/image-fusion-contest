'use client'

import Header from "@/app/components/chat/header/Header";
import Input from "@/app/components/chat/input/Input";

import {useChatToggle, useSelectedAvatar} from "@/app/store/state";
import ChatList from "@/app/components/chat/ChatList";
import Avatar from "@/app/components/chat/header/Avatar";

export default function ChatRoom() {
    const room = useChatToggle(state => state.toggle);
    const avatar = useSelectedAvatar(state => state.onSelected);
    if (!room) return null;

    return (
        <div className="fixed left-12 bottom-32 flex flex-col z-50">
            {avatar && <Avatar/>}
            <Header />
            <ChatList />
            <Input />
        </div>
    )
}
