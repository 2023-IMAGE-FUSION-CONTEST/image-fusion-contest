import Link from "next/link";
import {freehand} from "@/app/components/fonts/fonts";
import SourceButton from "@/app/components/rootlayout/SourceButton";

function Logo() {
    return (
        <Link
            href={`/`}
            className={`
                ${freehand.className}
                px-4
                py-1
                text-gray-50
                text-6xl
                `}
        >
            Diffusion Talk
        </Link>
    )
}



function Header() {
    const bigBtnOption: string = `px-4 py-1 text-gray-50 text-2xl`

    return (
        <nav className="absolute left-0 top-0 z-10 w-full flex justify-between bg-transparent py-2 px-10">
            <Logo />
            <div className="flex items-center font-bold">
                <Link href={'https://github.com/2023-IMAGE-FUSION-CONTEST'} className={`${bigBtnOption}`} target="_blank">
                    Github
                </Link>
                <SourceButton />
            </div>
        </nav>
    )
}

export default Header;
