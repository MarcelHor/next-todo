import {getServerSession} from "next-auth/next"
import {options} from "@/app/api/auth/[...nextauth]/options";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/db";
import joi from "joi";

async function validateSession(): Promise<any | null> {
    try {
        const session = await getServerSession(options);
        return session?.user || null;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}

async function hasAccessToList(userId: number, listId: number): Promise<boolean> {
    try {
        const list = await prisma.todoList.findUnique({
            where: {id: listId}
        });
        if (!list) {
            return false;
        }
        return list && Number(list.userId) === userId;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

export async function GET(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToList(parseInt(user.id), parseInt(params.todo))) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const todos = await prisma.todo.findMany({
            where: {
                listId: parseInt(params.todo),
            }
        });
        return NextResponse.json(todos, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToList(parseInt(user.id), parseInt(params.todo))) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const {text} = await request.json();
        const schema = joi.object({
            text: joi.string().required().min(1).max(100)
        }).messages({
            "string.base": `Todo text should be a type of 'text'`,
            "string.empty": `Todo text cannot be an empty field`,
            "string.min": `Todo text should have a minimum length of {#limit}`,
            "string.max": `Todo text should have a maximum length of {#limit}`,
            "any.required": `Todo text is a required field`
        });

        const {error} = schema.validate({text: text});
        if (error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }

        await prisma.todo.create({
            data: {
                text: text,
                listId: parseInt(params.todo),
                isCompleted: false
            }
        });
        return NextResponse.json("Todo successfully created", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToList(parseInt(user.id), parseInt(params.todo))) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const {todoId} = await request.json();
        const schema = joi.object({
            todoId: joi.number().required()
        }).messages({
            "number.base": `TodoId should be a type of 'number'`,
            "number.empty": `TodoId cannot be an empty field`,
            "any.required": `TodoId is a required field`
        });

        const {error} = schema.validate({todoId: todoId});
        if (error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }

        await prisma.todo.delete({where: {id: parseInt(todoId)}});
        return NextResponse.json("Todo successfully deleted", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(request: NextRequest, {params}: { params: { todo: string } }) {
    try {
        const user = await validateSession();
        if (!user || !await hasAccessToList(parseInt(user.id), parseInt(params.todo))) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const {todoId, isCompleted, text} = await request.json();

        const schema = joi.object({
            todoId: joi.number().required(),
            isCompleted: joi.boolean().required(),
            text: joi.string().required().min(1).max(255)
        }).messages({
            "number.base": `TodoId should be a type of 'number'`,
            "number.empty": `TodoId cannot be an empty field`,
            "any.required": `TodoId is a required field`,
            "boolean.base": `IsCompleted should be a type of 'boolean'`,
            "boolean.empty": `IsCompleted cannot be an empty field`,
            "string.base": `Text should be a type of 'text'`,
            "string.empty": `Text cannot be an empty field`,
            "string.min": `Text should have a minimum length of {#limit}`,
            "string.max": `Text should have a maximum length of {#limit}`,
        });

        const {error} = schema.validate({todoId: todoId, isCompleted: isCompleted, text: text});
        if (error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }

        await prisma.todo.update({
            where: {id: parseInt(todoId)},
            data: {isCompleted: isCompleted, text: text}
        });
        return NextResponse.json("Todo successfully updated", {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
