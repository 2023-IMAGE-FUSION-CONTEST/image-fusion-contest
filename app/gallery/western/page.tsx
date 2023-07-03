import ArtworkGrid from "@/app/components/ArtworkGrid";
import { getArtworkCount, getArtworks, preload } from "@/utils/getArtworks";
import Pagination from "@/app/components/Pagination";

interface Params {
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ searchParams }: Params) => {
    const page = (searchParams.page && (!isNaN(Number(searchParams.page)) && Number(searchParams.page) > 0)) ? Number(searchParams.page) : 1;
    preload(page, "western");

    const data = await getArtworks(page, "western");
    const count = await getArtworkCount("western");

    return (
        <div className={`px-10 py-8`}>
            {/* @ts-ignore */}
            <ArtworkGrid data={data} />
            <Pagination type={"western"} count={count} />
        </div>
    );
};

export default Page;
