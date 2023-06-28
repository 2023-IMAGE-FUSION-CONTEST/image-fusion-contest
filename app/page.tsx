import Image, {StaticImageData} from 'next/image';
import Link from "next/link";
import ImagePath from '@/public/main-page-img/insung-yoon-MlY6reLHP8w-unsplash.jpg';

interface ImageLinkProps {
    href: string;
    src: StaticImageData;
    alt: string;
}

function ImageLink({href, src, alt}: ImageLinkProps) {
    return (
        <Link href={href} className="flex-1">
            <Image
                src={src}
                alt={alt}
                className="object-cover w-full h-full" />
        </Link>
    )
}

export default function Home() {
    return (
        <main className="h-screen flex flex-row flex-1">
            <ImageLink href={`/`} src={ImagePath} alt={`서양화`} />
            <ImageLink href={`/`} src={ImagePath} alt={`한국화`} />
            <ImageLink href={`/`} src={ImagePath} alt={`박물관`} />
        </main>
    )
}
