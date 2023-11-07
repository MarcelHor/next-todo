import {NextResponse} from "next/server";
import {registerUser} from "./registerController";

export async function POST(req: NextResponse<any>) {
    try {
        const body = await req.json();
        const result = await registerUser(body);
        return NextResponse.json(result, {status: 201});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: error.status || 500});
    }
}
