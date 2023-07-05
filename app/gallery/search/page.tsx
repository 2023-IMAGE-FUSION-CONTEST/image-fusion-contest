import ArtworkGrid from "@/app/components/ArtworkGrid";
import { getSearch } from "@/utils/getSearch";

interface Params {
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ searchParams }: Params) => {
    const data = await getSearch("oriental", searchParams.query);

    return (
        <div className={`px-10 py-8`}>
            {/* @ts-ignore */}
            <ArtworkGrid data={data} />
        </div>
    );
};


export default Page;
