import Input from "@/app/components/SearchInput";
import FloatingButton from "@/app/components/chat/FloatingButton";
import ChatRoom from "@/app/components/chat/ChatRoom";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Input />
            <FloatingButton />
            <ChatRoom />
            { children }
        </div>
    )
}
