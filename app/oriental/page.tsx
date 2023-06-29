import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Page = async () => {
    const data = await prisma.artwork.findMany({
        where: {
            type: "한국화",
            image: {
                not: {
                    contains: "art_default2.gif"
                }
            }
        },
        take: 100,
    });

    return (
        <div className={`px-10 py-8`}>
            <div className={`columns-5`}>
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
        </div>
    );
};

export default Page;
