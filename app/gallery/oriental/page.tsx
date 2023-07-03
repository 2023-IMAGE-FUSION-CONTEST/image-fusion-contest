import ArtworkGrid from "@/app/components/ArtworkGrid";
import Pagination from "@/app/components/Pagination";
import { getArtworkCount, getArtworks, preload } from "@/utils/getArtworks";

interface Params {
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ searchParams }: Params) => {
    const page = (searchParams.page && (!isNaN(Number(searchParams.page)) && Number(searchParams.page) > 0)) ? Number(searchParams.page) : 1;
    preload(page, "oriental");

    const data = await getArtworks(page, "oriental");
    const count = await getArtworkCount("oriental");

    return (
        <div className={`px-10 py-8`}>
            {/* @ts-ignore */}
            <ArtworkGrid data={data} />
            <Pagination type={"oriental"} count={count} />
        </div>
    );
};

export default Page;
