import { prisma } from "@/utils/prisma";
import dynamic from "next/dynamic";
import ArtworkGrid from "@/app/components/ArtworkGrid";
const Pagination = dynamic(() => import("@/app/components/Pagination"), { ssr: false });

interface Params {
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getImage(queryString: string | string[] | undefined) {
    const result = await fetch(
      `http://localhost:3000/api/search/oriental?q=${queryString}`
    );
    const imageData = await result.json();
    return imageData;
}


const Page = async ({ searchParams }: Params) => {
    const page = (searchParams.page && (!isNaN(Number(searchParams.page)) && Number(searchParams.page) > 0)) ? Number(searchParams.page) : 1;

    let data = await getImage(searchParams.q);

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
        <div className={`px-10 py-8 text-white`}>
            {/* @ts-ignore */}
            {searchParams.q}
            <ArtworkGrid data={data} />
            <Pagination type={"oriental"} count={count} nowPage={page} />
        </div>
    );
};

export default Page;
