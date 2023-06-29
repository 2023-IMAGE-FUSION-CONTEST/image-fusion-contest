import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import Pagination from "@/app/components/Pagination";

const prisma = new PrismaClient();

interface Params {
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ searchParams }: Params) => {
    const page = (searchParams.page && !isNaN(Number(searchParams.page))) ? Number(searchParams.page) : 1;

    const data = await prisma.artwork.findMany({
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
                            <div key={item.title} className={`inline-block mb-2`}>
                                <Image src={`http://artbank.go.kr${item.image}`} alt={item.image} width={500} height={500} />
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
