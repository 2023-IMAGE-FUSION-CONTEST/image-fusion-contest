import {prisma} from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET( request: Request, { params }: { params: { title: string } } ) {
    const title = params.title;
    const user = await prisma.artwork.findMany({
        where: {
            title: {
                contains: title,
            }
        },
    });

    return NextResponse.json(user);
}
