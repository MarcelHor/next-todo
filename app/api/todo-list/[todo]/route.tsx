import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/db";

async function validateSession() {
    const session = await getServerSession(options);
    if (!session || !session.user) {
        return null;
    }

    return session.user as any;
}

export async function GET(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const listId = params.todo;

        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const todos = await prisma.todo.findMany({
            where: {
                id: parseInt(listId),
                list: {
                    userId: parseInt(user.id)
                }
            },
        });

        const list = await prisma.todoList.findUnique({
            where: {
                id: parseInt(listId)
            }
        });

        if (!list || Number(list.userId) !== Number(user.id)) {
            return NextResponse.json({error: "Unauthorized to view this list"}, {status: 401});
        }

        return NextResponse.json(todos, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const listId = params.todo;
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {text} = await request.json();
        await prisma.todo.create({
            data: {
                text: text,
                listId: parseInt(listId),
                isCompleted: false
            }
        });

        const list = await prisma.todoList.findUnique({
            where: {
                id: parseInt(listId)
            }
        });

        if (!list || Number(list.userId) !== Number(user.id)) {
            return NextResponse.json({error: "Unauthorized to view this list"}, {status: 401});
        }

        return NextResponse.json("Todo successfully created", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {todoId} = await request.json();
        await prisma.todo.delete({
            where: {
                id: parseInt(todoId)
            }
        });

        const list = await prisma.todoList.findUnique({
            where: {
                id: parseInt(params.todo)
            }
        });

        if (!list || Number(list.userId) !== Number(user.id)) {
            return NextResponse.json({error: "Unauthorized to view this list"}, {status: 401});
        }


        return NextResponse.json("Todo successfully deleted", {status: 200});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    try {
        const user = await validateSession();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {todoId, isCompleted, text} = await request.json();
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