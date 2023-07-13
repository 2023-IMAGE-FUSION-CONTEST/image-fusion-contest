import Avatar from "@/app/components/chat/header/Avatar";

export default function Header() {
    return (
        <div className="bg-amber-300 h-10 w-72 flex justify-between items-center px-4">
            <Avatar />
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
    )
}
