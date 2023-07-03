import ArtworkGrid from "@/app/components/ArtworkGrid";
import Pagination from "@/app/components/Pagination";
import { getArtworkCount, getArtworks } from "@/utils/getArtworks";

export const dynamic = "force-static";

export const generateStaticParams = async () => {
    const count = await getArtworkCount("western");
    const pages = Math.ceil(count / 50);

    return Array.from({length: pages}, (_, i) => {
        return { params: { slug: (i + 1).toString() } }
    });
}

const Page = async ({ params }: { params: { slug: string } }) => {
    const page = (params.slug && (!isNaN(Number(params.slug)) && Number(params.slug) > 0)) ? Number(params.slug) : 1;
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
