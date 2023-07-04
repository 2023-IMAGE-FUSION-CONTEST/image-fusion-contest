import {prisma} from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function GET( request: Request ) {
    const url: URL = new URL(request.url);
    const q: string | null = url.searchParams.get("q");
    console.log(url.href);


    const user = await prisma.artwork.findMany({
        where: {
            type: "한국화",
            title: {
                contains: q === null ? '' : q,
            },
            image: {
                not: {
                    contains: "art_default2.gif"
                }
            },
        },
    });
    // console.log(user);
    return NextResponse.json(user);
}
