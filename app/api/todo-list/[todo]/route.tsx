import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import {NextResponse} from "next/server";
import prisma from "@/lib/db";

async function validateSession() {
    const session = await getServerSession(options);
    if (!session || !session.user) {
        return null;
    }

    return session.user as any;
}

export async function GET(req: any, res: any) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {listId} = req.json();

        const todos = await prisma.todo.findMany({
            where: {
                listId: parseInt(listId)
            },
        });

        return NextResponse.json(todos, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(req: any, res: any) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {listId, text} = await req.json();
        const todo = await prisma.todo.create({
            data: {
                text: text,
                listId: parseInt(listId),
                isCompleted: false
            }
        });

        return NextResponse.json("Todo successfully created", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(req: any, res: any) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {todoId} = await req.json();
        await prisma.todo.delete({
            where: {
                id: parseInt(todoId)
            }
        });

        return NextResponse.json("Todo successfully deleted", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(req: any, res: any) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {todoId, isCompleted, text} = await req.json();
        await prisma.todo.update({
            where: {
                id: parseInt(todoId)
            },
            data: {
                isCompleted: isCompleted,
                text: text
            }
        });

        return NextResponse.json("Todo successfully updated", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}