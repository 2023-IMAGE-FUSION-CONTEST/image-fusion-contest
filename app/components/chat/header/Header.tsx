'use client'


import {useSelectedAvatar} from "@/app/store/state";

export default function Header() {
    const avatarSelected = useSelectedAvatar(state => state.change)
    return (
        <div className="border-b-[2px] border-purple-800 w-full flex justify-between items-center px-4 py-2 rounded-t-xl bg-[#1A1D25]">
            <div className="flex items-center text-white py-1">
                <div className="w-8 h-8 bg-black rounded-full mr-2" onClick={avatarSelected} />
                <div>
                    Diffusion GPT
                </div>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
    )
}
