'use client';

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { useChatToggle, useSelectedArtwork } from "@/app/store/state";

import { ArtworkType } from "@/types/ArtworkType";

import Artwork from "@/app/components/Artwork";
const ImageDetail = dynamic(() => import("@/app/components/ImageDetail"));

interface ArtworkGridProps {
    data: ArtworkType[]
}

const ArtworkGrid = ({ data }: ArtworkGridProps) => {
    const setSelectedArtwork = useSelectedArtwork(state => state.setSelectedArtwork);
    const resetSelectedArtwork = useSelectedArtwork(state => state.reset);
    const selected = useSelectedArtwork(state => state.selected);
    const resetChatVisible = useChatToggle(state => state.reset);

    useEffect(() => {
        resetSelectedArtwork();
        resetChatVisible();
    }, [data]);

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
