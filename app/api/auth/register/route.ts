import prisma from "@/lib/db";
import {NextResponse} from "next/server";

const bcrypt = require('bcrypt');

interface RegisterBody {
    username: string;
    email: string;
    password: string;
}


export async function POST(req: { json: () => Promise<RegisterBody> }): Promise<NextResponse> {
    try {
        const body = await req.json()

        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })

        if (user) {
            return NextResponse.json({error: "User already exists."}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)

        await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword
            }
        })

        return NextResponse.json({message: "User registered."}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
