import { prisma } from "@/utils/prisma";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import { getPlaiceholder } from "plaiceholder";
import Pagination from "@/app/components/Pagination";

interface Params {
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ searchParams }: Params) => {
    const page = (searchParams.page && (!isNaN(Number(searchParams.page)) && Number(searchParams.page) > 0)) ? Number(searchParams.page) : 1;

    let data = await prisma.artwork.findMany({
        where: {
            type: "한국화",
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
                const src = `http://artbank.go.kr${item.image}`;

                const buffer = await fetch(src, { cache: "no-cache" })
                    .then(async (res) => {
                        return Buffer.from(await res.arrayBuffer());
                    });

                const { base64, metadata } = await getPlaiceholder(buffer);
                return {
                    ...item,
                    blurDataURL: base64,
                    imageSize: { width: metadata.width, height: metadata.height }
                }
            })
        )

        return response;
    })

    const count = await prisma.artwork.count({
        where: {
            type: "한국화",
            image: {
                not: {
                    contains: "art_default2.gif"
                }
            }
        }
    });

    return (
        <div className={`px-10 py-8`}>
            {/* @ts-ignore */}
            <ArtworkGrid data={data} />
            <Pagination type={"oriental"} count={count} />
        </div>
    );
};

export default Page;
