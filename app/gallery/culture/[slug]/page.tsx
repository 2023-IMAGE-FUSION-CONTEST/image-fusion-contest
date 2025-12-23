import ArtworkGrid from "@/app/components/ArtworkGrid";
import Pagination from "@/app/components/Pagination";
import { getArtworkCount, getArtworks } from "@/utils/getArtworks";
import { Suspense } from "react";

export const generateStaticParams = async () => {
    const count = await getArtworkCount("문인화");
    const pages = Math.ceil(count / 50);

    return Array.from({length: pages}, (_, i) => {
        return { params: { slug: (i + 1).toString() } }
    });
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const page = (slug && (!isNaN(Number(slug)) && Number(slug) > 0)) ? Number(slug) : 1;
    const data = await getArtworks(page, "문인화");
    const count = await getArtworkCount("문인화");

    return (
        <div className={`px-10 py-8`}>
            <Suspense fallback={<div>Loading...</div>}>
                {/* @ts-ignore */}
                <ArtworkGrid data={data} />
            </Suspense>
            <Pagination type={"culture"} count={count} />
        </div>
    );
};

export default Page;
