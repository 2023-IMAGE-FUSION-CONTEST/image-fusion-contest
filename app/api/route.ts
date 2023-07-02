// @ts-ignore
import {prisma} from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const users = await prisma.artwork.findMany();
    return NextResponse.json(users);
}
