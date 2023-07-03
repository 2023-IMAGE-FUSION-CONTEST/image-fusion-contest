import {prisma} from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function GET( request: Request, { params }: { params: { title: string } } ) {
    const title: string = params.title;
    const url: URL = new URL(request.url);
    const q: string | null = url.searchParams.get("q");

    const user = await prisma.artwork.findMany({
        where: {
            title: {
                contains: title,
            }
        },
    });

    return NextResponse.json(user);
}
