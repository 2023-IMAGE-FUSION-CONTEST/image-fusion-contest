'use client';

import Artwork from "@/app/components/Artwork";
import { ArtworkType } from "@/types/ArtworkType";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, usePathname } from "next/navigation";
import {useChatToggle, useSelectedArtwork} from "@/app/store/state";
const ImageDetail = dynamic(() => import("@/app/components/ImageDetail"));

interface ArtworkGridProps {
    data: ArtworkType[]
}

const ArtworkGrid = ({ data }: ArtworkGridProps) => {
    const pathName = usePathname();
    const params = useSearchParams();
    const setSelectedArtwork = useSelectedArtwork(state => state.setSelectedArtwork);
    const resetSelectedArtwork = useSelectedArtwork(state => state.reset);
    const selected = useSelectedArtwork(state => state.selected);
    const resetChatVisible = useChatToggle(state => state.reset);

    useEffect(() => {
        resetSelectedArtwork();
        resetChatVisible();
    }, [pathName, params]);

    return (
        <>
            <div className={`lg:columns-5 md:columns-3 columns-1`}>
                {
                    data.map((item) => {
                        return (
                            <Artwork key={item.id} data={item} setSelected={setSelectedArtwork} />
                        )
                    })
                }
            </div>
            {
                selected && <ImageDetail />
            }
        </>
    );
};

export default ArtworkGrid;
