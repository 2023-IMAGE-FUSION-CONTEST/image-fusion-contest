import ArtworkGrid from "@/app/components/ArtworkGrid";
import Pagination from "@/app/components/Pagination";
import { getSearch } from "@/utils/getSearch";
import {cache} from "react";
import {PaintingType} from "@/types/ArtworkType";
import {prisma} from "@/utils/prisma";
import {getPlaiceholder} from "plaiceholder";

export const dynamic = "force-static";

type Props = {
    params: {
        searchQuery: string
    }
}

const Page = async ({params: {searchQuery}}: Props) => {
    const data = await getSearch(1, "oriental", searchQuery);
    return (
        <div className={`px-10 py-8`}>
            {/* @ts-ignore */}
            <ArtworkGrid data={data} />
            {searchQuery}
        </div>
    );
};

export default Page;
