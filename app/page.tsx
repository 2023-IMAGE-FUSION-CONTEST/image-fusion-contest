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
        <Link href={href} className={`flex-1 relative group`}>
            <Image
                src={src}
                alt={alt}
                fill={true}
                className={`object-cover`}
                placeholder={`blur`}
                blurDataURL={src}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className={`${commonClasses} bottom-12 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-500`}>
                <p className="text-center text-6xl font-semibold text-white tracking-wide">
                    { alt }
                </p>
            </div>
        </Link>




    )
}


export default function Home() {
    return (
        <main className="h-screen flex flex-row">
            <ImageLink href={`/gallery/western`} src={"/main-page-img/western-painting.jpg"} alt={`서양화`} />
            <ImageLink href={`/gallery/oriental`} src={"/main-page-img/oriental-painting.jpg"} alt={`한국화`} />
            <ImageLink href={`/gallery/culture`} src={"/main-page-img/museum.jpg"} alt={`박물관`} />
            <ImageLink href={`/gallery/oriental`} src={"/main-page-img/oriental-painting.jpg"} alt={`한국화`} />
            <ImageLink href={`/gallery/western`} src={"/main-page-img/western-painting.jpg"} alt={`서양화`} />
        </main>




    )
}
