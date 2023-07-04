import {cache} from "react";
import {PaintingType} from "@/types/ArtworkType";
import {prisma} from "@/utils/prisma";
import {getPlaiceholder} from "plaiceholder";


function parseString(str: string) {
    let result = {
        title: '',
        year: '',
        author: ''
    };
    const parts = str.split(' ');

    for (let part of parts) {
        if (part.startsWith('tag:')) {
            let tagValue: string = part.substring(4);

            if (!isNaN(Number(tagValue))) {
                result.year = tagValue;
            }
            else {
                result.author = tagValue;
            }
        } else {
            result.title += part + ' ';
        }
    }
    result.title = result.title.trim();

    return result;
}


export const getSearch = cache(async (page: number, type: PaintingType, query: string) => {
    const result = parseString(decodeURIComponent(query));

    let whereClause: any = {
        type: type === "oriental" ? "한국화" : "서양화",
        title: {
            contains: result.title
        },
        image: {
            not: {
                contains: "art_default2.gif"
            }
        }
    }

    if (result.year !== "") {
        whereClause["year_of_mfg"] = result.year;
    }
    if (result.author !== "") {
        whereClause["author"] = {contains: result.author};
    }

    console.log(whereClause);
    const data = await prisma.artwork.findMany({
        where: whereClause,
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
