import Image, {StaticImageData} from 'next/image';
import Link from "next/link";
import ImagePath1 from '@/public/main-page-img/insung-yoon-MlY6reLHP8w-unsplash.jpg';
import ImagePath2 from '@/public/main-page-img/jessica-ruscello-G8vPQ-XVxxY-unsplash.jpg';
import ImagePath3 from '@/public/main-page-img/europeana-6c43FgRt0Dw-unsplash.jpg';

interface ImageLinkProps {
    href: string;
    src: StaticImageData;
    alt: string;
}

function ImageLink({href, src, alt}: ImageLinkProps) {
    const commonClasses = "absolute w-full flex justify-center";

    return (
        <Link href={href} className="flex-1 relative">
            <Image
                src={src}
                alt={alt}
                className="object-cover w-full h-full"
            />
            <div className={`${commonClasses} bottom-12`}>
                <p className="text-center break-words text-4xl w-7/12">
                    AAAAAAAAAAAAAAAAAAAAAA
                </p>
            </div>
        </Link>
    )
}


export default function Home() {
    return (
        <main className="h-screen flex flex-row">
            <ImageLink href={`/`} src={ImagePath1} alt={`서양화`} />
            <ImageLink href={`/`} src={ImagePath3} alt={`한국화`} />
            <ImageLink href={`/`} src={ImagePath2} alt={`박물관`} />
        </main>
    )
}
