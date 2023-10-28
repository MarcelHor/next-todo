import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import {NextResponse} from "next/server";

export  async function GET(req: any) {
    const session = await getServerSession(options)
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    return NextResponse.json({message: "Hello World"})
}