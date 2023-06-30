'use client';

import Artwork from "@/app/components/Artwork";
import { ArtworkType } from "@/types/ArtworkType";
import {useState} from "react";
import dynamic from "next/dynamic";
const ImageDetail = dynamic(() => import("@/app/components/ImageDetail"));

interface ArtworkGridProps {
    data: ArtworkType[]
}

const ArtworkGrid = ({ data }: ArtworkGridProps) => {
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
