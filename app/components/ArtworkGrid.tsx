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
            title: "",
            description: "",
            author: "",
            type: "",
            year_of_mfg: "",
            url: "",
            image: ""
        }
    );

    useEffect(() => {
        setSelected(
            {
                title: "",
                description: "",
                author: "",
                type: "",
                year_of_mfg: "",
                url: "",
                image: ""
            }
        );
    }, [pathName, params]);

    return (
        <>
            <div className={`lg:columns-5 md:columns-3 columns-1`}>
                {
                    data.map((item) => {
                        return (
                            <Artwork key={item.title} data={item} setSelected={setSelected} />
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
