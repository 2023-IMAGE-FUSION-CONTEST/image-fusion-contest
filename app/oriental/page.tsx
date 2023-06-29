import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Page = async () => {
    const data = await prisma.artwork.findMany({
        where: {
            type: "한국화"
        },
        take: 10,
    });

    return (
        <div>
            {
                data.map(async (item) => {
                    return (
                        <div key={item.title} className={`px-4 py-2 border-b`}>
                            <div>{item.title}</div>
                            <div>{item.description}</div>
                            <div>{item.url}</div>
                            <Image src={`http://artbank.go.kr${item.image}`} alt={item.image} width={500} height={500} />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Page;
