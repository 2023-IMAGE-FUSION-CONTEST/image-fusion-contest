import Image from "next/image";
import { prisma } from "@/utils/prisma";
import dynamic from "next/dynamic";
const Pagination = dynamic(() => import("@/app/components/Pagination"), { ssr: false });

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
    });

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
            <div className={`lg:columns-5 md:columns-3 columns-1`}>
                {
                    data.map(async (item) => {
                        return (
                            <div key={item.title} className={`relative inline-block mb-2 group`}>
                                {/* Background */}
                                <div
                                    className={`
                                        absolute
                                        bg-black
                                        w-full
                                        h-full
                                        opacity-0
                                        group-hover:opacity-70
                                        transform
                                        duration-300
                                    `}
                                />

                                {/* Contents */}
                                <div
                                    className={`
                                        absolute
                                        w-full
                                        h-full
                                        opacity-0
                                        group-hover:opacity-100
                                        transform
                                        duration-300
                                        text-white
                                        px-4
                                        py-4
                                    `}
                                >
                                    <div className={`text-2xl font-bold`}>{ item.title }</div>
                                    <div className={`text-xl font-medium`}>{ item.author }</div>
                                </div>

                                {/* Image */}
                                <Image
                                    src={`http://artbank.go.kr${item.image}`}
                                    alt={item.image}
                                    width={500}
                                    height={500}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <Pagination type={"oriental"} count={count} nowPage={page} />
        </div>
    );
};

export default Page;
