import Input from "@/app/components/SearchInput";
import ChatUi from "@/app/components/chat/ChatUi";
import Chat from "@/app/components/chat/Chat";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Input />
            <Chat />
            {children}
        </div>
    )
}
