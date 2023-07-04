import {cache} from "react";
import {PaintingType} from "@/types/ArtworkType";
import {prisma} from "@/utils/prisma";
import {getPlaiceholder} from "plaiceholder";

export const getSearch = cache(async (page: number, type: PaintingType, query: string) => {
    const q = decodeURIComponent(query);
    const data = await prisma.artwork.findMany({
        where: {
            type: type === "oriental" ? "한국화" : "서양화",
            title: {
                contains: query
            },
            image: {
                not: {
                    contains: "art_default2.gif"
                }
            }
        },
        // 범위
        skip: (page - 1) * 50,
        take: 50,
    }).then(async (res) => {
        const response = await Promise.all(
            res.map(async (item) => {
                const src = `https://artbank.go.kr${item.image}`;

                const buffer = await fetch(src)
                    .then(async (res) => {
                        return Buffer.from(await res.arrayBuffer());
                    });

                const { base64, metadata} = await getPlaiceholder(buffer);
                return {
                    ...item,
                    blurDataURL: base64,
                    imageSize: { width: metadata.width, height: metadata.height }
                }
            })
        )

        return response;
    });

    return data;
});
