import { cache } from "react";
import { prisma } from "@/utils/prisma";
import { getPlaiceholder } from "plaiceholder";


const parseParams = (str: string) => {
    const result: any = {
        painting: [],
        title: [],
        author: [],
        year_of_mfg: [],
    }

    const params = str.split(" ");
    try {
        params.forEach((param) => {
            const [key, value] = param.split(":");

            if (key in result) result[key].push(value);
        });
    } catch (e) {
        console.error(e);
        return {
            painting: [],
            title: [],
            author: [],
            year_of_mfg: [],
        }
    }

    return result;
}


export const getSearch = cache(async (query: string | string[] | undefined) => {
    /*
    같은 query tag끼리는 OR 연산자로 묶어서 검색
    다은 query tag끼리는 AND 연산자로 묶어서 검색
    ex) query = "title:연 title:가 author:김 tag:2020 tag:2021"라면
    title이 연이거나 가이고 author가 김이고 tag가 2020이거나 2021인 작품을 검색
    */

    if (!query || typeof(query) === "object") return [];

    const result = parseParams(query);
    const dbQuery: any = {
        AND: [
            {
                image: {
                    not: {
                        contains: "art_default2.gif"
                    }
                },
            },
        ]
    }

    if (result.painting.length > 0) {
        dbQuery.AND.push({
            OR: result.painting.map((painting: string) => ({
                type: {
                    contains: painting
                        .replace("_", " ")
                        .replace("oriental", "한국화")
                        .replace("western", "서양화")
                        .replace("동양", "한국")
                        .replace("calligraphy", "서예")
                        .replace("culture", "문인화")
                        .replace("engraving", "판화")
                }
            }))
        });
    }

    if (result.title.length > 0) {
        dbQuery.AND.push({
            OR: result.title.map((title: string) => ({ title: { contains: title.replace("_", " ") } }))
        });
    }

    if (result.author.length > 0) {
        dbQuery.AND.push({
            OR: result.author.map((author: string) => ({ author: { contains: author.replace("_", " ") } }))
        });
    }

    if (result.year_of_mfg.length > 0) {
        dbQuery.AND.push({
            OR: result.year_of_mfg.map((year_of_mfg: string) => ({ year_of_mfg: { contains: year_of_mfg.replace("_", " ") } }))
        });
    }

    const data = await prisma.artwork.findMany({
        where: dbQuery,
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
