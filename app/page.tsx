import Image from 'next/image';
import Link from "next/link";

interface ImageLinkProps {
    href: string;
    src: string;
    alt: string;
}

function ImageLink({ href, src, alt }: ImageLinkProps) {
    const commonClasses = "absolute w-full flex justify-center";

    return (
        <Link href={href} className="flex-1 relative">
            <Image
                src={src}
                alt={alt}
                fill={true}
                className={`object-cover`}
                placeholder={`blur`}
                blurDataURL={src}
            />
            <div className={`${commonClasses} bottom-12`}>
                <p className="text-center text-6xl font-semibold text-white tracking-wide">
                    { alt }
                </p>
            </div>
        </Link>
    )
}


export default function Home() {
    return (
        <main>
            <video id="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg" className="w-full h-auto">
                <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
            </video>
        </main>
    )
}
