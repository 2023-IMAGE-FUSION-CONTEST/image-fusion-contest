import {ChatHeader, ChatInput} from "@/app/components/chat/ChatUi";

export default function ChatRoom() {
    return (
        <div className="fixed left-10 bottom-32 w-72 h-2/3 bg-blue-200 z-50">
            <ChatHeader />
            <ChatInput />
        </div>
    )
}
