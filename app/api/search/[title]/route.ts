import {prisma} from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function GET( request: Request, { params }: { params: { title: string } } ) {
    const title: string = params.title;
    const url: URL = new URL(request.url);
    const q: string | null = url.searchParams.get("q");
    console.log(q);
    const user = await prisma.artwork.findMany({
        where: {
            type: "서양화",
        },
    });


    return NextResponse.json(user);
}
