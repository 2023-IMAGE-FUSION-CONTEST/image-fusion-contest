import Image from 'next/image';
import Link from "next/link";
import ImagePath from '@/public/main-page-img/insung-yoon-MlY6reLHP8w-unsplash.jpg';

export default function Home() {
    return (
        <main className="h-screen flex flex-row flex-1">
            <Link href={`/`} className="flex-1">
                <Image src={ImagePath} alt={`한국화`} className="object-cover w-full h-full" />
            </Link>
            <Link href={`/`} className="flex-1">
                <Image src={ImagePath} alt={`서양화`} className="object-cover w-full h-full" />
            </Link>
            <Link href={`/`} className="flex-1">
                <Image src={ImagePath} alt={`박물관`} className="object-cover w-full h-full" />
            </Link>
        </main>
    )
}
