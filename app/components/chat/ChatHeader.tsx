function Avatar() {
    return (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-zinc-950 rounded-full mr-2">

            </div>
            <div>
                name
            </div>
        </div>
    )
}


export function ChatHeader() {
    return (
        <div className="absolute left-0 top-0 bg-amber-300 h-10 w-72 flex justify-between items-center px-4">
            <Avatar />
            <div className="w-2 h-2 bg-blue-500 rounded-full">

            </div>
        </div>
    )
}
