import Link from "next/link";

function Header() {
    const bigBtnOption: string = `px-4 py-1 text-gray-50 text-2xl`
    const smallBtnOption: string = `px-4 pt-2 text-gray-50 text-sm hover:underline`;

    return (
        <nav className="fixed left-0 top-0 z-10 w-full flex justify-between bg-zinc-950 py-2 px-10 border-b-2 border-gray-50 shadow-2xl">
        <Link
                href={`/`}
                className={`${bigBtnOption}
                rounded-3xl
                border-4
                border-zinc-900
                hover:border-yellow-500
                active:border-green-500
                transition-colors
                `}
            >
                LOGO
            </Link>
            <div className="flex items-center">
                <Link href={'/'} className={`${bigBtnOption}`}>
                    Home
                </Link>
                <Link href={'/'} className={`${smallBtnOption}`}>
                    Home
                </Link>
                <Link href={'/'} className={`${smallBtnOption}`}>
                    Home
                </Link>
                <Link href={'/'} className={`${smallBtnOption}`}>
                    Home
                </Link>
                <Link href={'/'} className={`${smallBtnOption}`}>
                    Home
                </Link>
            </div>
        </nav>
    )
}

export default Header;
