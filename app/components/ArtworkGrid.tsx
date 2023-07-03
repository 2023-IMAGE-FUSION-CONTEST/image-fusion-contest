'use client';

import Artwork from "@/app/components/Artwork";
import { ArtworkType } from "@/types/ArtworkType";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, usePathname } from "next/navigation";
const ImageDetail = dynamic(() => import("@/app/components/ImageDetail"));

interface ArtworkGridProps {
    data: ArtworkType[]
}

const ArtworkGrid = ({ data }: ArtworkGridProps) => {
    const pathName = usePathname();
    const params = useSearchParams();
    const [selected, setSelected] = useState<ArtworkType>(
        {
            id: 0,
            title: "",
            description: "",
            author: "",
            type: "",
            year_of_mfg: "",
            url: "",
            image: "",
            imageSize: {
                width: 0,
                height: 0
            },
            blurDataURL: ""
        }
    );

    useEffect(() => {
        setSelected(
            {
                id: 0,
                title: "",
                description: "",
                author: "",
                type: "",
                year_of_mfg: "",
                url: "",
                image: "",
                imageSize: {
                    width: 0,
                    height: 0
                },
                blurDataURL: ""
            }
        );
    }, [pathName, params]);

    return (
        <>
            <div className={`lg:columns-5 md:columns-3 columns-1`}>
                {
                    data.map((item) => {
                        return (
                            <Artwork key={item.id} data={item} setSelected={setSelected} />
                        )
                    })
                }
            </div>
            {
                (selected && selected.url !== "") &&
                <ImageDetail data={selected} setSelected={setSelected} />
            }
        </>
    );
};

export default ArtworkGrid;
