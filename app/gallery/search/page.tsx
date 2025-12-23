import ArtworkGrid from "@/app/components/ArtworkGrid";
import { getSearch } from "@/utils/getSearch";
import { Suspense } from "react";

interface Params {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ searchParams }: Params) => {
    const resolvedSearchParams = await searchParams;
    const data = await getSearch(resolvedSearchParams.query);

    return (
        <div className={`px-10 py-8`}>
            <Suspense fallback={<div>Loading...</div>}>
                {/* @ts-ignore */}
                <ArtworkGrid data={data} />
            </Suspense>
        </div>
    );
};


export default Page;
