import { ArtworkType } from "@/types/ArtworkType";
import Image from "next/image";

interface ArtworkProps {
    data: ArtworkType,
    setSelected: any
}

const Artwork = ({ data, setSelected }: ArtworkProps) => {
    return (
        <div
            className={`relative inline-block mb-2 group`}
            onClick={() => {
                setSelected(data);
            }}
        >
            {/* Background */}
            <div
                className={`
                    absolute
                    bg-black
                    w-full
                    h-full
                    opacity-0
                    group-hover:opacity-70
                    transform
                    duration-300
                `}
            />

            {/* Contents */}
            <div
                className={`
                    absolute
                    w-full
                    h-full
                    opacity-0
                    group-hover:opacity-100
                    transform
                    duration-300
                    text-white
                    px-4
                    py-4
                `}
            >
                <div className={`text-2xl font-bold`}>{ data.title }</div>
                <div className={`text-xl font-medium`}>{ data.author }</div>
            </div>

            {/* Image */}
            <Image
                src={`https://artbank.go.kr${data.image}`}
                alt={data.image}
                width={data.imageSize.width}
                height={data.imageSize.height}
                placeholder={"blur"}
                blurDataURL={data.blurDataURL}
            />
        </div>
    );
};

export default Artwork;
