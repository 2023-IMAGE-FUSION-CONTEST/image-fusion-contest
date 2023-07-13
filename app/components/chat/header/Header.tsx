import Avatar from "@/app/components/chat/header/Avatar";

export default function Header() {
    return (
        <div className="border-b-[2px] border-purple-800 w-full flex justify-between items-center px-4 py-2 rounded-t-xl">
            <Avatar />
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
    )
}
